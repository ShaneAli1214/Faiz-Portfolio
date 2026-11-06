"use client";

import React, { useState, useEffect } from "react";
import {
  Image as ImageIcon,
  Upload,
  Trash2,
  Copy,
  Check,
  UserCheck,
  Sparkles,
  AlertTriangle,
  Sliders,
  Maximize2,
  Move,
  Layers,
  Scissors,
  RotateCcw,
  Eye,
  Home,
  User,
  ShieldCheck,
  Info,
  X,
  Save,
  ArrowRight,
} from "lucide-react";
import { MediaItem } from "@/types/media";
import {
  ProfileInfo,
  PlacementImageSettings,
  ImageFrameStyle,
  ImageFitMode,
  ImageAspectRatio,
} from "@/types/portfolio";
import { AdaptiveImageFrame } from "@/components/ui/AdaptiveImageFrame";

interface AdminMediaViewProps {
  mediaList: MediaItem[];
  profile: ProfileInfo;
  onSaveProfileImages: (updates: {
    photoUrl?: string;
    homeHeroImage?: PlacementImageSettings;
    aboutProfileImage?: PlacementImageSettings;
  }) => Promise<void>;
  onUploadMedia: (formData: FormData) => Promise<MediaItem | null>;
  onDeleteMedia: (id: string) => Promise<boolean>;
  onCopyUrl: (url: string) => void;
  onConfirmAction: (title: string, message: string, onConfirm: () => void) => void;
}

type PlacementChoice = "home" | "about";

const defaultHomeSettings: PlacementImageSettings = {
  url: "/uploads/WhatsApp_Image_2026-11-06_at_5_13_53_PM-1793976076109-wvmof.jpeg",
  originalUrl: "/uploads/WhatsApp_Image_2026-11-06_at_5_13_53_PM-1793976076109-wvmof.jpeg",
  scale: 1.0,
  positionX: 50,
  positionY: 20,
  fitMode: "cover",
  frameStyle: "auto",
  aspectRatio: "auto",
  maxWidth: "standard",
};

const defaultAboutSettings: PlacementImageSettings = {
  url: "/uploads/WhatsApp_Image_2026-11-06_at_5_13_53_PM-1793976076109-wvmof.jpeg",
  originalUrl: "/uploads/WhatsApp_Image_2026-11-06_at_5_13_53_PM-1793976076109-wvmof.jpeg",
  scale: 1.0,
  positionX: 50,
  positionY: 20,
  fitMode: "cover",
  frameStyle: "editorial",
  aspectRatio: "auto",
  maxWidth: "standard",
};

export function AdminMediaView({
  mediaList,
  profile,
  onSaveProfileImages,
  onUploadMedia,
  onDeleteMedia,
  onCopyUrl,
  onConfirmAction,
}: AdminMediaViewProps) {
  const [activeTab, setActiveTab] = useState<"home" | "about" | "library">("home");

  // Sync state with incoming props
  const [homeSettings, setHomeSettings] = useState<PlacementImageSettings>(
    profile.homeHeroImage || defaultHomeSettings
  );

  const [aboutSettings, setAboutSettings] = useState<PlacementImageSettings>(
    profile.aboutProfileImage || defaultAboutSettings
  );

  useEffect(() => {
    if (profile.homeHeroImage) {
      setHomeSettings(profile.homeHeroImage);
    }
    if (profile.aboutProfileImage) {
      setAboutSettings(profile.aboutProfileImage);
    }
  }, [profile.homeHeroImage, profile.aboutProfileImage]);

  // Placement Selection Modal States
  const [showPlacementModal, setShowPlacementModal] = useState(false);
  const [selectedPlacement, setSelectedPlacement] = useState<PlacementChoice>("home");
  const [pendingUploadFile, setPendingUploadFile] = useState<File | null>(null);
  const [uploadPreviewUrl, setUploadPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Background removal states
  const [isRemovingBg, setIsRemovingBg] = useState(false);
  const [bgRemovalNote, setBgRemovalNote] = useState<string | null>(null);

  // Feedback states
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Active settings being edited
  const currentSettings = activeTab === "home" ? homeSettings : aboutSettings;
  const setCurrentSettings = (newVal: PlacementImageSettings) => {
    if (activeTab === "home") {
      setHomeSettings(newVal);
    } else {
      setAboutSettings(newVal);
    }
  };

  // Handle file select in Placement modal
  const handlePlacementFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrorMessage("Please select a valid image file (PNG, JPG, WebP).");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage("File exceeds the 5MB size limit.");
      return;
    }

    setErrorMessage("");
    setPendingUploadFile(file);
    const objectUrl = URL.createObjectURL(file);
    setUploadPreviewUrl(objectUrl);
  };

  // Complete Upload & Apply to Selected Placement
  const handleConfirmUpload = async () => {
    if (!pendingUploadFile || !selectedPlacement) return;

    setIsUploading(true);
    setErrorMessage("");

    try {
      const formData = new FormData();
      formData.append("file", pendingUploadFile);
      formData.append("category", "profile");

      const uploaded = await onUploadMedia(formData);

      if (uploaded) {
        if (selectedPlacement === "home") {
          const updated: PlacementImageSettings = {
            ...homeSettings,
            url: uploaded.url,
            originalUrl: uploaded.url,
            processedUrl: undefined,
            hasBackgroundRemoved: false,
          };
          setHomeSettings(updated);
          await onSaveProfileImages({
            homeHeroImage: updated,
            photoUrl: uploaded.url,
          });
          setActiveTab("home");
        } else if (selectedPlacement === "about") {
          const updated: PlacementImageSettings = {
            ...aboutSettings,
            url: uploaded.url,
            originalUrl: uploaded.url,
            processedUrl: undefined,
            hasBackgroundRemoved: false,
          };
          setAboutSettings(updated);
          await onSaveProfileImages({
            aboutProfileImage: updated,
          });
          setActiveTab("about");
        }

        // Close modal and reset
        setShowPlacementModal(false);
        setPendingUploadFile(null);
        if (uploadPreviewUrl) {
          URL.revokeObjectURL(uploadPreviewUrl);
          setUploadPreviewUrl(null);
        }
      } else {
        setErrorMessage("Upload could not be processed. Please try again or check storage settings.");
      }
    } catch (err: any) {
      setErrorMessage(err?.message || "Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  // Save current active placement adjustments
  const handleSavePlacement = async () => {
    setIsSaving(true);
    try {
      if (activeTab === "home") {
        await onSaveProfileImages({
          homeHeroImage: homeSettings,
          photoUrl: homeSettings.url,
        });
      } else if (activeTab === "about") {
        await onSaveProfileImages({
          aboutProfileImage: aboutSettings,
        });
      }
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  // Trigger Remove Background API
  const handleRemoveBackground = async () => {
    const targetUrl = currentSettings.originalUrl || currentSettings.url;
    setIsRemovingBg(true);
    setBgRemovalNote(null);

    try {
      const res = await fetch("/api/admin/media/remove-bg", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl: targetUrl }),
      });

      const data = await res.json();

      if (data.available && data.success && data.processedUrl) {
        setCurrentSettings({
          ...currentSettings,
          url: data.processedUrl,
          processedUrl: data.processedUrl,
          hasBackgroundRemoved: true,
          frameStyle: "cutout",
        });
        setBgRemovalNote("Background removed successfully! Switched to Transparent Cutout mode.");
      } else {
        setBgRemovalNote(data.message || data.error || "Background removal service not configured.");
      }
    } catch {
      setBgRemovalNote("Network error while connecting to background removal service.");
    } finally {
      setIsRemovingBg(false);
    }
  };

  // Toggle between original and cutout
  const handleToggleCutout = () => {
    if (!currentSettings.processedUrl || !currentSettings.originalUrl) return;

    if (currentSettings.url === currentSettings.processedUrl) {
      setCurrentSettings({
        ...currentSettings,
        url: currentSettings.originalUrl,
        frameStyle: "auto",
      });
    } else {
      setCurrentSettings({
        ...currentSettings,
        url: currentSettings.processedUrl,
        frameStyle: "cutout",
      });
    }
  };

  const handleCopy = (id: string, url: string) => {
    onCopyUrl(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Top Header & Placement Gateway Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-surface border border-border-muted shadow-sm">
        <div>
          <h2 className="text-base font-bold text-content-primary flex items-center gap-2">
            <ImageIcon className="h-5 w-5 text-accent-emerald" />
            Smart Image Placement & Adaptive Presentation
          </h2>
          <p className="text-xs text-content-secondary mt-0.5">
            Configure destination placements for Home and About pages without forced cropping or distortion.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setSelectedPlacement(activeTab === "about" ? "about" : "home");
            setShowPlacementModal(true);
          }}
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-background bg-accent-emerald hover:bg-accent-emerald-dark transition-all shadow-lg shadow-accent-emerald/20"
        >
          <Upload className="h-4 w-4" />
          <span>Upload Image to Portfolio</span>
        </button>
      </div>

      {/* Destination Placement Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-background-secondary border border-border-subtle">
        <button
          type="button"
          onClick={() => setActiveTab("home")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === "home"
              ? "bg-surface text-accent-emerald border border-accent-emerald/30 shadow-md"
              : "text-content-secondary hover:text-content-primary"
          }`}
        >
          <Home className="h-4 w-4" />
          <span>Home Page — Hero Image</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("about")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === "about"
              ? "bg-surface text-accent-gold border border-accent-gold/30 shadow-md"
              : "text-content-secondary hover:text-content-primary"
          }`}
        >
          <User className="h-4 w-4" />
          <span>About Page — Profile Image</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("library")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === "library"
              ? "bg-surface text-content-primary border border-border-muted shadow-md"
              : "text-content-secondary hover:text-content-primary"
          }`}
        >
          <Layers className="h-4 w-4" />
          <span>Media Library ({mediaList.length})</span>
        </button>
      </div>

      {/* TAB 1 & 2: Interactive Smart Placement Editor (Home or About) */}
      {(activeTab === "home" || activeTab === "about") && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Live Interactive Adaptive Frame Preview */}
          <div className="lg:col-span-5 space-y-4">
            <div className="sticky top-24 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-content-muted flex items-center gap-2">
                  <Eye className="h-4 w-4 text-accent-emerald" />
                  Live Preview
                </h3>
                <span className="text-[11px] font-mono text-accent-emerald-light uppercase">
                  {activeTab === "home" ? "Home Hero Layout" : "About Profile Layout"}
                </span>
              </div>

              {/* Live Preview Container */}
              <div className="p-6 rounded-3xl bg-surface border border-border-muted shadow-2xl flex flex-col items-center justify-center">
                <AdaptiveImageFrame
                  fullName={profile.fullName}
                  settings={currentSettings}
                  placement={activeTab}
                  className="w-full"
                />

                <div className="w-full mt-4 pt-3 border-t border-border-subtle flex flex-wrap items-center justify-between gap-2 text-[11px] text-content-muted">
                  <span>Style: <strong className="text-content-primary capitalize">{currentSettings.frameStyle}</strong></span>
                  <span>Fit: <strong className="text-content-primary capitalize">{currentSettings.fitMode}</strong></span>
                  <span>Zoom: <strong className="text-content-primary">{Math.round(currentSettings.scale * 100)}%</strong></span>
                  <span>Focal Y: <strong className="text-content-primary">{currentSettings.positionY}%</strong></span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedPlacement(activeTab);
                    setShowPlacementModal(true);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-content-primary bg-surface hover:bg-surface-hover border border-border-muted transition-colors"
                >
                  <Upload className="h-3.5 w-3.5 text-accent-emerald" />
                  <span>Replace Photograph</span>
                </button>

                <button
                  type="button"
                  onClick={handleSavePlacement}
                  disabled={isSaving}
                  className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-background bg-accent-emerald hover:bg-accent-emerald-dark transition-all shadow-lg shadow-accent-emerald/20 disabled:opacity-50"
                >
                  {isSaving ? (
                    <span className="h-4 w-4 rounded-full border-2 border-background border-t-transparent animate-spin" />
                  ) : saveSuccess ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  <span>{saveSuccess ? "Saved to Site!" : isSaving ? "Saving..." : "Save Placement"}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Controls */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. Presentation Style Selector */}
            <div className="p-6 rounded-2xl bg-surface border border-border-muted space-y-4">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-content-primary flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-accent-emerald" />
                  Adaptive Frame Presentation Style
                </h3>
                <p className="text-[11px] text-content-secondary mt-0.5">
                  Select how the frame complements the photograph without rigid rectangular cropping.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    id: "auto" as ImageFrameStyle,
                    name: "Auto Adaptive (Default)",
                    desc: "Intelligently chooses lighting and edge treatment based on photo type.",
                  },
                  {
                    id: "minimal" as ImageFrameStyle,
                    name: "Minimal",
                    desc: "Clean image with subtle hairline border and soft elevation.",
                  },
                  {
                    id: "glow" as ImageFrameStyle,
                    name: "Premium Glow",
                    desc: "Subtle electric-blue & emerald ambient lighting behind the subject.",
                  },
                  {
                    id: "cutout" as ImageFrameStyle,
                    name: "Transparent Cutout",
                    desc: "Borderless floating presentation with soft pedestal shadow.",
                  },
                  {
                    id: "editorial" as ImageFrameStyle,
                    name: "Editorial",
                    desc: "Asymmetric architectural frame with corner brackets and offset lines.",
                  },
                ].map((style) => {
                  const isSelected = currentSettings.frameStyle === style.id;
                  return (
                    <div
                      key={style.id}
                      onClick={() => setCurrentSettings({ ...currentSettings, frameStyle: style.id })}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? "bg-accent-emerald/10 border-accent-emerald text-accent-emerald-light shadow-sm"
                          : "bg-background-secondary border-border-subtle hover:border-border-muted text-content-secondary hover:text-content-primary"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-bold text-content-primary">{style.name}</p>
                        {isSelected && <Check className="h-4 w-4 text-accent-emerald" />}
                      </div>
                      <p className="text-[11px] text-content-muted mt-1 leading-normal">{style.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2. Intelligent Focal Fitting & Positioning */}
            <div className="p-6 rounded-2xl bg-surface border border-border-muted space-y-5">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-content-primary flex items-center gap-2">
                  <Sliders className="h-4 w-4 text-accent-emerald" />
                  Intelligent Focal & Scale Fitting
                </h3>
                <p className="text-[11px] text-content-secondary mt-0.5">
                  Ensure the face, head, and shoulders remain completely visible across all screen sizes.
                </p>
              </div>

              {/* Fit Mode, Aspect Ratio, Display Width */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-semibold uppercase text-content-secondary mb-1">
                    Image Fit Behavior
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      type="button"
                      onClick={() => setCurrentSettings({ ...currentSettings, fitMode: "cover" })}
                      className={`px-2.5 py-1.5 rounded-xl text-[11px] font-semibold border transition-all ${
                        currentSettings.fitMode === "cover"
                          ? "bg-surface text-accent-emerald border-accent-emerald shadow-sm"
                          : "bg-background-secondary border-border-muted text-content-muted hover:text-content-primary"
                      }`}
                    >
                      Fill Frame
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentSettings({ ...currentSettings, fitMode: "contain" })}
                      className={`px-2.5 py-1.5 rounded-xl text-[11px] font-semibold border transition-all ${
                        currentSettings.fitMode === "contain"
                          ? "bg-surface text-accent-emerald border-accent-emerald shadow-sm"
                          : "bg-background-secondary border-border-muted text-content-muted hover:text-content-primary"
                      }`}
                    >
                      Fit Inside
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-semibold uppercase text-content-secondary mb-1">
                    Frame Aspect Ratio
                  </label>
                  <select
                    value={currentSettings.aspectRatio}
                    onChange={(e) =>
                      setCurrentSettings({
                        ...currentSettings,
                        aspectRatio: e.target.value as ImageAspectRatio,
                      })
                    }
                    className="w-full px-2.5 py-2 rounded-xl bg-background-secondary border border-border-muted text-xs text-content-primary focus:border-accent-emerald outline-none"
                  >
                    <option value="auto">Auto (3:4 Natural Portrait)</option>
                    <option value="portrait">Tall Portrait (3:4)</option>
                    <option value="tall">Editorial Tall (4:5)</option>
                    <option value="square">Square (1:1)</option>
                    <option value="landscape">Landscape (4:3)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-semibold uppercase text-content-secondary mb-1">
                    Display Width
                  </label>
                  <select
                    value={currentSettings.maxWidth || "standard"}
                    onChange={(e) =>
                      setCurrentSettings({
                        ...currentSettings,
                        maxWidth: e.target.value as any,
                      })
                    }
                    className="w-full px-2.5 py-2 rounded-xl bg-background-secondary border border-border-muted text-xs text-content-primary focus:border-accent-emerald outline-none"
                  >
                    <option value="compact">Compact (320px)</option>
                    <option value="standard">Standard (384px)</option>
                    <option value="wide">Wide (448px)</option>
                  </select>
                </div>
              </div>

              {/* Sliders: Scale, Focal X, Focal Y */}
              <div className="space-y-4 pt-2 border-t border-border-subtle">
                {/* Scale */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-content-primary flex items-center gap-1.5">
                      <Maximize2 className="h-3.5 w-3.5 text-accent-emerald" />
                      Image Zoom / Scale
                    </span>
                    <span className="font-mono text-accent-emerald-light">
                      {Math.round(currentSettings.scale * 100)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0.7"
                    max="1.6"
                    step="0.05"
                    value={currentSettings.scale}
                    onChange={(e) =>
                      setCurrentSettings({ ...currentSettings, scale: parseFloat(e.target.value) })
                    }
                    className="w-full accent-accent-emerald cursor-pointer"
                  />
                </div>

                {/* Vertical Focal Position */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-content-primary flex items-center gap-1.5">
                      <Move className="h-3.5 w-3.5 text-accent-gold" />
                      Vertical Focal Position (Y-Axis)
                    </span>
                    <span className="font-mono text-accent-gold-light">
                      {currentSettings.positionY}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="2"
                    value={currentSettings.positionY}
                    onChange={(e) =>
                      setCurrentSettings({ ...currentSettings, positionY: parseInt(e.target.value) })
                    }
                    className="w-full accent-accent-gold cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-content-muted">
                    <span>Top / Hair (0%)</span>
                    <span>Face / Eyes (20%)</span>
                    <span>Center (50%)</span>
                    <span>Bottom (100%)</span>
                  </div>
                </div>

                {/* Horizontal Focal Position */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-content-primary flex items-center gap-1.5">
                      <Move className="h-3.5 w-3.5 text-accent-emerald" />
                      Horizontal Focal Position (X-Axis)
                    </span>
                    <span className="font-mono text-accent-emerald-light">
                      {currentSettings.positionX}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="2"
                    value={currentSettings.positionX}
                    onChange={(e) =>
                      setCurrentSettings({ ...currentSettings, positionX: parseInt(e.target.value) })
                    }
                    className="w-full accent-accent-emerald cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-content-muted">
                    <span>Left (0%)</span>
                    <span>Center (50%)</span>
                    <span>Right (100%)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Optional Background Removal Section */}
            <div className="p-6 rounded-2xl bg-surface border border-border-muted space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-content-primary flex items-center gap-2">
                    <Scissors className="h-4 w-4 text-accent-gold" />
                    Automated Background Removal (Optional)
                  </h3>
                  <p className="text-[11px] text-content-secondary mt-0.5">
                    Produces a clean transparent PNG cutout while preserving the original photograph.
                  </p>
                </div>

                {currentSettings.processedUrl && (
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-accent-gold/20 text-accent-gold-light border border-accent-gold/30">
                    Cutout Available
                  </span>
                )}
              </div>

              {bgRemovalNote && (
                <div className="p-3 rounded-xl bg-background-secondary border border-border-subtle text-xs text-content-secondary flex items-start gap-2">
                  <Info className="h-4 w-4 text-accent-emerald flex-shrink-0 mt-0.5" />
                  <span>{bgRemovalNote}</span>
                </div>
              )}

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleRemoveBackground}
                  disabled={isRemovingBg}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-content-primary bg-background-secondary hover:bg-background-tertiary border border-border-muted transition-colors disabled:opacity-50"
                >
                  {isRemovingBg ? (
                    <span className="h-3.5 w-3.5 rounded-full border-2 border-accent-emerald border-t-transparent animate-spin" />
                  ) : (
                    <Scissors className="h-3.5 w-3.5 text-accent-gold" />
                  )}
                  <span>{isRemovingBg ? "Processing with AI..." : "Remove Background"}</span>
                </button>

                {currentSettings.processedUrl && (
                  <button
                    type="button"
                    onClick={handleToggleCutout}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-accent-emerald bg-accent-emerald/10 hover:bg-accent-emerald/20 border border-accent-emerald/30 transition-colors"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>
                      {currentSettings.url === currentSettings.processedUrl
                        ? "Switch to Original Photo"
                        : "Switch to Transparent Cutout"}
                    </span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Media Library Grid */}
      {activeTab === "library" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-content-muted flex items-center gap-2">
              <ImageIcon className="h-4 w-4 text-accent-emerald" />
              All Digital Assets ({mediaList.length} files)
            </h3>
          </div>

          {mediaList.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-surface border border-border-muted text-content-muted space-y-2">
              <ImageIcon className="h-8 w-8 mx-auto text-content-muted/50" />
              <p className="text-sm">No media files uploaded yet.</p>
              <p className="text-xs">Click &quot;Upload Image to Portfolio&quot; to add profile headshots or project thumbnails.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {mediaList.map((item) => {
                const isHome = profile.homeHeroImage?.url === item.url;
                const isAbout = profile.aboutProfileImage?.url === item.url;

                return (
                  <div
                    key={item.id}
                    className="group rounded-2xl bg-surface border border-border-muted hover:border-accent-emerald/40 overflow-hidden shadow-sm transition-all flex flex-col justify-between"
                  >
                    <div className="relative aspect-video bg-background-secondary overflow-hidden flex items-center justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.url}
                        alt={item.name}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                        {isHome && (
                          <span className="px-2 py-0.5 rounded-md text-[9px] font-bold bg-accent-emerald text-background shadow">
                            Home Hero
                          </span>
                        )}
                        {isAbout && (
                          <span className="px-2 py-0.5 rounded-md text-[9px] font-bold bg-accent-gold text-background shadow">
                            About Profile
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between">
                      <div>
                        <p className="text-xs font-semibold text-content-primary truncate" title={item.name}>
                          {item.name}
                        </p>
                        <p className="text-[11px] text-content-muted mt-0.5">
                          {new Date(item.uploadedAt).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-border-subtle flex items-center justify-between gap-1">
                        <button
                          type="button"
                          onClick={() => handleCopy(item.id, item.url)}
                          className="p-1.5 rounded-lg text-content-secondary hover:text-content-primary hover:bg-surface-hover text-xs flex items-center gap-1 transition-colors"
                          title="Copy image URL"
                        >
                          {copiedId === item.id ? (
                            <Check className="h-3.5 w-3.5 text-accent-emerald" />
                          ) : (
                            <Copy className="h-3.5 w-3.5" />
                          )}
                          <span className="text-[10px]">Copy URL</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            onConfirmAction(
                              "Delete Image",
                              `Are you sure you want to permanently delete "${item.name}"?`,
                              async () => {
                                await onDeleteMedia(item.id);
                              }
                            );
                          }}
                          className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-950/40 text-xs transition-colors"
                          title="Delete image"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* PLACEMENT SELECTION DIALOG (Strictly Implemented) */}
      {showPlacementModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-fade-in-up overflow-y-auto">
          <div className="w-full max-w-xl rounded-2xl bg-surface border border-border-muted shadow-2xl p-6 space-y-5">
            <div className="flex items-start justify-between border-b border-border-muted pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-accent-emerald font-semibold">
                  Destination Selection
                </span>
                <h3 className="text-lg font-bold text-content-primary mt-0.5">
                  Where would you like to display this image?
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowPlacementModal(false);
                  setPendingUploadFile(null);
                  if (uploadPreviewUrl) URL.revokeObjectURL(uploadPreviewUrl);
                  setUploadPreviewUrl(null);
                }}
                className="p-1.5 rounded-lg text-content-muted hover:text-content-primary hover:bg-surface-hover"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Option Cards */}
            <div className="space-y-3">
              <label className="block text-xs font-semibold uppercase tracking-wider text-content-secondary">
                Select Destination Placement *
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Option 1: Home Page Hero */}
                <div
                  onClick={() => setSelectedPlacement("home")}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                    selectedPlacement === "home"
                      ? "bg-accent-emerald/15 border-accent-emerald text-accent-emerald-light shadow-md"
                      : "bg-background-secondary border-border-subtle hover:border-border-muted text-content-secondary"
                  }`}
                >
                  <div className="p-2.5 rounded-lg bg-surface text-accent-emerald shadow-sm">
                    <Home className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-content-primary">Home Page — Hero Image</p>
                    <p className="text-[11px] text-content-muted leading-tight">
                      Hero section headshot with asymmetric precision ring and ambient glow.
                    </p>
                  </div>
                </div>

                {/* Option 2: About Page Profile */}
                <div
                  onClick={() => setSelectedPlacement("about")}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                    selectedPlacement === "about"
                      ? "bg-accent-gold/15 border-accent-gold text-accent-gold-light shadow-md"
                      : "bg-background-secondary border-border-subtle hover:border-border-muted text-content-secondary"
                  }`}
                >
                  <div className="p-2.5 rounded-lg bg-surface text-accent-gold shadow-sm">
                    <User className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-content-primary">About Page — Profile Image</p>
                    <p className="text-[11px] text-content-muted leading-tight">
                      Editorial biography portrait with offset decorative lines and corner brackets.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Notice if replacing existing image */}
            <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/30 text-xs text-amber-200 flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <span>
                An image is already active for{" "}
                <strong>{selectedPlacement === "home" ? "Home Page Hero" : "About Page Profile"}</strong>.
                Uploading a new image will update that placement while preserving previous files in your library.
              </span>
            </div>

            {/* Native Label File Selector (No double-click event bubbling bug!) */}
            <div className="space-y-3">
              <label className="block text-xs font-semibold uppercase tracking-wider text-content-secondary">
                Select Image File from Computer
              </label>

              {errorMessage && (
                <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-xs text-red-200">
                  {errorMessage}
                </div>
              )}

              {!pendingUploadFile ? (
                <label className="border-2 border-dashed border-border-muted hover:border-accent-emerald/50 rounded-2xl p-6 text-center bg-background-secondary/50 hover:bg-background-secondary cursor-pointer transition-all flex flex-col items-center justify-center group">
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={handlePlacementFileSelect}
                    className="sr-only"
                  />
                  <Upload className="h-8 w-8 text-content-muted group-hover:text-accent-emerald transition-colors mb-2" />
                  <p className="text-xs font-semibold text-content-primary">
                    Click to browse or drop photograph here
                  </p>
                  <p className="text-[10px] text-content-muted mt-0.5">
                    Portrait, landscape, square, or transparent PNG (up to 5MB)
                  </p>
                </label>
              ) : (
                <div className="p-4 rounded-xl bg-background-secondary border border-border-subtle flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {uploadPreviewUrl && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={uploadPreviewUrl}
                        alt="Upload preview"
                        className="w-14 h-14 object-cover rounded-lg border border-border-muted"
                      />
                    )}
                    <div>
                      <p className="text-xs font-bold text-content-primary truncate max-w-xs">
                        {pendingUploadFile.name}
                      </p>
                      <p className="text-[10px] text-content-muted">
                        {(pendingUploadFile.size / 1024 / 1024).toFixed(2)} MB • Ready to upload
                      </p>
                    </div>
                  </div>

                  <label className="text-xs text-accent-emerald hover:underline font-semibold cursor-pointer">
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      onChange={handlePlacementFileSelect}
                      className="sr-only"
                    />
                    Change File
                  </label>
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-border-muted">
              <button
                type="button"
                onClick={() => {
                  setShowPlacementModal(false);
                  setPendingUploadFile(null);
                  if (uploadPreviewUrl) URL.revokeObjectURL(uploadPreviewUrl);
                  setUploadPreviewUrl(null);
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-content-secondary hover:text-content-primary hover:bg-surface-hover border border-border-muted transition-colors"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={!pendingUploadFile || isUploading}
                onClick={handleConfirmUpload}
                className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-semibold text-background bg-accent-emerald hover:bg-accent-emerald-dark transition-all shadow-md shadow-accent-emerald/20 disabled:opacity-50"
              >
                {isUploading ? (
                  <>
                    <span className="h-3.5 w-3.5 rounded-full border-2 border-background border-t-transparent animate-spin" />
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    <span>Save to {selectedPlacement === "home" ? "Home Hero" : "About Profile"}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
