"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Shield } from "lucide-react";
import { initialPortfolioData } from "@/data/portfolioData";
import { MobileNav } from "./MobileNav";
import { cn } from "@/lib/utils";

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const routes = initialPortfolioData.navigationRoutes;

  // Split routes for clean desktop header display
  const publicRoutes = routes.filter((r) => !r.isPrivate);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border-muted/60 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Identity Branding */}
          <Link
            href="/"
            className="flex items-center gap-2 group transition-colors"
          >
            <div className="h-8 w-8 rounded-lg bg-surface border border-accent-emerald/40 flex items-center justify-center text-accent-emerald font-bold text-sm group-hover:border-accent-emerald transition-colors">
              FW
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-content-primary group-hover:text-accent-emerald-light transition-colors leading-tight">
                Muhammad Faiz Waheed
              </span>
              <span className="text-[10px] uppercase font-mono tracking-wider text-accent-gold-light">
                Chemical Engineer
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-1">
            {publicRoutes.map((route) => {
              const isActive =
                route.href === "/"
                  ? pathname === "/"
                  : pathname?.startsWith(route.href);

              return (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-150 relative",
                    isActive
                      ? "text-accent-emerald font-semibold bg-accent-emerald/10 border border-accent-emerald/20"
                      : "text-content-secondary hover:text-content-primary hover:bg-surface/60"
                  )}
                >
                  {route.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Area */}
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className={cn(
                "hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium border transition-colors",
                pathname?.startsWith("/admin")
                  ? "bg-accent-gold/20 text-accent-gold-light border-accent-gold/40"
                  : "bg-surface/40 text-content-muted border-border-muted hover:text-accent-gold hover:border-accent-gold/30"
              )}
              title="Admin Portal"
            >
              <Shield className="h-3.5 w-3.5" />
              <span className="hidden md:inline">Admin</span>
            </Link>

            <Link
              href="/contact"
              className="hidden lg:inline-flex items-center justify-center px-4 py-1.5 rounded-lg text-xs font-semibold bg-accent-emerald text-background hover:bg-accent-emerald-dark transition-all duration-150 shadow-emerald-subtle"
            >
              Get in Touch
            </Link>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="xl:hidden p-2 rounded-lg text-content-secondary hover:text-content-primary hover:bg-surface border border-border-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-emerald"
              aria-label="Open navigation menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-dialog"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Responsive Mobile Drawer */}
      <MobileNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        routes={routes}
      />
    </>
  );
};

