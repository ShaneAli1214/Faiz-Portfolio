"use client";

import React from "react";
import {
  LayoutDashboard,
  Settings,
  Palette,
  User,
  Image,
  FolderGit2,
  Briefcase,
  GraduationCap,
  Wrench,
  Award,
  Users,
  Mail,
  Search,
  MessageSquare,
  LogOut,
  Sparkles,
  ExternalLink,
} from "lucide-react";

export type AdminSection =
  | "dashboard"
  | "general"
  | "theme"
  | "profile"
  | "media"
  | "projects"
  | "experience"
  | "education"
  | "skills"
  | "achievements"
  | "leadership"
  | "contact"
  | "seo"
  | "messages";

interface AdminSidebarProps {
  activeSection: AdminSection;
  onSelectSection: (section: AdminSection) => void;
  onLogout: () => void;
  unreadMessagesCount: number;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export function AdminSidebar({
  activeSection,
  onSelectSection,
  onLogout,
  unreadMessagesCount,
  isOpenMobile,
  onCloseMobile,
}: AdminSidebarProps) {
  const menuItems: { id: AdminSection; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
    { id: "general", label: "General Settings", icon: <Settings className="h-4 w-4" /> },
    { id: "theme", label: "Theme Customization", icon: <Palette className="h-4 w-4" /> },
    { id: "profile", label: "Profile & About", icon: <User className="h-4 w-4" /> },
    { id: "media", label: "Image & Media Manager", icon: <Image className="h-4 w-4" /> },
    { id: "projects", label: "Projects Manager", icon: <FolderGit2 className="h-4 w-4" /> },
    { id: "experience", label: "Experience Manager", icon: <Briefcase className="h-4 w-4" /> },
    { id: "education", label: "Education Manager", icon: <GraduationCap className="h-4 w-4" /> },
    { id: "skills", label: "Skills Manager", icon: <Wrench className="h-4 w-4" /> },
    { id: "achievements", label: "Achievements Manager", icon: <Award className="h-4 w-4" /> },
    { id: "leadership", label: "Leadership & Community", icon: <Users className="h-4 w-4" /> },
    { id: "contact", label: "Contact Information", icon: <Mail className="h-4 w-4" /> },
    { id: "seo", label: "SEO Settings", icon: <Search className="h-4 w-4" /> },
    {
      id: "messages",
      label: "Messages (Inquiries)",
      icon: <MessageSquare className="h-4 w-4" />,
      badge: unreadMessagesCount,
    },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-surface border-r border-border-muted select-none">
      {/* Brand / Logo */}
      <div className="p-5 border-b border-border-muted flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-emerald/20 to-accent-emerald-deep/40 border border-accent-emerald/40 flex items-center justify-center text-accent-emerald font-mono font-bold text-sm shadow-md">
            MFW
          </div>
          <div>
            <h2 className="text-sm font-bold text-content-primary leading-tight">
              Faiz Waheed
            </h2>
            <p className="text-[11px] text-accent-emerald-light font-medium flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-emerald animate-pulse" />
              Portfolio CMS
            </p>
          </div>
        </div>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1 custom-scrollbar">
        <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-content-muted">
          Navigation Modules
        </p>
        {menuItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                onSelectSection(item.id);
                onCloseMobile();
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? "bg-accent-emerald/15 text-accent-emerald border border-accent-emerald/30 shadow-sm"
                  : "text-content-secondary hover:text-content-primary hover:bg-surface-hover"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className={isActive ? "text-accent-emerald" : "text-content-muted"}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </div>
              {Boolean(item.badge && item.badge > 0) && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-accent-gold text-background shadow">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Footer controls: Live preview & Logout */}
      <div className="p-3 border-t border-border-muted space-y-1.5">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-content-secondary hover:text-content-primary hover:bg-surface-hover border border-border-subtle transition-colors group"
        >
          <span>View Public Site</span>
          <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>

        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-950/40 border border-red-500/20 transition-colors"
        >
          <LogOut className="h-3.5 w-3.5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 h-screen sticky top-0 flex-shrink-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-y-0 left-0 w-72 z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isOpenMobile ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent}
      </div>
    </>
  );
}

