"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Lock, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavLink {
  label: string;
  href: string;
  isPrivate?: boolean;
}

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  routes: NavLink[];
}

export const MobileNav: React.FC<MobileNavProps> = ({
  isOpen,
  onClose,
  routes,
}) => {
  const pathname = usePathname();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      id="mobile-nav-dialog"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
      className="fixed inset-0 z-50 lg:hidden"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-background-secondary border-l border-border-muted p-6 flex flex-col justify-between shadow-2xl z-10 overflow-y-auto">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-border-muted">
            <span className="text-base font-bold text-content-primary">
              Navigation
            </span>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-content-secondary hover:text-content-primary hover:bg-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-emerald"
              aria-label="Close navigation menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Links */}
          <nav className="mt-6 flex flex-col space-y-1.5">
            {routes.map((route) => {
              const isActive =
                route.href === "/"
                  ? pathname === "/"
                  : pathname?.startsWith(route.href);

              return (
                <Link
                  key={route.href}
                  href={route.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-accent-emerald/10 text-accent-emerald border border-accent-emerald/20"
                      : "text-content-secondary hover:text-content-primary hover:bg-surface",
                    route.isPrivate && "text-accent-gold"
                  )}
                >
                  <span className="flex items-center gap-2">
                    {route.isPrivate && <Lock className="h-3.5 w-3.5 text-accent-gold" />}
                    {route.label}
                  </span>
                  {isActive && (
                    <span className="h-1.5 w-1.5 rounded-full bg-accent-emerald" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer info in drawer */}
        <div className="pt-6 border-t border-border-muted text-xs text-content-muted">
          <p className="font-semibold text-content-secondary">
            Muhammad Faiz Waheed
          </p>
          <p className="mt-1">Chemical Engineer & Sustainability Professional</p>
        </div>
      </div>
    </div>
  );
};

