import { cookies } from "next/headers";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";
import { AdminAccount, SessionPayload } from "@/types/auth";
import { withTimeout } from "@/lib/async-timeout";

const AUTH_FILE_PATH = path.join(process.cwd(), "src", "data", "auth.json");
const SESSION_COOKIE_NAME = "faiz_admin_session";
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || "faiz_waheed_cms_auth_secret_token_2026_executive";
const DEFAULT_INITIAL_PASSWORD = process.env.ADMIN_PASSWORD || "FaizWaheed@2026";
const FIXED_ADMIN_EMAIL = "faizwaheed9@gmail.com";

// Rate limiting settings
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes
const OTP_EXPIRY_MS = 10 * 60 * 1000; // 10 minutes
const OTP_RESEND_COOLDOWN_MS = 60 * 1000; // 60 seconds
const MAX_OTP_ATTEMPTS = 3;

export class AdminAuth {
  private static cachedAccount: AdminAccount | null = null;

  /**
   * Hashes a password or token using Node crypto scrypt with a random 16-byte salt
   */
  public static hashPassword(password: string): string {
    const salt = crypto.randomBytes(16).toString("hex");
    const hash = crypto.scryptSync(password, salt, 64).toString("hex");
    return `scrypt:${salt}:${hash}`;
  }

  /**
   * Verifies a password against a stored scrypt hash in timing-safe manner
   */
  public static verifyPasswordHash(password: string, storedHash: string | null | undefined): boolean {
    if (!storedHash) return false;

    if (!storedHash.startsWith("scrypt:")) {
      return password === storedHash;
    }

    const parts = storedHash.split(":");
    if (parts.length !== 3) return false;

    const [, salt, expectedHash] = parts;
    const computedHash = crypto.scryptSync(password, salt, 64).toString("hex");

    const bufExpected = Buffer.from(expectedHash, "hex");
    const bufComputed = Buffer.from(computedHash, "hex");

    if (bufExpected.length !== bufComputed.length) return false;
    return crypto.timingSafeEqual(bufExpected, bufComputed);
  }

  /**
   * Helper to initialize Netlify Blobs store for authentication data
   */
  private static async getNetlifyStore() {
    try {
      const { getStore } = await import("@netlify/blobs");
      const siteID = process.env.NETLIFY_SITE_ID;
      const token = process.env.NETLIFY_AUTH_TOKEN;
      if (siteID && token) {
        return getStore({ name: "portfolio-auth", siteID, token });
      }
      return getStore({ name: "portfolio-auth" });
    } catch {
      return null;
    }
  }

  /**
   * Loads the admin account from Netlify Blobs or local auth.json
   */
  public static async getAccountAsync(): Promise<AdminAccount> {
    if (this.cachedAccount) {
      return this.cachedAccount;
    }

    // 1. Check Netlify Blobs with strict 800ms timeout
    const mayHaveBlobs = Boolean(process.env.NETLIFY || process.env.NETLIFY_SITE_ID);
    if (mayHaveBlobs) {
      await withTimeout(
        async () => {
          try {
            const store = await this.getNetlifyStore();
            if (store) {
              const stored = await store.get("admin-account", { type: "json" });
              if (stored && (stored as AdminAccount).passwordHash) {
                this.cachedAccount = stored as AdminAccount;
              }
            }
          } catch {
            // Blobs not available
          }
        },
        800,
        undefined
      );

      if (this.cachedAccount) {
        return this.cachedAccount;
      }
    }

    // 2. Check local auth.json
    try {
      if (fs.existsSync(AUTH_FILE_PATH)) {
        const raw = fs.readFileSync(AUTH_FILE_PATH, "utf8");
        const parsed = JSON.parse(raw);
        if (parsed && parsed.passwordHash) {
          this.cachedAccount = parsed as AdminAccount;
          return this.cachedAccount;
        }
      }
    } catch (err) {
      console.warn("Could not read auth.json:", err);
    }

    // 3. Fallback: Initialize default account with hashed credentials
    const initialAccount: AdminAccount = {
      username: "admin",
      email: FIXED_ADMIN_EMAIL,
      passwordHash: this.hashPassword(DEFAULT_INITIAL_PASSWORD),
      mustChangePassword: false,
      failedAttempts: 0,
      lockoutUntil: null,
      updatedAt: new Date().toISOString(),
      recoveryCodeHash: null,
      failedRecoveryAttempts: 0,
      recoveryLockoutUntil: null,
      sessionVersion: 1,
      otpState: null,
    };

    await this.saveAccountAsync(initialAccount);
    this.cachedAccount = initialAccount;
    return initialAccount;
  }

  /**
   * Persists the admin account to Netlify Blobs and local auth.json
   */
  public static async saveAccountAsync(account: AdminAccount): Promise<boolean> {
    this.cachedAccount = account;

    // 1. Save to Netlify Blobs with strict timeout
    try {
      const saveBlob = async () => {
        const store = await this.getNetlifyStore();
        if (store) {
          await store.setJSON("admin-account", account);
          return true;
        }
        return false;
      };

      await withTimeout(saveBlob(), 2000, false);
    } catch (err: any) {
      console.warn("Notice: Netlify Blobs auth store not available:", err?.message);
    }

    // 2. Save to local disk
    try {
      const dir = path.dirname(AUTH_FILE_PATH);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(AUTH_FILE_PATH, JSON.stringify(account, null, 2), "utf8");
      return true;
    } catch (fsErr: any) {
      // Ephemeral /tmp write for serverless containers
      try {
        const tmpFile = path.join("/tmp", "auth.json");
        fs.writeFileSync(tmpFile, JSON.stringify(account, null, 2), "utf8");
      } catch {}
      return true;
    }
  }

  /**
   * Checks whether the account is currently locked out due to rate limiting
   */
  public static isLockedOut(account: AdminAccount): { locked: boolean; remainingSeconds: number } {
    if (!account.lockoutUntil) return { locked: false, remainingSeconds: 0 };
    const now = Date.now();
    if (now < account.lockoutUntil) {
      const remainingSeconds = Math.ceil((account.lockoutUntil - now) / 1000);
      return { locked: true, remainingSeconds };
    }
    return { locked: false, remainingSeconds: 0 };
  }

  /**
   * Records a failed login attempt; applies a lockout if threshold is exceeded
   */
  public static async recordFailedAttemptAsync(): Promise<{ locked: boolean; remainingAttempts: number; remainingSeconds: number }> {
    const account = await this.getAccountAsync();
    const now = Date.now();

    if (account.lockoutUntil && now >= account.lockoutUntil) {
      account.failedAttempts = 0;
      account.lockoutUntil = null;
    }

    account.failedAttempts = (account.failedAttempts || 0) + 1;

    if (account.failedAttempts >= MAX_FAILED_ATTEMPTS) {
      account.lockoutUntil = now + LOCKOUT_DURATION_MS;
      await this.saveAccountAsync(account);
      return {
        locked: true,
        remainingAttempts: 0,
        remainingSeconds: Math.ceil(LOCKOUT_DURATION_MS / 1000),
      };
    }

    await this.saveAccountAsync(account);
    return {
      locked: false,
      remainingAttempts: MAX_FAILED_ATTEMPTS - account.failedAttempts,
      remainingSeconds: 0,
    };
  }

  /**
   * Resets failed attempts after a successful login
   */
  public static async recordSuccessfulLoginAsync(): Promise<void> {
    const account = await this.getAccountAsync();
    if (account.failedAttempts > 0 || account.lockoutUntil) {
      account.failedAttempts = 0;
      account.lockoutUntil = null;
      await this.saveAccountAsync(account);
    }
  }

  /**
   * Creates an HMAC-SHA256 signed session token with embedded session version
   */
  public static createSessionToken(user: string, mustChangePassword: boolean, sessionVersion?: number): string {
    const version = sessionVersion !== undefined ? sessionVersion : (this.cachedAccount?.sessionVersion || 1);
    const payload: SessionPayload = {
      user,
      timestamp: Date.now(),
      mustChangePassword,
      sessionVersion: version,
    };
    const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString("base64url");
    const signature = crypto
      .createHmac("sha256", SESSION_SECRET)
      .update(payloadBase64)
      .digest("hex");
    return `${payloadBase64}.${signature}`;
  }

  /**
   * Validates an HMAC-signed session token and checks for tampering / expiration / session invalidation
   */
  public static verifySessionToken(token: string | undefined): { valid: boolean; payload?: SessionPayload } {
    if (!token || typeof token !== "string") return { valid: false };

    const parts = token.split(".");
    if (parts.length !== 2) {
      const expectedLegacy = Buffer.from(`admin:${SESSION_SECRET}`).toString("base64");
      if (token === expectedLegacy) {
        return {
          valid: true,
          payload: { user: "admin", timestamp: Date.now(), mustChangePassword: false, sessionVersion: 1 },
        };
      }
      return { valid: false };
    }

    const [payloadBase64, providedSig] = parts;
    const expectedSig = crypto
      .createHmac("sha256", SESSION_SECRET)
      .update(payloadBase64)
      .digest("hex");

    const bufExpected = Buffer.from(expectedSig, "hex");
    const bufProvided = Buffer.from(providedSig, "hex");

    if (bufExpected.length !== bufProvided.length) return { valid: false };
    if (!crypto.timingSafeEqual(bufExpected, bufProvided)) return { valid: false };

    try {
      const payload: SessionPayload = JSON.parse(
        Buffer.from(payloadBase64, "base64url").toString("utf8")
      );

      // Max session age: 7 days
      const maxAgeMs = 7 * 24 * 60 * 60 * 1000;
      if (Date.now() - payload.timestamp > maxAgeMs) {
        return { valid: false };
      }

      // Check session version invalidation if cached account is loaded
      if (this.cachedAccount && this.cachedAccount.sessionVersion) {
        const tokenVersion = payload.sessionVersion || 1;
        if (tokenVersion < this.cachedAccount.sessionVersion) {
          return { valid: false };
        }
      }

      return { valid: true, payload };
    } catch {
      return { valid: false };
    }
  }

  /**
   * Synchronous check for route handlers to determine if the caller has a valid session
   */
  public static isAuthenticated(): boolean {
    try {
      const cookieStore = cookies();
      const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
      const verified = this.verifySessionToken(sessionCookie?.value);
      return verified.valid;
    } catch {
      return false;
    }
  }

  /**
   * Checks if the active session requires the user to change their temporary password
   */
  public static sessionMustChangePassword(): boolean {
    try {
      const cookieStore = cookies();
      const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
      const verified = this.verifySessionToken(sessionCookie?.value);
      return verified.valid && Boolean(verified.payload?.mustChangePassword);
    } catch {
      return false;
    }
  }

  /**
   * Updates admin password securely, rotates session version to invalidate old sessions
   */
  public static async changePasswordAsync(
    currentPassword: string,
    newPassword: string
  ): Promise<{ success: boolean; error?: string }> {
    if (!newPassword || newPassword.trim().length < 8) {
      return { success: false, error: "New password must be at least 8 characters long." };
    }

    if (!/[a-zA-Z]/.test(newPassword) || !/[0-9]/.test(newPassword)) {
      return { success: false, error: "New password must contain both letters and numbers." };
    }

    const account = await this.getAccountAsync();

    if (!this.verifyPasswordHash(currentPassword, account.passwordHash)) {
      return { success: false, error: "Current password is incorrect." };
    }

    account.passwordHash = this.hashPassword(newPassword.trim());
    account.mustChangePassword = false;
    account.updatedAt = new Date().toISOString();
    account.failedAttempts = 0;
    account.lockoutUntil = null;
    account.sessionVersion = (account.sessionVersion || 1) + 1;

    const saved = await this.saveAccountAsync(account);
    if (!saved) {
      return { success: false, error: "Failed to persist new password to storage." };
    }

    return { success: true };
  }

  /**
   * Generates a new, cryptographically secure 16-character Emergency Recovery Code.
   * Can ONLY be generated by an authenticated administrator.
   * Immediately invalidates any previous recovery code.
   * Returns plaintext code to be displayed ONCE to the administrator.
   */
  public static async generateEmergencyRecoveryCodeAsync(): Promise<{ success: boolean; code?: string; error?: string }> {
    if (!this.isAuthenticated()) {
      return { success: false, error: "Unauthorized access: You must be logged in as administrator to generate a recovery code." };
    }

    // 16-character format: FAIZ-XXXX-XXXX-XXXX
    const rawBytes = crypto.randomBytes(6).toString("hex").toUpperCase();
    const parts = rawBytes.match(/.{4}/g) || ["A1B2", "C3D4", "E5F6"];
    const code = `FAIZ-${parts.join("-")}`;

    const account = await this.getAccountAsync();
    account.recoveryCodeHash = this.hashPassword(code);
    account.failedRecoveryAttempts = 0;
    account.recoveryLockoutUntil = null;
    account.updatedAt = new Date().toISOString();

    await this.saveAccountAsync(account);
    return { success: true, code };
  }

  /**
   * Resets password using the emergency recovery code.
   * Requirements:
   * - Single use: Invalids the recovery code immediately upon successful use.
   * - Rate limited: Locks out for 15 minutes after 5 failed attempts.
   * - Invalidates all prior active sessions.
   */
  public static async resetWithRecoveryCodeAsync(
    recoveryCode: string,
    newPassword: string
  ): Promise<{ success: boolean; error?: string }> {
    if (!recoveryCode || !newPassword) {
      return { success: false, error: "Emergency recovery code and new password are required." };
    }

    if (newPassword.trim().length < 8) {
      return { success: false, error: "New password must be at least 8 characters long." };
    }

    if (!/[a-zA-Z]/.test(newPassword) || !/[0-9]/.test(newPassword)) {
      return { success: false, error: "New password must contain both letters and numbers." };
    }

    const account = await this.getAccountAsync();
    const now = Date.now();

    // Check recovery lockout
    if (account.recoveryLockoutUntil && now < account.recoveryLockoutUntil) {
      const remainingSeconds = Math.ceil((account.recoveryLockoutUntil - now) / 1000);
      return {
        success: false,
        error: `Too many invalid recovery attempts. Recovery locked for ${Math.ceil(remainingSeconds / 60)} minute(s).`,
      };
    }

    if (!account.recoveryCodeHash) {
      return {
        success: false,
        error: "No active emergency recovery code configured on this account. Please use the Gmail verification code recovery method.",
      };
    }

    const isValid = this.verifyPasswordHash(recoveryCode.trim().toUpperCase(), account.recoveryCodeHash);
    if (!isValid) {
      account.failedRecoveryAttempts = (account.failedRecoveryAttempts || 0) + 1;
      if (account.failedRecoveryAttempts >= MAX_FAILED_ATTEMPTS) {
        account.recoveryLockoutUntil = now + LOCKOUT_DURATION_MS;
      }
      await this.saveAccountAsync(account);
      return {
        success: false,
        error: `Invalid emergency recovery code. ${MAX_FAILED_ATTEMPTS - account.failedRecoveryAttempts} attempt(s) remaining.`,
      };
    }

    // Code verified:
    // 1. Invalidate recovery code immediately (single-use!)
    account.recoveryCodeHash = null;
    account.failedRecoveryAttempts = 0;
    account.recoveryLockoutUntil = null;

    // 2. Set new password
    account.passwordHash = this.hashPassword(newPassword.trim());
    account.mustChangePassword = false;
    account.failedAttempts = 0;
    account.lockoutUntil = null;

    // 3. Invalidate all previous sessions
    account.sessionVersion = (account.sessionVersion || 1) + 1;
    account.updatedAt = new Date().toISOString();

    await this.saveAccountAsync(account);
    return { success: true };
  }

  /**
   * Sends a 6-digit verification code (OTP) to the fixed administrator recovery email (faizwaheed9@gmail.com).
   * Strict security: Does not accept arbitrary emails from visitors.
   */
  public static async sendRecoveryOtpAsync(): Promise<{ success: boolean; maskedEmail: string; error?: string }> {
    const account = await this.getAccountAsync();
    const now = Date.now();

    const lockout = this.isLockedOut(account);
    if (lockout.locked) {
      return {
        success: false,
        maskedEmail: "",
        error: `Account is temporarily locked out. Try again in ${lockout.remainingSeconds} seconds.`,
      };
    }

    // Cooldown check between resends
    if (account.otpState && now - account.otpState.lastSentAt < OTP_RESEND_COOLDOWN_MS) {
      const waitSec = Math.ceil((OTP_RESEND_COOLDOWN_MS - (now - account.otpState.lastSentAt)) / 1000);
      return {
        success: false,
        maskedEmail: "f***9@gmail.com",
        error: `Please wait ${waitSec} seconds before requesting a new verification code.`,
      };
    }

    // Generate 6-digit numeric OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    const otpHash = this.hashPassword(otp);

    account.otpState = {
      otpHash,
      expiresAt: now + OTP_EXPIRY_MS,
      attempts: 0,
      lastSentAt: now,
    };

    const targetEmail = FIXED_ADMIN_EMAIL;
    const maskedEmail = "f***9@gmail.com";

    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #090D12; color: #F8FAFC; padding: 36px 20px; border-radius: 16px; max-width: 520px; margin: 0 auto; border: 1px solid rgba(16, 185, 129, 0.25);">
        <div style="text-align: center; margin-bottom: 24px;">
          <h2 style="color: #10B981; margin: 0 0 6px 0; font-size: 22px; font-weight: 700;">Muhammad Faiz Waheed</h2>
          <p style="color: #94A3B8; font-size: 13px; margin: 0;">Portfolio Administrative Security Portal</p>
        </div>
        <div style="background-color: #0F1720; border: 1px solid rgba(255, 255, 255, 0.08); padding: 28px; border-radius: 12px; text-align: center;">
          <p style="color: #F8FAFC; font-size: 15px; margin: 0 0 18px 0; font-weight: 600;">Administrator Password Reset Code</p>
          <p style="color: #94A3B8; font-size: 13px; margin: 0 0 20px 0;">Use the 6-digit verification code below to authorize a password change on your portfolio CMS:</p>
          <div style="font-size: 34px; font-weight: 800; letter-spacing: 8px; color: #D4AF37; padding: 14px 20px; background-color: #090D12; border-radius: 8px; border: 1px dashed #10B981; display: inline-block; font-family: monospace;">
            ${otp}
          </div>
          <p style="color: #64748B; font-size: 12px; margin: 20px 0 0 0;">
            This single-use code expires in <strong>10 minutes</strong>.<br />
            If you did not request this verification code, ignore this email.
          </p>
        </div>
      </div>
    `;

    const text = `Muhammad Faiz Waheed Portfolio CMS - Password Reset Code: ${otp}. Valid for 10 minutes.`;

    const sent = await this.sendEmailAsync({
      to: targetEmail,
      subject: `Your Portfolio CMS Reset Code: ${otp}`,
      html,
      text,
    });

    await this.saveAccountAsync(account);

    if (!sent) {
      if (process.env.NODE_ENV !== "production") {
        console.log(`\n========================================\n[LOCAL DEV OTP CODE]\nRecipient: ${targetEmail}\nVerification Code: ${otp}\n========================================\n`);
        return {
          success: true,
          maskedEmail,
          error: "DEV MODE: Verification code printed to terminal because SMTP credentials are not configured.",
        };
      }
      return {
        success: false,
        maskedEmail,
        error: "Gmail SMTP service is not configured in Netlify environment variables (GMAIL_USER and GMAIL_APP_PASSWORD required). Please use your Emergency Recovery Code.",
      };
    }

    return { success: true, maskedEmail };
  }

  /**
   * Verifies the 6-digit OTP and resets the password
   */
  public static async verifyOtpAndResetPasswordAsync(
    otp: string,
    newPassword: string
  ): Promise<{ success: boolean; error?: string }> {
    if (!otp || !newPassword) {
      return { success: false, error: "Verification code and new password are required." };
    }

    if (newPassword.trim().length < 8) {
      return { success: false, error: "New password must be at least 8 characters long." };
    }

    if (!/[a-zA-Z]/.test(newPassword) || !/[0-9]/.test(newPassword)) {
      return { success: false, error: "New password must contain both letters and numbers." };
    }

    const account = await this.getAccountAsync();
    const now = Date.now();

    if (!account.otpState || !account.otpState.otpHash) {
      return { success: false, error: "No verification code requested. Please click 'Send Verification Code' first." };
    }

    if (now > account.otpState.expiresAt) {
      account.otpState = null;
      await this.saveAccountAsync(account);
      return { success: false, error: "Verification code has expired. Please request a new one." };
    }

    if (account.otpState.attempts >= MAX_OTP_ATTEMPTS) {
      account.otpState = null;
      await this.saveAccountAsync(account);
      return { success: false, error: "Too many failed attempts. Code invalidated. Please request a new code." };
    }

    const isValid = this.verifyPasswordHash(otp.trim(), account.otpState.otpHash);
    if (!isValid) {
      account.otpState.attempts = (account.otpState.attempts || 0) + 1;
      await this.saveAccountAsync(account);
      return {
        success: false,
        error: `Invalid verification code. ${MAX_OTP_ATTEMPTS - account.otpState.attempts} attempt(s) remaining.`,
      };
    }

    // Code verified:
    account.otpState = null;
    account.passwordHash = this.hashPassword(newPassword.trim());
    account.mustChangePassword = false;
    account.failedAttempts = 0;
    account.lockoutUntil = null;
    account.sessionVersion = (account.sessionVersion || 1) + 1;
    account.updatedAt = new Date().toISOString();

    await this.saveAccountAsync(account);
    return { success: true };
  }

  /**
   * Helper to send emails via Gmail SMTP or custom SMTP transporter
   */
  private static async sendEmailAsync(options: { to: string; subject: string; html: string; text: string }): Promise<boolean> {
    const gmailUser = process.env.GMAIL_USER || process.env.SMTP_USER;
    const gmailPass = process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS;

    if (!gmailUser || !gmailPass) {
      return false;
    }

    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: gmailUser,
          pass: gmailPass,
        },
      });

      await transporter.sendMail({
        from: `"Muhammad Faiz Waheed Portfolio" <${gmailUser}>`,
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html,
      });

      return true;
    } catch (err) {
      console.error("Nodemailer dispatch error:", err);
      return false;
    }
  }

  public static getSessionCookieName(): string {
    return SESSION_COOKIE_NAME;
  }
}
