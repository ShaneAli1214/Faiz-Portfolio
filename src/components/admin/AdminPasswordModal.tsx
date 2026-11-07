"use client";

import React, { useState } from "react";
import { KeyRound, Eye, EyeOff, CheckCircle2, AlertTriangle, X, ShieldCheck } from "lucide-react";

interface AdminPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (message: string) => void;
}

export function AdminPasswordModal({ isOpen, onClose, onSuccess }: AdminPasswordModalProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword) {
      setErrorMessage("Please enter your current password.");
      return;
    }

    if (!newPassword || newPassword.length < 8) {
      setErrorMessage("New password must be at least 8 characters long.");
      return;
    }

    if (!/[a-zA-Z]/.test(newPassword) || !/[0-9]/.test(newPassword)) {
      setErrorMessage("New password must contain both letters and numbers.");
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
          currentPassword: currentPassword.trim(),
          newPassword: newPassword.trim(),
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        onSuccess(data.message || "Password updated successfully.");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        onClose();
      } else {
        setErrorMessage(data.error || "Failed to update password.");
      }
    } catch {
      setErrorMessage("Network error while connecting to authentication service.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-fade-in-up">
      <div className="w-full max-w-md rounded-2xl bg-surface border border-border-muted shadow-2xl p-6 space-y-5">
        <div className="flex items-start justify-between border-b border-border-muted pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-accent-emerald/15 border border-accent-emerald/30 text-accent-emerald">
              <KeyRound className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-content-primary">
                Update Admin Password
              </h3>
              <p className="text-xs text-content-secondary">
                Executive credentials for Muhammad Faiz Waheed
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-content-muted hover:text-content-primary hover:bg-surface-hover transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {errorMessage && (
          <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-xs text-red-200 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-red-400 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-content-secondary mb-1.5">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showCurrent ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter existing password..."
                disabled={isLoading}
                className="w-full px-3.5 py-2.5 pr-10 rounded-xl bg-background-secondary border border-border-muted focus:border-accent-emerald text-sm text-content-primary outline-none"
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-content-muted hover:text-content-primary p-1"
              >
                {showCurrent ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-content-secondary mb-1.5">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Minimum 8 characters (letters & numbers)..."
                disabled={isLoading}
                className="w-full px-3.5 py-2.5 pr-10 rounded-xl bg-background-secondary border border-border-muted focus:border-accent-emerald text-sm text-content-primary outline-none"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-content-muted hover:text-content-primary p-1"
              >
                {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
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
              placeholder="Confirm new password..."
              disabled={isLoading}
              className="w-full px-3.5 py-2.5 rounded-xl bg-background-secondary border border-border-muted focus:border-accent-emerald text-sm text-content-primary outline-none"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-content-secondary hover:text-content-primary hover:bg-surface-hover border border-border-subtle transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-5 py-2 rounded-xl text-xs font-semibold bg-accent-emerald hover:bg-accent-emerald-dark text-background shadow-md transition-all disabled:opacity-50"
            >
              {isLoading ? "Updating..." : "Save Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

