"use client";

import React, { useState } from "react";
import {
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowRight,
  KeyRound,
  CheckCircle2,
  AlertTriangle,
  Mail,
  RefreshCw,
  Send,
  HelpCircle,
} from "lucide-react";

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

type LoginMode = "login" | "must-change" | "otp" | "recovery";

export function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const [mode, setMode] = useState<LoginMode>("login");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Temporary password change / reset fields
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);

  // OTP fields
  const [otpCode, setOtpCode] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [maskedEmail, setMaskedEmail] = useState("f***9@gmail.com");

  // Emergency Recovery code field
  const [recoveryCode, setRecoveryCode] = useState("");

  const resetFormState = () => {
    setErrorMessage("");
    setSuccessMessage("");
    setPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setOtpCode("");
    setRecoveryCode("");
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setErrorMessage("Please enter your administrator password.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: password.trim() }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        if (data.mustChangePassword) {
          setMode("must-change");
          setSuccessMessage("Temporary credentials verified. Please set your new private password.");
        } else {
          onLoginSuccess();
        }
      } else {
        setErrorMessage(data.error || "Authentication failed. Check your credentials.");
      }
    } catch {
      setErrorMessage("Network error during authentication. Please retry.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChangeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 8) {
      setErrorMessage("New password must be at least 8 characters long.");
      return;
    }

    if (!/[a-zA-Z]/.test(newPassword) || !/[0-9]/.test(newPassword)) {
      setErrorMessage("Password must contain both letters and numbers.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("New passwords do not match.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/admin/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: password.trim(),
          newPassword: newPassword.trim(),
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccessMessage("Password successfully updated. Unlocking CMS...");
        setTimeout(() => {
          onLoginSuccess();
        }, 1200);
      } else {
        setErrorMessage(data.error || "Failed to update password.");
      }
    } catch {
      setErrorMessage("Network error while updating password.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendOtp = async () => {
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const res = await fetch("/api/admin/auth/otp/send", {
        method: "POST",
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setOtpSent(true);
        if (data.maskedEmail) setMaskedEmail(data.maskedEmail);
        setSuccessMessage(data.message || `Verification code sent to registered administrator email.`);
      } else {
        setErrorMessage(data.error || "Failed to send verification code.");
      }
    } catch {
      setErrorMessage("Network error sending verification code.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode.trim() || otpCode.trim().length !== 6) {
      setErrorMessage("Please enter the 6-digit verification code sent to your email.");
      return;
    }

    if (!newPassword || newPassword.length < 8) {
      setErrorMessage("New password must be at least 8 characters long.");
      return;
    }

    if (!/[a-zA-Z]/.test(newPassword) || !/[0-9]/.test(newPassword)) {
      setErrorMessage("Password must contain both letters and numbers.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("New passwords do not match.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/admin/auth/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          otp: otpCode.trim(),
          newPassword: newPassword.trim(),
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccessMessage("Password reset successfully! You can now log in with your new password.");
        setMode("login");
        resetFormState();
      } else {
        setErrorMessage(data.error || "Failed to verify code.");
      }
    } catch {
      setErrorMessage("Network error during password reset.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRecoverySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recoveryCode.trim()) {
      setErrorMessage("Please enter your emergency recovery code.");
      return;
    }

    if (!newPassword || newPassword.length < 8) {
      setErrorMessage("New password must be at least 8 characters long.");
      return;
    }

    if (!/[a-zA-Z]/.test(newPassword) || !/[0-9]/.test(newPassword)) {
      setErrorMessage("Password must contain both letters and numbers.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("New passwords do not match.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/admin/auth/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recoveryCode: recoveryCode.trim(),
          newPassword: newPassword.trim(),
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccessMessage("Password reset successfully! Please login with your new password.");
        setMode("login");
        resetFormState();
      } else {
        setErrorMessage(data.error || "Failed to reset password.");
      }
    } catch {
      setErrorMessage("Network error during password reset.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Glow backdrop */}
        <div className="relative">
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-accent-emerald/20 via-accent-gold/20 to-accent-emerald/20 blur-xl opacity-75" />

          <div className="relative rounded-2xl bg-surface/95 border border-border-muted p-8 shadow-2xl backdrop-blur-md">
            {/* Header */}
            <div className="text-center space-y-3 mb-8">
              <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-emerald/20 to-accent-emerald-deep/40 border border-accent-emerald/40 flex items-center justify-center text-accent-emerald shadow-lg">
                {mode === "must-change" ? (
                  <KeyRound className="h-7 w-7" />
                ) : mode === "otp" ? (
                  <Mail className="h-7 w-7" />
                ) : (
                  <Lock className="h-7 w-7" />
                )}
              </div>
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider text-accent-emerald-light bg-accent-emerald/10 border border-accent-emerald/20 mb-2">
                  <ShieldCheck className="h-3 w-3" />
                  Executive CMS Portal
                </span>
                <h1 className="text-2xl font-bold tracking-tight text-content-primary">
                  {mode === "must-change"
                    ? "Update Client Password"
                    : mode === "otp"
                    ? "Reset Password via Email"
                    : mode === "recovery"
                    ? "Emergency Recovery"
                    : "Administrator Login"}
                </h1>
                <p className="text-xs text-content-secondary mt-1">
                  {mode === "must-change"
                    ? "Handover Security: Set your private permanent password."
                    : mode === "otp"
                    ? "Verification codes are sent to your registered email."
                    : mode === "recovery"
                    ? "Use your single-use recovery code to restore access."
                    : "Content Management & Visual Controls for Muhammad Faiz Waheed"}
                </p>
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="mb-6 p-3.5 rounded-xl bg-red-950/60 border border-red-500/40 text-xs text-red-200 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-400 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Success Message */}
            {successMessage && (
              <div className="mb-6 p-3.5 rounded-xl bg-accent-emerald/15 border border-accent-emerald/40 text-xs text-accent-emerald-light flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-accent-emerald flex-shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}

            {/* 1. STANDARD LOGIN FORM */}
            {mode === "login" && (
              <form onSubmit={handleLoginSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-content-secondary mb-2">
                    Admin Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter admin password..."
                      disabled={isLoading}
                      className="w-full px-4 py-3 pr-12 rounded-xl bg-background/80 border border-border-muted focus:border-accent-emerald focus:ring-1 focus:ring-accent-emerald text-sm text-content-primary placeholder:text-content-muted outline-none transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      tabIndex={-1}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-content-muted hover:text-content-primary transition-colors p-1"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-accent-emerald hover:bg-accent-emerald-dark text-background shadow-lg shadow-accent-emerald/20 hover:shadow-accent-emerald/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {isLoading ? (
                    <>
                      <span className="h-4 w-4 rounded-full border-2 border-background border-t-transparent animate-spin" />
                      <span>Verifying Credentials...</span>
                    </>
                  ) : (
                    <>
                      <span>Unlock Portfolio CMS</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>

                <div className="pt-2 flex flex-col items-center gap-2 text-center">
                  <button
                    type="button"
                    onClick={() => {
                      resetFormState();
                      setMode("otp");
                    }}
                    className="text-xs text-content-muted hover:text-accent-emerald-light transition-colors"
                  >
                    Forgot password? Send code to Gmail
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      resetFormState();
                      setMode("recovery");
                    }}
                    className="text-xs text-content-muted hover:text-accent-gold transition-colors"
                  >
                    Use Emergency Recovery Code
                  </button>
                </div>
              </form>
            )}

            {/* 2. MUST CHANGE PASSWORD FORM */}
            {mode === "must-change" && (
              <form onSubmit={handlePasswordChangeSubmit} className="space-y-4">
                <div className="p-3 rounded-xl bg-accent-gold/10 border border-accent-gold/20 text-xs text-accent-gold-light mb-3">
                  <p className="font-semibold">Security Handover Notice:</p>
                  <p className="mt-0.5 text-content-secondary">
                    You logged in using temporary credentials. Choose a permanent private password (min 8 chars, letters &amp; numbers).
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-content-secondary mb-1.5">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password (min 8 chars)..."
                    disabled={isLoading}
                    className="w-full px-4 py-2.5 rounded-xl bg-background/80 border border-border-muted focus:border-accent-emerald text-sm text-content-primary outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-content-secondary mb-1.5">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password..."
                    disabled={isLoading}
                    className="w-full px-4 py-2.5 rounded-xl bg-background/80 border border-border-muted focus:border-accent-emerald text-sm text-content-primary outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-accent-emerald hover:bg-accent-emerald-dark text-background shadow-lg transition-all disabled:opacity-50 mt-4"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      <span>Saving New Password...</span>
                    </>
                  ) : (
                    <>
                      <span>Save &amp; Enter CMS</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* 3. PRIMARY PASSWORD RECOVERY: GMAIL OTP */}
            {mode === "otp" && (
              <div className="space-y-4">
                <div className="p-3 rounded-xl bg-accent-emerald/10 border border-accent-emerald/20 text-xs text-content-secondary space-y-1">
                  <div className="flex items-center gap-2 text-accent-emerald-light font-semibold">
                    <Mail className="h-4 w-4" />
                    <span>Registered Administrator Recovery</span>
                  </div>
                  <p>
                    Verification codes are dispatched strictly to your verified administrative address ({maskedEmail}).
                  </p>
                </div>

                {!otpSent ? (
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={isLoading}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-accent-emerald hover:bg-accent-emerald-dark text-background shadow-lg transition-all disabled:opacity-50"
                    >
                      {isLoading ? (
                        <>
                          <RefreshCw className="h-4 w-4 animate-spin" />
                          <span>Dispatching Verification Code...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          <span>Send 6-Digit Code to Registered Email</span>
                        </>
                      )}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleVerifyOtpSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-content-secondary mb-1.5">
                        6-Digit Verification Code
                      </label>
                      <input
                        type="text"
                        maxLength={6}
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                        placeholder="e.g. 123456"
                        disabled={isLoading}
                        className="w-full px-4 py-2.5 rounded-xl bg-background/80 border border-border-muted focus:border-accent-emerald text-center text-lg font-mono tracking-widest text-content-primary outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-content-secondary mb-1.5">
                        New Password
                      </label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Minimum 8 characters (letters &amp; numbers)..."
                        disabled={isLoading}
                        className="w-full px-4 py-2.5 rounded-xl bg-background/80 border border-border-muted focus:border-accent-emerald text-sm text-content-primary outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-content-secondary mb-1.5">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm new password..."
                        disabled={isLoading}
                        className="w-full px-4 py-2.5 rounded-xl bg-background/80 border border-border-muted focus:border-accent-emerald text-sm text-content-primary outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-accent-emerald hover:bg-accent-emerald-dark text-background shadow-lg transition-all disabled:opacity-50 mt-4"
                    >
                      {isLoading ? (
                        <>
                          <RefreshCw className="h-4 w-4 animate-spin" />
                          <span>Verifying &amp; Resetting...</span>
                        </>
                      ) : (
                        <span>Verify Code &amp; Reset Password</span>
                      )}
                    </button>

                    <div className="text-center pt-2">
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        disabled={isLoading}
                        className="text-xs text-accent-emerald-light hover:underline"
                      >
                        Resend verification code
                      </button>
                    </div>
                  </form>
                )}

                <div className="pt-3 border-t border-border-muted flex items-center justify-between text-xs text-content-muted">
                  <button
                    type="button"
                    onClick={() => {
                      resetFormState();
                      setMode("login");
                    }}
                    className="hover:text-content-primary transition-colors"
                  >
                    &larr; Back to Login
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      resetFormState();
                      setMode("recovery");
                    }}
                    className="hover:text-accent-gold transition-colors"
                  >
                    Use Recovery Code instead
                  </button>
                </div>
              </div>
            )}

            {/* 4. EMERGENCY RECOVERY CODE RESET FORM */}
            {mode === "recovery" && (
              <form onSubmit={handleRecoverySubmit} className="space-y-4">
                <div className="p-3 rounded-xl bg-accent-gold/10 border border-accent-gold/20 text-xs text-content-secondary">
                  <p className="font-semibold text-accent-gold">Emergency Recovery Access</p>
                  <p className="mt-0.5">
                    Enter the single-use 16-character recovery code generated in your Admin Security settings.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-content-secondary mb-1.5">
                    Emergency Recovery Code
                  </label>
                  <input
                    type="text"
                    value={recoveryCode}
                    onChange={(e) => setRecoveryCode(e.target.value.toUpperCase())}
                    placeholder="Enter your 16-character recovery code"
                    disabled={isLoading}
                    className="w-full px-4 py-2.5 rounded-xl bg-background/80 border border-border-muted focus:border-accent-gold text-sm font-mono text-content-primary outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-content-secondary mb-1.5">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Minimum 8 characters (letters &amp; numbers)..."
                    disabled={isLoading}
                    className="w-full px-4 py-2.5 rounded-xl bg-background/80 border border-border-muted focus:border-accent-emerald text-sm text-content-primary outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-content-secondary mb-1.5">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter new password..."
                    disabled={isLoading}
                    className="w-full px-4 py-2.5 rounded-xl bg-background/80 border border-border-muted focus:border-accent-emerald text-sm text-content-primary outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-accent-gold hover:bg-accent-gold-light text-background shadow-lg transition-all disabled:opacity-50 mt-4"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      <span>Resetting Password...</span>
                    </>
                  ) : (
                    <span>Reset Password</span>
                  )}
                </button>

                <div className="pt-3 border-t border-border-muted flex items-center justify-between text-xs text-content-muted">
                  <button
                    type="button"
                    onClick={() => {
                      resetFormState();
                      setMode("login");
                    }}
                    className="hover:text-content-primary transition-colors"
                  >
                    &larr; Back to Login
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      resetFormState();
                      setMode("otp");
                    }}
                    className="hover:text-accent-emerald-light transition-colors"
                  >
                    Send code via Gmail OTP
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
