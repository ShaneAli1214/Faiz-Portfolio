"use client";

import React from "react";
import { AlertTriangle, X } from "lucide-react";

interface AdminConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "primary";
  onConfirm: () => void;
  onCancel: () => void;
}

export function AdminConfirmModal({
  isOpen,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger",
  onConfirm,
  onCancel,
}: AdminConfirmModalProps) {
  if (!isOpen) return null;

  const btnBg =
    variant === "danger"
      ? "bg-red-600 hover:bg-red-700 text-white"
      : variant === "warning"
      ? "bg-amber-600 hover:bg-amber-700 text-white"
      : "bg-accent-emerald hover:bg-accent-emerald-dark text-background font-semibold";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-fade-in-up">
      <div className="w-full max-w-md rounded-2xl bg-surface border border-border-muted p-6 shadow-2xl space-y-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${variant === "danger" ? "bg-red-500/10 text-red-400" : "bg-amber-500/10 text-amber-400"}`}>
              <AlertTriangle className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-content-primary">{title}</h3>
          </div>
          <button
            onClick={onCancel}
            className="p-1.5 rounded-lg text-content-muted hover:text-content-primary hover:bg-surface-hover transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="text-sm text-content-secondary leading-relaxed">{message}</p>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-border-muted">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-xl text-sm font-medium text-content-secondary hover:text-content-primary hover:bg-surface-hover border border-border-muted transition-colors"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all shadow-lg ${btnBg}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

