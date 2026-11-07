"use client";

import React from "react";
import { Menu, ExternalLink, ShieldCheck, Database, Sparkles, KeyRound } from "lucide-react";
import { AdminSection } from "./AdminSidebar";

interface AdminHeaderProps {
  activeSection: AdminSection;
  onOpenMobile: () => void;
  isSaving: boolean;
  lastSavedAt: string | null;
  onOpenPasswordModal?: () => void;
}

const sectionTitles: Record<AdminSection, { title: string; subtitle: string }> = {
  dashboard: {
    title: "Executive Overview",
    subtitle: "Real-time metrics, system health, and quick editorial shortcuts.",
  },
  general: {
    title: "General Portfolio Settings",
    subtitle: "Global meta parameters, backups, JSON import/export, and recovery.",
  },
  theme: {
    title: "Theme & Visual Customizer",
    subtitle: "Custom emerald & gold palettes, background depths, and live preview.",
  },
  profile: {
    title: "Profile & About Editor",
    subtitle: "Bio narrative, verified metrics, career milestones, and core values.",
  },
  media: {
    title: "Image & Media Library",
    subtitle: "Upload profile photos, project thumbnails, and manage digital assets.",
  },
  projects: {
    title: "Projects & Technical Work",
    subtitle: "Manage engineering capstones, industrial case studies, and live links.",
  },
  experience: {
    title: "Professional Experience",
    subtitle: "Manage career roles, corporate responsibilities, and industrial impacts.",
  },
  education: {
    title: "Education & Academics",
    subtitle: "Manage degrees, NUST CGPA, Dean's List, and academic honors.",
  },
  skills: {
    title: "Skills & Competencies",
    subtitle: "Manage categories, software proficiencies, and enterprise tools.",
  },
  achievements: {
    title: "Achievements & Awards",
    subtitle: "Rector's Gold Medal, Dean's List, and Harvard/McKinsey executive programs.",
  },
  leadership: {
    title: "Leadership & Community",
    subtitle: "Student leadership positions, Thar water pump drive, and community impact.",
  },
  contact: {
    title: "Contact Information",
    subtitle: "Verified email, phone, LinkedIn handle, and inquiry availability.",
  },
  seo: {
    title: "SEO & Social Metadata",
    subtitle: "Search engine optimization, Open Graph previews, and canonical domains.",
  },
  messages: {
    title: "Contact Inquiries Inbox",
    subtitle: "Direct visitor and recruiter correspondence saved from the contact form.",
  },
};

export function AdminHeader({
  activeSection,
  onOpenMobile,
  isSaving,
  lastSavedAt,
  onOpenPasswordModal,
}: AdminHeaderProps) {
  const meta = sectionTitles[activeSection] || {
    title: "Portfolio Management",
    subtitle: "Manage portfolio content and configuration.",
  };

  return (
    <header className="sticky top-0 z-20 bg-surface/90 backdrop-blur-md border-b border-border-muted px-4 sm:px-8 py-3.5 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger */}
        <button
          onClick={onOpenMobile}
          className="lg:hidden p-2 rounded-xl text-content-secondary hover:text-content-primary hover:bg-surface-hover border border-border-subtle"
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-accent-emerald font-semibold">
              CMS Console /
            </span>
            <h1 className="text-base sm:text-lg font-bold text-content-primary tracking-tight">
              {meta.title}
            </h1>
          </div>
          <p className="hidden sm:block text-xs text-content-secondary">
            {meta.subtitle}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Persistence Status Badge */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-background-secondary border border-border-subtle text-xs text-content-muted">
          <Database className="h-3.5 w-3.5 text-accent-emerald" />
          {isSaving ? (
            <span className="text-accent-gold flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-accent-gold animate-ping" />
              Saving to disk...
            </span>
          ) : (
            <span className="text-content-secondary">
              {lastSavedAt ? `Saved ${lastSavedAt}` : "Persistent JSON storage active"}
            </span>
          )}
        </div>

        {/* Security / Password Button */}
        {onOpenPasswordModal && (
          <button
            type="button"
            onClick={onOpenPasswordModal}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-accent-gold bg-accent-gold/10 hover:bg-accent-gold/20 border border-accent-gold/30 transition-all shadow-sm"
            title="Change Admin Password"
          >
            <KeyRound className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Password</span>
          </button>
        )}

        {/* View Public Site */}
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-accent-emerald bg-accent-emerald/10 hover:bg-accent-emerald/20 border border-accent-emerald/30 transition-all shadow-sm"
        >
          <span>Live Site</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </header>
  );
}

