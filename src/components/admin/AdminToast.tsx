"use client";

import React, { useEffect } from "react";
import { CheckCircle2, AlertTriangle, X, Info } from "lucide-react";

export interface ToastMessage {
  id: string;
  type: "success" | "error" | "info" | "warning";
  text: string;
}

interface AdminToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export function AdminToast({ toasts, onDismiss }: AdminToastProps) {
  useEffect(() => {
    if (toasts.length === 0) return;
    const timer = setTimeout(() => {
      onDismiss(toasts[0].id);
    }, 4500);
    return () => clearTimeout(timer);
  }, [toasts, onDismiss]);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-md w-full pointer-events-none">
      {toasts.map((toast) => {
        const bg =
          toast.type === "success"
            ? "bg-accent-emerald-deep/90 border-accent-emerald/40 text-accent-emerald-light"
            : toast.type === "error"
            ? "bg-red-950/90 border-red-500/40 text-red-200"
            : toast.type === "warning"
            ? "bg-amber-950/90 border-amber-500/40 text-amber-200"
            : "bg-surface/90 border-border-muted text-content-primary";

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-xl border shadow-xl backdrop-blur-md animate-fade-in-up transition-all ${bg}`}
          >
            <div className="flex items-center gap-3">
              {toast.type === "success" && <CheckCircle2 className="h-5 w-5 text-accent-emerald flex-shrink-0" />}
              {toast.type === "error" && <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0" />}
              {toast.type === "warning" && <AlertTriangle className="h-5 w-5 text-amber-400 flex-shrink-0" />}
              {toast.type === "info" && <Info className="h-5 w-5 text-sky-400 flex-shrink-0" />}
              <p className="text-sm font-medium">{toast.text}</p>
            </div>
            <button
              onClick={() => onDismiss(toast.id)}
              className="p-1 rounded-md hover:bg-white/10 text-content-muted hover:text-content-primary transition-colors"
              aria-label="Dismiss"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}

