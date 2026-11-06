"use client";

import React from "react";
import {
  FolderGit2,
  Briefcase,
  Wrench,
  MessageSquare,
  Palette,
  User,
  ArrowRight,
  Database,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Award,
  Layers,
  Image,
} from "lucide-react";
import { AdminSection } from "./AdminSidebar";
import { PortfolioData } from "@/types/portfolio";
import { ThemeConfig } from "@/types/theme";

interface AdminDashboardViewProps {
  portfolioData: PortfolioData;
  themeConfig: ThemeConfig;
  unreadCount: number;
  totalInquiries: number;
  mediaCount: number;
  onNavigate: (section: AdminSection) => void;
}

export function AdminDashboardView({
  portfolioData,
  themeConfig,
  unreadCount,
  totalInquiries,
  mediaCount,
  onNavigate,
}: AdminDashboardViewProps) {
  const { profile, projects, experience, skillCategories, awards } = portfolioData;

  const totalSkills = skillCategories.reduce(
    (acc, cat) => acc + (cat.skills ? cat.skills.length : 0),
    0
  );

  const stats = [
    {
      label: "Portfolio Projects",
      value: projects.length,
      detail: `${projects.filter((p) => p.isFeaturedAcademic).length} Featured Academic`,
      icon: <FolderGit2 className="h-5 w-5 text-accent-emerald" />,
      action: "projects" as AdminSection,
    },
    {
      label: "Career Positions",
      value: experience.length,
      detail: "Packages, Descon, Daveyol, Faiz, ARL",
      icon: <Briefcase className="h-5 w-5 text-accent-gold" />,
      action: "experience" as AdminSection,
    },
    {
      label: "Categorized Skills",
      value: totalSkills,
      detail: `${skillCategories.length} Skill Categories`,
      icon: <Wrench className="h-5 w-5 text-accent-emerald" />,
      action: "skills" as AdminSection,
    },
    {
      label: "Inquiries Received",
      value: totalInquiries,
      detail: unreadCount > 0 ? `${unreadCount} unread messages` : "All messages read",
      icon: <MessageSquare className="h-5 w-5 text-accent-gold" />,
      badge: unreadCount > 0 ? unreadCount : undefined,
      action: "messages" as AdminSection,
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-surface via-background-secondary to-surface border border-border-muted p-6 sm:p-8">
        <div className="absolute top-0 right-0 w-80 h-80 bg-accent-emerald/10 blur-3xl rounded-full pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-accent-emerald-light bg-accent-emerald/10 border border-accent-emerald/20">
              <ShieldCheck className="h-3.5 w-3.5 text-accent-emerald" />
              Verified Portfolio CMS
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-content-primary">
              Welcome, {profile.fullName}
            </h2>
            <p className="text-sm text-content-secondary leading-relaxed">
              Manage your live portfolio content, engineering case studies, career experience, and visual theme tokens dynamically without editing source code.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap gap-3">
            <button
              onClick={() => onNavigate("theme")}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-content-primary bg-surface hover:bg-surface-hover border border-border-muted transition-colors shadow-sm"
            >
              <Palette className="h-4 w-4 text-accent-emerald" />
              <span>Theme Editor</span>
            </button>
            <button
              onClick={() => onNavigate("projects")}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-background bg-accent-emerald hover:bg-accent-emerald-dark transition-all shadow-lg shadow-accent-emerald/20"
            >
              <FolderGit2 className="h-4 w-4" />
              <span>Manage Projects</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, idx) => (
          <div
            key={idx}
            onClick={() => onNavigate(s.action)}
            className="cursor-pointer group p-5 rounded-2xl bg-surface border border-border-muted hover:border-accent-emerald/40 transition-all hover:-translate-y-0.5 shadow-sm space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-background-secondary border border-border-subtle group-hover:scale-105 transition-transform">
                {s.icon}
              </div>
              {s.badge && (
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-accent-gold text-background shadow">
                  {s.badge} New
                </span>
              )}
            </div>
            <div>
              <p className="text-xs font-medium text-content-muted uppercase tracking-wider">
                {s.label}
              </p>
              <p className="text-3xl font-extrabold text-content-primary mt-1">
                {s.value}
              </p>
              <p className="text-xs text-content-secondary mt-1 flex items-center justify-between">
                <span>{s.detail}</span>
                <ArrowRight className="h-3 w-3 text-content-muted group-hover:text-accent-emerald group-hover:translate-x-1 transition-all" />
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Action Cards & System Health */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Shortcuts */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-surface border border-border-muted space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-content-primary flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-accent-emerald" />
              Editorial Shortcuts
            </h3>
            <span className="text-xs text-content-muted">One-click management</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => onNavigate("profile")}
              className="p-4 rounded-xl bg-background-secondary hover:bg-background-tertiary border border-border-subtle hover:border-accent-emerald/30 text-left transition-all group flex items-start gap-3"
            >
              <div className="p-2 rounded-lg bg-surface text-accent-emerald group-hover:scale-105 transition-transform">
                <User className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-content-primary group-hover:text-accent-emerald-light transition-colors">
                  Edit Profile & Bio
                </p>
                <p className="text-[11px] text-content-secondary mt-0.5">
                  Update narrative, CGPA, verified metrics & milestones
                </p>
              </div>
            </button>

            <button
              onClick={() => onNavigate("media")}
              className="p-4 rounded-xl bg-background-secondary hover:bg-background-tertiary border border-border-subtle hover:border-accent-emerald/30 text-left transition-all group flex items-start gap-3"
            >
              <div className="p-2 rounded-lg bg-surface text-accent-gold group-hover:scale-105 transition-transform">
                <Image className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-content-primary group-hover:text-accent-gold-light transition-colors">
                  Media & Headshot Library
                </p>
                <p className="text-[11px] text-content-secondary mt-0.5">
                  {mediaCount} files uploaded in persistent library
                </p>
              </div>
            </button>

            <button
              onClick={() => onNavigate("theme")}
              className="p-4 rounded-xl bg-background-secondary hover:bg-background-tertiary border border-border-subtle hover:border-accent-emerald/30 text-left transition-all group flex items-start gap-3"
            >
              <div className="p-2 rounded-lg bg-surface text-accent-emerald group-hover:scale-105 transition-transform">
                <Palette className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-content-primary group-hover:text-accent-emerald-light transition-colors">
                  Visual Theme Customizer
                </p>
                <p className="text-[11px] text-content-secondary mt-0.5">
                  Primary ({themeConfig.primaryColor}), Gold ({themeConfig.secondaryColor})
                </p>
              </div>
            </button>

            <button
              onClick={() => onNavigate("messages")}
              className="p-4 rounded-xl bg-background-secondary hover:bg-background-tertiary border border-border-subtle hover:border-accent-emerald/30 text-left transition-all group flex items-start gap-3"
            >
              <div className="p-2 rounded-lg bg-surface text-accent-gold group-hover:scale-105 transition-transform">
                <MessageSquare className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-content-primary group-hover:text-accent-gold-light transition-colors">
                  Inquiries & Recruiters
                </p>
                <p className="text-[11px] text-content-secondary mt-0.5">
                  {unreadCount} unread message{unreadCount === 1 ? "" : "s"} waiting for review
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* System & Persistence Status */}
        <div className="p-6 rounded-2xl bg-surface border border-border-muted space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-content-primary flex items-center gap-2">
            <Database className="h-4 w-4 text-accent-emerald" />
            System Health
          </h3>

          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-background-secondary border border-border-subtle flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-accent-emerald" />
                <div>
                  <p className="text-xs font-semibold text-content-primary">Content Store</p>
                  <p className="text-[10px] text-content-muted font-mono">portfolio-cms.json</p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-accent-emerald-light bg-accent-emerald/10 px-2 py-0.5 rounded-full">
                Active
              </span>
            </div>

            <div className="p-3 rounded-xl bg-background-secondary border border-border-subtle flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-accent-emerald" />
                <div>
                  <p className="text-xs font-semibold text-content-primary">Theme Injection</p>
                  <p className="text-[10px] text-content-muted font-mono">Dynamic CSS Variables</p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-accent-emerald-light bg-accent-emerald/10 px-2 py-0.5 rounded-full">
                Synchronized
              </span>
            </div>

            <div className="p-3 rounded-xl bg-background-secondary border border-border-subtle flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-accent-emerald" />
                <div>
                  <p className="text-xs font-semibold text-content-primary">Uploads Storage</p>
                  <p className="text-[10px] text-content-muted font-mono">public/uploads/</p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-accent-emerald-light bg-accent-emerald/10 px-2 py-0.5 rounded-full">
                Writable
              </span>
            </div>

            <div className="p-3 rounded-xl bg-background-secondary border border-border-subtle flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-accent-emerald" />
                <div>
                  <p className="text-xs font-semibold text-content-primary">Contact API</p>
                  <p className="text-[10px] text-content-muted font-mono">inquiries.json</p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-accent-emerald-light bg-accent-emerald/10 px-2 py-0.5 rounded-full">
                Online
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
