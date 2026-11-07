"use client";

import React, { useState } from "react";
import { Lock, Eye, EyeOff, ShieldCheck, ArrowRight, KeyRound, CheckCircle2, AlertTriangle, RefreshCw } from "lucide-react";

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

type LoginMode = "login" | "must-change" | "recovery";

export function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const [mode, setMode] = useState<LoginMode>("login");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Temporary password change fields
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Recovery fields
  const [recoveryCode, setRecoveryCode] = useState("");

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

  const handleRecoverySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recoveryCode.trim()) {
      setErrorMessage("Please enter your recovery code.");
      return;
    }

    if (!newPassword || newPassword.length < 8) {
      setErrorMessage("New password must be at least 8 characters long.");
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
        setPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setRecoveryCode("");
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
                {mode === "must-change" ? <KeyRound className="h-7 w-7" /> : <Lock className="h-7 w-7" />}
              </div>
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider text-accent-emerald-light bg-accent-emerald/10 border border-accent-emerald/20 mb-2">
                  <ShieldCheck className="h-3 w-3" />
                  Executive CMS Portal
                </span>
                <h1 className="text-2xl font-bold tracking-tight text-content-primary">
                  {mode === "must-change"
                    ? "Update Client Password"
                    : mode === "recovery"
                    ? "Reset Admin Access"
                    : "Administrator Login"}
                </h1>
                <p className="text-xs text-content-secondary mt-1">
                  {mode === "must-change"
                    ? "Handover Security: Set your private permanent password."
                    : mode === "recovery"
                    ? "Enter emergency recovery code to regain access."
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

                <div className="pt-2 text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setMode("recovery");
                      setErrorMessage("");
                      setSuccessMessage("");
                    }}
                    className="text-xs text-content-muted hover:text-accent-gold transition-colors"
                  >
                    Forgot password? Use recovery code
                  </button>
                </div>
              </form>
            )}

            {/* 2. MUST CHANGE PASSWORD FORM (First-login handover workflow) */}
            {mode === "must-change" && (
              <form onSubmit={handlePasswordChangeSubmit} className="space-y-4">
                <div className="p-3 rounded-xl bg-accent-gold/10 border border-accent-gold/20 text-xs text-accent-gold-light mb-3">
                  <p className="font-semibold">Security Handover Notice:</p>
                  <p className="mt-0.5 text-content-secondary">
                    You logged in using temporary credentials. Choose a permanent private password (min 8 chars, letters & numbers).
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-content-secondary mb-1.5">
                    New Private Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Minimum 8 characters..."
                      disabled={isLoading}
                      className="w-full px-4 py-2.5 pr-10 rounded-xl bg-background/80 border border-border-muted focus:border-accent-emerald text-sm text-content-primary outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-content-muted hover:text-content-primary p-1"
                    >
                      {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
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
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-accent-emerald hover:bg-accent-emerald-dark text-background shadow-lg transition-all disabled:opacity-50 mt-4"
                >
                  {isLoading ? (
                    <>
                      <span className="h-4 w-4 rounded-full border-2 border-background border-t-transparent animate-spin" />
                      <span>Saving Permanent Password...</span>
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

            {/* 3. RECOVERY CODE RESET FORM */}
            {mode === "recovery" && (
              <form onSubmit={handleRecoverySubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-content-secondary mb-1.5">
                    Emergency Recovery Code
                  </label>
                  <input
                    type="text"
                    value={recoveryCode}
                    onChange={(e) => setRecoveryCode(e.target.value)}
                    placeholder="e.g. FAIZ-2026-NUST-RECOVER"
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
                    placeholder="Minimum 8 characters..."
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

                <div className="pt-2 text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setMode("login");
                      setErrorMessage("");
                      setSuccessMessage("");
                    }}
                    className="text-xs text-content-muted hover:text-content-primary transition-colors"
                  >
                    Back to login
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
