"use client";

import React, { useState } from "react";
import { Lock, Eye, EyeOff, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

export function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
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
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        onLoginSuccess();
      } else {
        setErrorMessage(data.error || "Authentication failed. Check your password.");
      }
    } catch {
      setErrorMessage("Network error during authentication. Please retry.");
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
                <Lock className="h-7 w-7" />
              </div>
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider text-accent-emerald-light bg-accent-emerald/10 border border-accent-emerald/20 mb-2">
                  <ShieldCheck className="h-3 w-3" />
                  Executive CMS Portal
                </span>
                <h1 className="text-2xl font-bold tracking-tight text-content-primary">
                  Administrator Login
                </h1>
                <p className="text-xs text-content-secondary mt-1">
                  Content Management & Visual Controls for Muhammad Faiz Waheed
                </p>
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="mb-6 p-3.5 rounded-xl bg-red-950/60 border border-red-500/40 text-xs text-red-200 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-red-400 animate-pulse flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-content-secondary mb-2">
                  Admin Master Password
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

              {/* Verified Credential Hint Box */}
              <div className="p-3 rounded-xl bg-background-secondary/80 border border-border-subtle flex items-start gap-2.5 text-xs text-content-muted">
                <Sparkles className="h-4 w-4 text-accent-gold flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-content-secondary font-medium">Default Password Credential:</p>
                  <p className="font-mono text-accent-gold-light mt-0.5 select-all">FaizWaheed@2026</p>
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
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

