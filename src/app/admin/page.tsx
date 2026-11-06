"use client";

import React, { useState, useEffect, useCallback } from "react";
import { PortfolioData, ContactInquiry } from "@/types/portfolio";
import { ThemeConfig, defaultTheme } from "@/types/theme";
import { MediaItem } from "@/types/media";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { AdminSidebar, AdminSection } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminDashboardView } from "@/components/admin/AdminDashboardView";
import { AdminGeneralView } from "@/components/admin/AdminGeneralView";
import { AdminThemeView } from "@/components/admin/AdminThemeView";
import { AdminProfileView } from "@/components/admin/AdminProfileView";
import { AdminMediaView } from "@/components/admin/AdminMediaView";
import { AdminProjectsView } from "@/components/admin/AdminProjectsView";
import { AdminExperienceView } from "@/components/admin/AdminExperienceView";
import { AdminEducationView } from "@/components/admin/AdminEducationView";
import { AdminSkillsView } from "@/components/admin/AdminSkillsView";
import { AdminAchievementsView } from "@/components/admin/AdminAchievementsView";
import { AdminLeadershipView } from "@/components/admin/AdminLeadershipView";
import { AdminContactView } from "@/components/admin/AdminContactView";
import { AdminSeoView, SeoConfig } from "@/components/admin/AdminSeoView";
import { AdminMessagesView } from "@/components/admin/AdminMessagesView";
import { AdminConfirmModal } from "@/components/admin/AdminConfirmModal";
import { AdminToast, ToastMessage } from "@/components/admin/AdminToast";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [activeSection, setActiveSection] = useState<AdminSection>("dashboard");
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Core Data States
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [themeConfig, setThemeConfig] = useState<ThemeConfig>(defaultTheme);
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);

  // Feedback states
  const [isSaving, setIsSaving] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Confirmation Modal state
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    confirmText?: string;
    variant?: "danger" | "warning";
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: () => {},
  });

  const addToast = useCallback(
    (text: string, type: "success" | "error" | "info" | "warning" = "success") => {
      const newToast: ToastMessage = {
        id: `toast-${Date.now()}-${Math.random()}`,
        type,
        text,
      };
      setToasts((prev) => [...prev, newToast]);
    },
    []
  );

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Fetch all CMS dataset
  const fetchAllData = useCallback(async () => {
    try {
      const [portRes, themeRes, mediaRes, inqRes] = await Promise.all([
        fetch("/api/admin/portfolio"),
        fetch("/api/admin/theme"),
        fetch("/api/admin/media"),
        fetch("/api/admin/inquiries"),
      ]);

      if (portRes.ok) {
        const portData = await portRes.json();
        setPortfolioData(portData);
      }

      if (themeRes.ok) {
        const themeData = await themeRes.json();
        setThemeConfig(themeData);
      }

      if (mediaRes.ok) {
        const mData = await mediaRes.json();
        setMediaList(mData);
      }

      if (inqRes.ok) {
        const iData = await inqRes.json();
        setInquiries(iData);
      }
    } catch (err) {
      console.error("Error loading CMS data:", err);
      addToast("Failed to load some portfolio modules.", "error");
    }
  }, [addToast]);

  // Check auth session on load
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("/api/admin/auth/session");
        const data = await res.json();
        if (res.ok && data.authenticated) {
          setIsAuthenticated(true);
          await fetchAllData();
        } else {
          setIsAuthenticated(false);
        }
      } catch {
        setIsAuthenticated(false);
      }
    };
    checkSession();
  }, [fetchAllData]);

  // Logout handler
  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
      setIsAuthenticated(false);
      addToast("Administrator session terminated.", "info");
    } catch {
      setIsAuthenticated(false);
    }
  };

  // Helper to persist updated portfolio data
  const persistPortfolio = async (updatedData: PortfolioData, successMessage = "Changes saved to disk.") => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/portfolio", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        setPortfolioData(updatedData);
        setLastSavedAt(new Date().toLocaleTimeString());
        addToast(successMessage, "success");
      } else {
        addToast(result.error || "Failed to persist changes.", "error");
      }
    } catch {
      addToast("Network error while writing to disk.", "error");
    } finally {
      setIsSaving(false);
    }
  };

  // Theme Save Handler
  const handleSaveTheme = async (updatedTheme: ThemeConfig) => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/theme", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTheme),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        setThemeConfig(updatedTheme);
        setLastSavedAt(new Date().toLocaleTimeString());
        addToast("Theme palette successfully updated on public site.", "success");

        // Immediately update dynamic CSS style tag if on client
        if (typeof document !== "undefined") {
          const styleEl = document.getElementById("dynamic-theme-vars");
          if (styleEl) {
            const d = updatedTheme.dark || defaultTheme.dark;
            const l = updatedTheme.light || defaultTheme.light;
            const s = updatedTheme.semantics || defaultTheme.semantics;
            styleEl.innerHTML = `
              :root {
                --background-primary: ${l.mainBackground};
                --background-secondary: ${l.secondaryBackground};
                --background-tertiary: ${l.elevatedSurface};
                --card-background: ${l.cardBackground};
                --elevated-surface: ${l.elevatedSurface};
                --primary-color: ${l.primaryColor};
                --primary-hover: ${l.primaryHover};
                --secondary-accent: ${l.secondaryAccent};
                --accent-emerald: ${l.primaryColor};
                --accent-emerald-light: ${l.secondaryAccent};
                --accent-emerald-dark: ${l.primaryHover};
                --accent-gold: ${l.secondaryAccent};
                --accent-gold-light: ${l.secondaryAccent};
                --accent-gold-dark: ${l.primaryHover};
                --text-primary: ${l.mainText};
                --text-secondary: ${l.secondaryText};
                --text-muted: ${l.mutedText};
                --border-subtle: ${l.border};
                --border-muted: ${l.border};
                --input-background: ${l.inputBackground};
                --sidebar-background: ${l.sidebarBackground};
                --header-background: ${l.headerBackground};
                --focus-ring: ${l.focusRing};
                --color-success: ${s.success};
                --color-warning: ${s.warning};
                --color-error: ${s.error};
                --color-info: ${s.info};
              }
              html.dark, :root.dark {
                --background-primary: ${d.mainBackground};
                --background-secondary: ${d.secondaryBackground};
                --background-tertiary: ${d.elevatedSurface};
                --card-background: ${d.cardBackground};
                --elevated-surface: ${d.elevatedSurface};
                --primary-color: ${d.primaryColor};
                --primary-hover: ${d.primaryHover};
                --secondary-accent: ${d.secondaryAccent};
                --accent-emerald: ${d.primaryColor};
                --accent-emerald-light: ${d.primaryHover};
                --accent-emerald-dark: ${d.primaryColor};
                --accent-gold: ${d.secondaryAccent};
                --accent-gold-light: ${d.secondaryAccent};
                --accent-gold-dark: ${d.primaryColor};
                --text-primary: ${d.mainText};
                --text-secondary: ${d.secondaryText};
                --text-muted: ${d.mutedText};
                --border-subtle: ${d.border};
                --border-muted: ${d.border};
                --input-background: ${d.inputBackground};
                --sidebar-background: ${d.sidebarBackground};
                --header-background: ${d.headerBackground};
                --focus-ring: ${d.focusRing};
                --color-success: ${s.success};
                --color-warning: ${s.warning};
                --color-error: ${s.error};
                --color-info: ${s.info};
              }
            `;
          }
        }
      } else {
        addToast("Failed to save theme settings.", "error");
      }
    } catch {
      addToast("Network error while saving theme.", "error");
    } finally {
      setIsSaving(false);
    }
  };

  // Theme Reset Handler
  const handleResetTheme = async () => {
    try {
      const res = await fetch("/api/admin/theme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reset" }),
      });
      const result = await res.json();
      if (res.ok && result.success) {
        setThemeConfig(result.theme);
        addToast("Theme reset to verified Charcoal & Electric Blue defaults.", "success");
      }
    } catch {
      addToast("Error resetting theme.", "error");
    }
  };

  // Media Handlers
  const handleUploadMedia = async (formData: FormData): Promise<MediaItem | null> => {
    try {
      const res = await fetch("/api/admin/media", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      if (res.ok && result.success) {
        setMediaList((prev) => [result.media, ...prev]);
        addToast("Image uploaded to library successfully.", "success");
        return result.media;
      } else {
        addToast(result.error || "Upload failed.", "error");
        return null;
      }
    } catch {
      addToast("Network error uploading image.", "error");
      return null;
    }
  };

  const handleDeleteMedia = async (id: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/admin/media?id=${id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      if (res.ok && result.success) {
        setMediaList((prev) => prev.filter((m) => m.id !== id));
        addToast("Image deleted from storage.", "info");
        return true;
      }
      addToast("Failed to delete image.", "error");
      return false;
    } catch {
      addToast("Network error deleting image.", "error");
      return false;
    }
  };

  const handleSetAsProfilePhoto = async (url: string) => {
    if (!portfolioData) return;
    const updated = {
      ...portfolioData,
      profile: {
        ...portfolioData.profile,
        photoUrl: url,
      },
    };
    await persistPortfolio(updated, "Profile photo updated across all portfolio pages.");
  };

  // General Settings Handlers
  const handleSaveGeneral = async (updates: {
    fullName: string;
    professionalTitle: string;
    tagline: string;
  }) => {
    if (!portfolioData) return;
    const updated: PortfolioData = {
      ...portfolioData,
      profile: {
        ...portfolioData.profile,
        fullName: updates.fullName,
        professionalTitle: updates.professionalTitle,
        tagline: updates.tagline,
      },
    };
    await persistPortfolio(updated, "General settings updated.");
  };

  const handleExportJson = () => {
    if (!portfolioData) return;
    const jsonString = JSON.stringify(portfolioData, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `faiz-waheed-portfolio-backup-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    addToast("Backup JSON file exported.", "success");
  };

  const handleImportJson = async (imported: PortfolioData): Promise<boolean> => {
    try {
      const res = await fetch("/api/admin/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "import", data: imported }),
      });
      const result = await res.json();
      if (res.ok && result.success) {
        setPortfolioData(result.data);
        addToast("Backup imported and applied successfully.", "success");
        return true;
      }
      addToast(result.error || "Failed to import backup.", "error");
      return false;
    } catch {
      addToast("Network error importing backup.", "error");
      return false;
    }
  };

  const handleFactoryReset = async () => {
    try {
      const res = await fetch("/api/admin/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reset" }),
      });
      const result = await res.json();
      if (res.ok && result.success) {
        setPortfolioData(result.data);
        addToast("Entire portfolio reset to verified factory defaults.", "info");
      } else {
        addToast("Failed to reset portfolio.", "error");
      }
    } catch {
      addToast("Network error resetting portfolio.", "error");
    }
  };

  // Inquiry Messages Handlers
  const handleToggleInquiryStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "unread" ? "read" : "unread";
    try {
      const res = await fetch("/api/admin/inquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setInquiries((prev) =>
          prev.map((i) => (i.id === id ? { ...i, status: newStatus as any } : i))
        );
      }
    } catch (err) {
      console.error("Error patching inquiry:", err);
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/inquiries?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setInquiries((prev) => prev.filter((i) => i.id !== id));
        addToast("Inquiry deleted.", "info");
      }
    } catch {
      addToast("Error deleting inquiry.", "error");
    }
  };

  // If loading session check
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-3">
          <div className="h-8 w-8 mx-auto rounded-full border-2 border-accent-emerald border-t-transparent animate-spin" />
          <p className="text-xs font-mono text-content-muted">Checking administrator session...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, render login form
  if (!isAuthenticated) {
    return (
      <>
        <AdminLogin
          onLoginSuccess={async () => {
            setIsAuthenticated(true);
            await fetchAllData();
            addToast("Welcome back, Muhammad Faiz Waheed.", "success");
          }}
        />
        <AdminToast toasts={toasts} onDismiss={dismissToast} />
      </>
    );
  }

  // If data not loaded yet
  if (!portfolioData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-3">
          <div className="h-8 w-8 mx-auto rounded-full border-2 border-accent-emerald border-t-transparent animate-spin" />
          <p className="text-xs font-mono text-content-muted">Synchronizing CMS modules from disk...</p>
        </div>
      </div>
    );
  }

  const unreadCount = inquiries.filter((i) => i.status === "unread").length;

  return (
    <div className="min-h-screen flex bg-background text-content-primary">
      {/* 1. Visible Sidebar Navigation (All 15 Items) */}
      <AdminSidebar
        activeSection={activeSection}
        onSelectSection={(sec) => setActiveSection(sec)}
        onLogout={handleLogout}
        unreadMessagesCount={unreadCount}
        isOpenMobile={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
      />

      {/* Main CMS Layout */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <AdminHeader
          activeSection={activeSection}
          onOpenMobile={() => setIsMobileOpen(true)}
          isSaving={isSaving}
          lastSavedAt={lastSavedAt}
        />

        {/* Content View Switcher */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          {activeSection === "dashboard" && (
            <AdminDashboardView
              portfolioData={portfolioData}
              themeConfig={themeConfig}
              unreadCount={unreadCount}
              totalInquiries={inquiries.length}
              mediaCount={mediaList.length}
              onNavigate={(sec) => setActiveSection(sec)}
            />
          )}

          {activeSection === "general" && (
            <AdminGeneralView
              portfolioData={portfolioData}
              onSaveGeneral={handleSaveGeneral}
              onExportJson={handleExportJson}
              onImportJson={handleImportJson}
              onFactoryReset={handleFactoryReset}
              onConfirmReset={(message, onConfirm) => {
                setConfirmModal({
                  isOpen: true,
                  title: "Factory Reset Confirmation",
                  message,
                  variant: "danger",
                  confirmText: "Perform Factory Reset",
                  onConfirm: () => {
                    setConfirmModal((prev) => ({ ...prev, isOpen: false }));
                    onConfirm();
                  },
                });
              }}
            />
          )}

          {activeSection === "theme" && (
            <AdminThemeView
              themeConfig={themeConfig}
              onSaveTheme={handleSaveTheme}
              onResetTheme={handleResetTheme}
            />
          )}

          {activeSection === "profile" && (
            <AdminProfileView
              profile={portfolioData.profile}
              highlights={portfolioData.highlights}
              careerJourney={portfolioData.careerJourney}
              professionalValues={portfolioData.professionalValues}
              professionalInterests={portfolioData.professionalInterests}
              onSaveProfile={async (updates) => {
                const updated: PortfolioData = {
                  ...portfolioData,
                  profile: updates.profile,
                  highlights: updates.highlights,
                  careerJourney: updates.careerJourney,
                  professionalValues: updates.professionalValues,
                  professionalInterests: updates.professionalInterests,
                };
                await persistPortfolio(updated, "Profile & About details saved to disk.");
              }}
            />
          )}

          {activeSection === "media" && (
            <AdminMediaView
              mediaList={mediaList}
              profile={portfolioData.profile}
              onSaveProfileImages={async (updates) => {
                const updated: PortfolioData = {
                  ...portfolioData,
                  profile: {
                    ...portfolioData.profile,
                    ...(updates.photoUrl ? { photoUrl: updates.photoUrl } : {}),
                    ...(updates.homeHeroImage ? { homeHeroImage: updates.homeHeroImage } : {}),
                    ...(updates.aboutProfileImage ? { aboutProfileImage: updates.aboutProfileImage } : {}),
                  },
                };
                await persistPortfolio(updated, "Adaptive placement settings saved.");
              }}
              onUploadMedia={handleUploadMedia}
              onDeleteMedia={handleDeleteMedia}
              onCopyUrl={(url) => {
                if (navigator?.clipboard) {
                  navigator.clipboard.writeText(url);
                }
                addToast(`Copied "${url}" to clipboard.`, "info");
              }}
              onConfirmAction={(title, message, onConfirm) => {
                setConfirmModal({
                  isOpen: true,
                  title,
                  message,
                  variant: "danger",
                  confirmText: "Confirm",
                  onConfirm: () => {
                    setConfirmModal((prev) => ({ ...prev, isOpen: false }));
                    onConfirm();
                  },
                });
              }}
            />
          )}

          {activeSection === "projects" && (
            <AdminProjectsView
              projects={portfolioData.projects}
              onSaveProjects={async (updatedProjects) => {
                const updated: PortfolioData = {
                  ...portfolioData,
                  projects: updatedProjects,
                };
                await persistPortfolio(updated, "Projects updated on public site.");
              }}
              onConfirmDelete={(title, onConfirm) => {
                setConfirmModal({
                  isOpen: true,
                  title: "Delete Project",
                  message: `Are you sure you want to delete ${title}? This action will permanently remove it from the projects showcase.`,
                  variant: "danger",
                  confirmText: "Delete Project",
                  onConfirm: () => {
                    setConfirmModal((prev) => ({ ...prev, isOpen: false }));
                    onConfirm();
                  },
                });
              }}
            />
          )}

          {activeSection === "experience" && (
            <AdminExperienceView
              experienceList={portfolioData.experience}
              onSaveExperience={async (updatedExp) => {
                const updated: PortfolioData = {
                  ...portfolioData,
                  experience: updatedExp,
                };
                await persistPortfolio(updated, "Experience timeline updated.");
              }}
              onConfirmDelete={(title, onConfirm) => {
                setConfirmModal({
                  isOpen: true,
                  title: "Delete Position",
                  message: `Are you sure you want to delete ${title}?`,
                  variant: "danger",
                  confirmText: "Delete Position",
                  onConfirm: () => {
                    setConfirmModal((prev) => ({ ...prev, isOpen: false }));
                    onConfirm();
                  },
                });
              }}
            />
          )}

          {activeSection === "education" && (
            <AdminEducationView
              educationList={portfolioData.education}
              achievements={portfolioData.academicAchievements || []}
              onSaveEducation={async (payload) => {
                const updated: PortfolioData = {
                  ...portfolioData,
                  education: payload.education,
                  academicAchievements: payload.academicAchievements,
                };
                await persistPortfolio(updated, "Education credentials and honors updated.");
              }}
            />
          )}

          {activeSection === "skills" && (
            <AdminSkillsView
              categories={portfolioData.skillCategories}
              onSaveSkills={async (updatedCats) => {
                const updated: PortfolioData = {
                  ...portfolioData,
                  skillCategories: updatedCats,
                };
                await persistPortfolio(updated, "Skills matrix updated.");
              }}
              onConfirmDelete={(title, onConfirm) => {
                setConfirmModal({
                  isOpen: true,
                  title: "Delete Category",
                  message: title,
                  variant: "danger",
                  confirmText: "Delete Category",
                  onConfirm: () => {
                    setConfirmModal((prev) => ({ ...prev, isOpen: false }));
                    onConfirm();
                  },
                });
              }}
            />
          )}

          {activeSection === "achievements" && (
            <AdminAchievementsView
              awards={portfolioData.awards}
              certifications={portfolioData.certifications}
              onSaveAchievements={async (payload) => {
                const updated: PortfolioData = {
                  ...portfolioData,
                  awards: payload.awards,
                  certifications: payload.certifications,
                };
                await persistPortfolio(updated, "Achievements and learning programs updated.");
              }}
            />
          )}

          {activeSection === "leadership" && (
            <AdminLeadershipView
              leadership={portfolioData.leadership}
              communityService={portfolioData.communityService || []}
              onSaveLeadership={async (payload) => {
                const updated: PortfolioData = {
                  ...portfolioData,
                  leadership: payload.leadership,
                  communityService: payload.communityService,
                };
                await persistPortfolio(updated, "Leadership and community initiatives updated.");
              }}
            />
          )}

          {activeSection === "contact" && (
            <AdminContactView
              contactInfo={portfolioData.profile.contact}
              onSaveContact={async (updatedContact) => {
                const updated: PortfolioData = {
                  ...portfolioData,
                  profile: {
                    ...portfolioData.profile,
                    contact: updatedContact,
                  },
                };
                await persistPortfolio(updated, "Contact details updated.");
              }}
            />
          )}

          {activeSection === "seo" && (
            <AdminSeoView
              onSaveSeo={async () => {
                addToast("SEO and metadata configurations saved.", "success");
              }}
            />
          )}

          {activeSection === "messages" && (
            <AdminMessagesView
              inquiries={inquiries}
              onToggleStatus={handleToggleInquiryStatus}
              onDeleteInquiry={handleDeleteInquiry}
              onConfirmDelete={(title, onConfirm) => {
                setConfirmModal({
                  isOpen: true,
                  title: "Delete Inquiry",
                  message: title,
                  variant: "danger",
                  confirmText: "Delete Message",
                  onConfirm: () => {
                    setConfirmModal((prev) => ({ ...prev, isOpen: false }));
                    onConfirm();
                  },
                });
              }}
            />
          )}
        </main>
      </div>

      {/* Confirmation Modal */}
      <AdminConfirmModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.title}
        message={confirmModal.message}
        variant={confirmModal.variant}
        confirmText={confirmModal.confirmText}
        onConfirm={confirmModal.onConfirm}
        onCancel={() => setConfirmModal((prev) => ({ ...prev, isOpen: false }))}
      />

      {/* Toast Notification Container */}
      <AdminToast toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
