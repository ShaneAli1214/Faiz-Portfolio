import React from "react";
import Link from "next/link";
import { Mail, Phone, Linkedin, Award, ArrowUp } from "lucide-react";
import { initialPortfolioData } from "@/data/portfolioData";

export const Footer: React.FC = () => {
  const { profile, navigationRoutes } = initialPortfolioData;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border-muted/60 bg-background-secondary/90 mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: Identity & Bio */}
          <div className="space-y-4 lg:col-span-1">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-md bg-surface border border-accent-emerald/40 flex items-center justify-center text-accent-emerald font-bold text-xs">
                FW
              </div>
              <span className="font-bold text-base text-content-primary">
                {profile.fullName}
              </span>
            </div>
            <p className="text-xs text-accent-gold-light font-medium">
              {profile.tagline}
            </p>
            <p className="text-xs text-content-secondary leading-relaxed">
              {profile.degree} • {profile.institution}
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-accent-gold/10 border border-accent-gold/20 text-[11px] text-accent-gold font-medium">
              <Award className="h-3.5 w-3.5" />
              <span>Rector&apos;s Gold Medalist | CGPA {profile.cgpa}</span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-content-primary">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-content-secondary">
              {navigationRoutes.slice(0, 5).map((route) => (
                <li key={route.href}>
                  <Link
                    href={route.href}
                    className="hover:text-accent-emerald transition-colors"
                  >
                    {route.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Professional Portals */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-content-primary">
              Specializations
            </h4>
            <ul className="space-y-2 text-xs text-content-secondary">
              {navigationRoutes.slice(5).map((route) => (
                <li key={route.href}>
                  <Link
                    href={route.href}
                    className="hover:text-accent-emerald transition-colors"
                  >
                    {route.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Verified Contact Channels */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-content-primary">
              Verified Contact
            </h4>
            <ul className="space-y-2.5 text-xs text-content-secondary">
              <li>
                <a
                  href={`mailto:${profile.contact.email}`}
                  className="flex items-center gap-2 hover:text-accent-emerald-light transition-colors"
                >
                  <Mail className="h-3.5 w-3.5 text-accent-emerald" />
                  <span className="truncate">{profile.contact.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${profile.contact.phone}`}
                  className="flex items-center gap-2 hover:text-accent-emerald-light transition-colors"
                >
                  <Phone className="h-3.5 w-3.5 text-accent-emerald" />
                  <span>{profile.contact.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={profile.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-accent-gold-light transition-colors"
                >
                  <Linkedin className="h-3.5 w-3.5 text-accent-gold" />
                  <span>LinkedIn Profile</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border-muted/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-content-muted">
          <p suppressHydrationWarning>
            © {currentYear} {profile.fullName}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px] text-content-muted">
              Engineering & Sustainability Architecture
            </span>
            <Link
              href="/admin"
              className="text-[11px] text-content-muted hover:text-accent-gold transition-colors"
            >
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

