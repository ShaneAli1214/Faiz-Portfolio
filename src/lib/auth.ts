import { cookies } from "next/headers";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import { AdminAccount, SessionPayload } from "@/types/auth";

const AUTH_FILE_PATH = path.join(process.cwd(), "src", "data", "auth.json");
const SESSION_COOKIE_NAME = "faiz_admin_session";
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || "faiz_waheed_cms_auth_secret_token_2026_executive";
const DEFAULT_INITIAL_PASSWORD = process.env.ADMIN_PASSWORD || "FaizWaheed@2026";
const DEFAULT_RECOVERY_CODE = "FAIZ-2026-NUST-RECOVER";

// Rate limiting settings
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes

export class AdminAuth {
  private static cachedAccount: AdminAccount | null = null;

  /**
   * Hashes a password using Node crypto scrypt with a random 16-byte salt
   */
  public static hashPassword(password: string): string {
    const salt = crypto.randomBytes(16).toString("hex");
    const hash = crypto.scryptSync(password, salt, 64).toString("hex");
    return `scrypt:${salt}:${hash}`;
  }

  /**
   * Verifies a password against a stored scrypt hash in timing-safe manner
   */
  public static verifyPasswordHash(password: string, storedHash: string): boolean {
    if (!storedHash) return false;

    // Support legacy plain string during migration
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
   * Loads the admin account from Netlify Blobs or local auth.json
   */
  public static async getAccountAsync(): Promise<AdminAccount> {
    if (this.cachedAccount) {
      return this.cachedAccount;
    }

    // 1. Check Netlify Blobs
    try {
      const { getStore } = await import("@netlify/blobs");
      const siteID = process.env.NETLIFY_SITE_ID;
      const token = process.env.NETLIFY_AUTH_TOKEN;
      const store = siteID && token
        ? getStore({ name: "portfolio-auth", siteID, token, consistency: "strong" })
        : getStore({ name: "portfolio-auth", consistency: "strong" });

      if (store) {
        const stored = await store.get("admin-account", { type: "json" });
        if (stored && (stored as AdminAccount).passwordHash) {
          this.cachedAccount = stored as AdminAccount;
          return this.cachedAccount;
        }
      }
    } catch {
      // Blobs not available
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

    // 3. Initialize default account with hashed credentials
    const initialAccount: AdminAccount = {
      username: "admin",
      email: "faizwaheed9@gmail.com",
      passwordHash: this.hashPassword(DEFAULT_INITIAL_PASSWORD),
      mustChangePassword: true, // Force client to choose their own password on first login
      failedAttempts: 0,
      lockoutUntil: null,
      updatedAt: new Date().toISOString(),
      recoveryCodeHash: this.hashPassword(DEFAULT_RECOVERY_CODE),
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

    // 1. Save to Netlify Blobs
    try {
      const { getStore } = await import("@netlify/blobs");
      const siteID = process.env.NETLIFY_SITE_ID;
      const token = process.env.NETLIFY_AUTH_TOKEN;
      const store = siteID && token
        ? getStore({ name: "portfolio-auth", siteID, token, consistency: "strong" })
        : getStore({ name: "portfolio-auth", consistency: "strong" });

      if (store) {
        await store.setJSON("admin-account", account);
      }
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
      console.warn("Notice: Local filesystem is read-only (EROFS):", fsErr?.message);
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

    // If existing lockout has expired, reset counter
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
   * Creates an HMAC-SHA256 signed session token
   */
  public static createSessionToken(user: string, mustChangePassword: boolean): string {
    const payload: SessionPayload = {
      user,
      timestamp: Date.now(),
      mustChangePassword,
    };
    const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString("base64url");
    const signature = crypto
      .createHmac("sha256", SESSION_SECRET)
      .update(payloadBase64)
      .digest("hex");
    return `${payloadBase64}.${signature}`;
  }

  /**
   * Validates an HMAC-signed session token and checks for tampering / expiration
   */
  public static verifySessionToken(token: string | undefined): { valid: boolean; payload?: SessionPayload } {
    if (!token || typeof token !== "string") return { valid: false };

    const parts = token.split(".");
    if (parts.length !== 2) {
      // Legacy fallback token compatibility
      const expectedLegacy = Buffer.from(`admin:${SESSION_SECRET}`).toString("base64");
      if (token === expectedLegacy) {
        return {
          valid: true,
          payload: { user: "admin", timestamp: Date.now(), mustChangePassword: false },
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

    if (bufExpected.length !== bufComputedLengthSafe(bufProvided)) return { valid: false };
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
   * Updates admin password securely and clears the mustChangePassword flag
   */
  public static async changePasswordAsync(
    currentPassword: string,
    newPassword: string
  ): Promise<{ success: boolean; error?: string }> {
    if (!newPassword || newPassword.trim().length < 8) {
      return { success: false, error: "New password must be at least 8 characters long." };
    }

    // Require at least one number and one letter
    if (!/[a-zA-Z]/.test(newPassword) || !/[0-9]/.test(newPassword)) {
      return { success: false, error: "New password must contain both letters and numbers." };
    }

    const account = await this.getAccountAsync();

    // Verify current password
    if (!this.verifyPasswordHash(currentPassword, account.passwordHash)) {
      return { success: false, error: "Current password is incorrect." };
    }

    // Hash new password with fresh salt
    account.passwordHash = this.hashPassword(newPassword.trim());
    account.mustChangePassword = false;
    account.updatedAt = new Date().toISOString();
    account.failedAttempts = 0;
    account.lockoutUntil = null;

    const saved = await this.saveAccountAsync(account);
    if (!saved) {
      return { success: false, error: "Failed to persist new password to storage." };
    }

    return { success: true };
  }

  /**
   * Resets password using the emergency recovery code
   */
  public static async resetWithRecoveryCodeAsync(
    recoveryCode: string,
    newPassword: string
  ): Promise<{ success: boolean; error?: string }> {
    if (!recoveryCode || !newPassword) {
      return { success: false, error: "Recovery code and new password are required." };
    }

    if (newPassword.trim().length < 8) {
      return { success: false, error: "New password must be at least 8 characters." };
    }

    const account = await this.getAccountAsync();
    const storedRecoveryHash = account.recoveryCodeHash || this.hashPassword(DEFAULT_RECOVERY_CODE);

    if (!this.verifyPasswordHash(recoveryCode.trim(), storedRecoveryHash)) {
      return { success: false, error: "Invalid recovery code." };
    }

    account.passwordHash = this.hashPassword(newPassword.trim());
    account.mustChangePassword = false;
    account.failedAttempts = 0;
    account.lockoutUntil = null;
    account.updatedAt = new Date().toISOString();

    await this.saveAccountAsync(account);
    return { success: true };
  }

  public static getSessionCookieName(): string {
    return SESSION_COOKIE_NAME;
  }
}

function bufComputedLengthSafe(buf: Buffer): number {
  return buf ? buf.length : 0;
}
