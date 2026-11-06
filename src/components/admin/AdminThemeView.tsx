"use client";

import React, { useState } from "react";
import {
  Palette,
  RotateCcw,
  Check,
  Sparkles,
  Eye,
  ShieldCheck,
  Sun,
  Moon,
  Info,
  AlertTriangle,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import {
  ThemeConfig,
  ThemePalette,
  SemanticColors,
  defaultTheme,
  defaultDarkPalette,
  defaultLightPalette,
  defaultSemantics,
} from "@/types/theme";

interface AdminThemeViewProps {
  themeConfig: ThemeConfig;
  onSaveTheme: (updated: ThemeConfig) => Promise<void>;
  onResetTheme: () => Promise<void>;
}

export function AdminThemeView({
  themeConfig,
  onSaveTheme,
  onResetTheme,
}: AdminThemeViewProps) {
  const [theme, setTheme] = useState<ThemeConfig>({
    ...defaultTheme,
    ...themeConfig,
    dark: { ...defaultDarkPalette, ...(themeConfig.dark || {}) },
    light: { ...defaultLightPalette, ...(themeConfig.light || {}) },
    semantics: { ...defaultSemantics, ...(themeConfig.semantics || {}) },
  });

  const [activeTab, setActiveTab] = useState<"dark" | "light" | "semantics">("dark");
  const [previewMode, setPreviewMode] = useState<"dark" | "light">("dark");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handlePaletteChange = (
    mode: "dark" | "light",
    key: keyof ThemePalette,
    value: string
  ) => {
    setTheme((prev) => {
      const updatedPalette = { ...prev[mode], [key]: value };
      const updatedTheme = {
        ...prev,
        [mode]: updatedPalette,
      };

      // Keep top-level legacy fields in sync with dark mode by default
      if (mode === "dark") {
        if (key === "primaryColor") updatedTheme.primaryColor = value;
        if (key === "primaryHover") updatedTheme.accentEmeraldLight = value;
        if (key === "secondaryAccent") {
          updatedTheme.secondaryColor = value;
          updatedTheme.accentGoldLight = value;
        }
        if (key === "mainBackground") updatedTheme.backgroundColor = value;
        if (key === "cardBackground") updatedTheme.cardBackground = value;
        if (key === "mainText") updatedTheme.headingColor = value;
        if (key === "secondaryText") updatedTheme.bodyTextColor = value;
        if (key === "border") updatedTheme.borderColor = value;
      }

      return updatedTheme;
    });
  };

  const handleSemanticChange = (key: keyof SemanticColors, value: string) => {
    setTheme((prev) => ({
      ...prev,
      semantics: { ...prev.semantics, [key]: value },
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSaveTheme(theme);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = async () => {
    if (confirm("Reset all theme color tokens to the verified Charcoal & Electric Blue defaults?")) {
      await onResetTheme();
      setTheme({ ...defaultTheme });
    }
  };

  const paletteFields: {
    key: keyof ThemePalette;
    label: string;
    description: string;
    darkDefault: string;
    lightDefault: string;
  }[] = [
    {
      key: "mainBackground",
      label: "Main Background",
      description: "Baseline application backdrop for pages and views.",
      darkDefault: "#11151C",
      lightDefault: "#F4F6F9",
    },
    {
      key: "secondaryBackground",
      label: "Secondary Background",
      description: "Subtle offset backgrounds for alternating sections and drawers.",
      darkDefault: "#1A202B",
      lightDefault: "#E8EDF4",
    },
    {
      key: "cardBackground",
      label: "Card Background",
      description: "Surface tone for project cards, experience items, and modaled surfaces.",
      darkDefault: "#222B38",
      lightDefault: "#FFFFFF",
    },
    {
      key: "elevatedSurface",
      label: "Elevated Surface",
      description: "Higher-contrast surfaces for floating toolbars, badges, and headers.",
      darkDefault: "#2B3544",
      lightDefault: "#DCE5F0",
    },
    {
      key: "primaryColor",
      label: "Primary Brand Color (Electric Blue)",
      description: "Main interactive color for primary buttons, active links, and brand highlights.",
      darkDefault: "#3B91FF",
      lightDefault: "#1769D2",
    },
    {
      key: "primaryHover",
      label: "Primary Hover State",
      description: "Interactive hover state for primary action buttons and active controls.",
      darkDefault: "#65ACFF",
      lightDefault: "#1256B0",
    },
    {
      key: "secondaryAccent",
      label: "Secondary Accent",
      description: "Sophisticated accent for distinction badges, honors, and secondary actions.",
      darkDefault: "#8ABEFF",
      lightDefault: "#3B82C4",
    },
    {
      key: "mainText",
      label: "Main Text / Headings",
      description: "High-contrast text for hero titles, section headings, and primary labels.",
      darkDefault: "#F2F5FA",
      lightDefault: "#292F3A",
    },
    {
      key: "secondaryText",
      label: "Secondary Text",
      description: "Clear contrast text for narrative copy, descriptions, and body paragraphs.",
      darkDefault: "#AAB6C7",
      lightDefault: "#687386",
    },
    {
      key: "mutedText",
      label: "Muted Text",
      description: "Low-contrast metadata text for timestamps, tags, and small captions.",
      darkDefault: "#7F8DA2",
      lightDefault: "#8994A5",
    },
    {
      key: "border",
      label: "Border & Divider",
      description: "Structural boundary color for card frames, dividing rules, and inputs.",
      darkDefault: "#354153",
      lightDefault: "#D6DEE9",
    },
    {
      key: "inputBackground",
      label: "Input Background",
      description: "Fill color for form text fields, textareas, and select elements.",
      darkDefault: "#222B38",
      lightDefault: "#FFFFFF",
    },
    {
      key: "sidebarBackground",
      label: "Sidebar Background",
      description: "Dedicated backdrop tone for the Admin navigation sidebar.",
      darkDefault: "#171E29",
      lightDefault: "#EDF1F6",
    },
    {
      key: "headerBackground",
      label: "Header Background",
      description: "Header backdrop for sticky page and administration navigation.",
      darkDefault: "#1A202B",
      lightDefault: "#FFFFFF",
    },
    {
      key: "focusRing",
      label: "Focus Ring Indicator",
      description: "Accessible outline indicator for keyboard navigation and input focus.",
      darkDefault: "#3B91FF",
      lightDefault: "#1769D2",
    },
  ];

  const currentPreviewPalette = previewMode === "dark" ? theme.dark : theme.light;

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Top action row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-surface border border-border-muted">
        <div>
          <h2 className="text-base font-bold text-content-primary flex items-center gap-2">
            <Palette className="h-5 w-5 text-accent-emerald" />
            Charcoal &amp; Electric Blue Theme Editor
          </h2>
          <p className="text-xs text-content-secondary mt-0.5">
            Configure both Light and Dark mode design tokens with instant live simulation and persistence.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-content-secondary hover:text-content-primary hover:bg-surface-hover border border-border-muted transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset to Default</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-semibold text-white bg-accent-emerald hover:bg-accent-emerald-dark transition-all shadow-lg shadow-accent-emerald/20 disabled:opacity-50"
          >
            {isSaving ? (
              <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
            ) : saveSuccess ? (
              <Check className="h-4 w-4" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
            <span>{saveSuccess ? "Theme Saved!" : isSaving ? "Saving..." : "Save Theme Changes"}</span>
          </button>
        </div>
      </div>

      {/* Mode selection tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-border-muted pb-3">
        <button
          type="button"
          onClick={() => {
            setActiveTab("dark");
            setPreviewMode("dark");
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === "dark"
              ? "bg-accent-emerald text-white shadow-md shadow-accent-emerald/20"
              : "bg-surface text-content-secondary hover:text-content-primary border border-border-muted"
          }`}
        >
          <Moon className="h-3.5 w-3.5" />
          <span>Dark Mode Palette (#11151C &amp; #3B91FF)</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab("light");
            setPreviewMode("light");
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === "light"
              ? "bg-accent-emerald text-white shadow-md shadow-accent-emerald/20"
              : "bg-surface text-content-secondary hover:text-content-primary border border-border-muted"
          }`}
        >
          <Sun className="h-3.5 w-3.5" />
          <span>Light Mode Palette (#F4F6F9 &amp; #1769D2)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("semantics")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === "semantics"
              ? "bg-accent-emerald text-white shadow-md shadow-accent-emerald/20"
              : "bg-surface text-content-secondary hover:text-content-primary border border-border-muted"
          }`}
        >
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Semantic Status Colors</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Color controls */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-6 rounded-2xl bg-surface border border-border-muted space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-content-muted">
                {activeTab === "dark"
                  ? "Dark Mode Design Tokens"
                  : activeTab === "light"
                  ? "Light Mode Design Tokens"
                  : "Semantic Status Indicators"}
              </h3>
              <span className="text-[11px] font-mono text-content-muted">
                {activeTab === "semantics" ? "4 Semantic Keys" : "15 Token Roles"}
              </span>
            </div>

            {/* Dark or Light palette fields */}
            {(activeTab === "dark" || activeTab === "light") && (
              <div className="space-y-3.5">
                {paletteFields.map((field) => {
                  const targetPalette = activeTab === "dark" ? theme.dark : theme.light;
                  const currentColor =
                    (targetPalette[field.key] as string) ||
                    (activeTab === "dark" ? field.darkDefault : field.lightDefault);
                  const hexColor =
                    currentColor.startsWith("#") && currentColor.length === 7
                      ? currentColor
                      : activeTab === "dark"
                      ? field.darkDefault
                      : field.lightDefault;

                  return (
                    <div
                      key={field.key}
                      className="p-3.5 rounded-xl bg-background-secondary border border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-0.5 max-w-sm">
                        <p className="text-xs font-semibold text-content-primary">
                          {field.label}
                        </p>
                        <p className="text-[11px] text-content-secondary">
                          {field.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 self-end sm:self-auto">
                        <div className="relative flex items-center">
                          <input
                            type="color"
                            value={hexColor}
                            onChange={(e) =>
                              handlePaletteChange(activeTab, field.key, e.target.value)
                            }
                            className="w-9 h-9 rounded-lg border border-border-muted cursor-pointer bg-transparent p-0.5"
                            title={`Select ${field.label}`}
                          />
                        </div>
                        <input
                          type="text"
                          value={currentColor}
                          onChange={(e) =>
                            handlePaletteChange(activeTab, field.key, e.target.value)
                          }
                          className="w-28 px-2.5 py-1.5 rounded-lg bg-surface border border-border-muted text-xs font-mono text-content-primary focus:border-accent-emerald outline-none"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Semantics tab fields */}
            {activeTab === "semantics" && (
              <div className="space-y-3.5">
                {[
                  { key: "success" as keyof SemanticColors, label: "Success Status", desc: "Confirmation messages, positive metrics, and check indicators.", defaultHex: "#23875B" },
                  { key: "warning" as keyof SemanticColors, label: "Warning Status", desc: "Caution notices, pending operations, and unverified alerts.", defaultHex: "#D18A24" },
                  { key: "error" as keyof SemanticColors, label: "Error / Danger Status", desc: "Form validation rejections, destructive confirmations, and failure alerts.", defaultHex: "#D94B4B" },
                  { key: "info" as keyof SemanticColors, label: "Information Status", desc: "System notifications, helpful tooltips, and informational highlights.", defaultHex: "#3284D6" },
                ].map((item) => {
                  const currentColor = theme.semantics[item.key] || item.defaultHex;
                  const hexColor = currentColor.startsWith("#") && currentColor.length === 7 ? currentColor : item.defaultHex;

                  return (
                    <div
                      key={item.key}
                      className="p-3.5 rounded-xl bg-background-secondary border border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-0.5 max-w-sm">
                        <p className="text-xs font-semibold text-content-primary">
                          {item.label}
                        </p>
                        <p className="text-[11px] text-content-secondary">
                          {item.desc}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 self-end sm:self-auto">
                        <input
                          type="color"
                          value={hexColor}
                          onChange={(e) => handleSemanticChange(item.key, e.target.value)}
                          className="w-9 h-9 rounded-lg border border-border-muted cursor-pointer bg-transparent p-0.5"
                        />
                        <input
                          type="text"
                          value={currentColor}
                          onChange={(e) => handleSemanticChange(item.key, e.target.value)}
                          className="w-28 px-2.5 py-1.5 rounded-lg bg-surface border border-border-muted text-xs font-mono text-content-primary focus:border-accent-emerald outline-none"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Live Visual Preview Card */}
        <div className="lg:col-span-5 space-y-4">
          <div className="sticky top-24 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-content-muted flex items-center gap-2">
                <Eye className="h-4 w-4 text-accent-emerald" />
                Live Preview Component
              </h3>
              <div className="flex items-center gap-1.5 bg-surface border border-border-muted p-1 rounded-lg">
                <button
                  type="button"
                  onClick={() => setPreviewMode("dark")}
                  className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors ${
                    previewMode === "dark"
                      ? "bg-accent-emerald text-white"
                      : "text-content-secondary hover:text-content-primary"
                  }`}
                >
                  Dark
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewMode("light")}
                  className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors ${
                    previewMode === "light"
                      ? "bg-accent-emerald text-white"
                      : "text-content-secondary hover:text-content-primary"
                  }`}
                >
                  Light
                </button>
              </div>
            </div>

            {/* Simulated public card using theme states */}
            <div
              className="p-6 rounded-2xl border shadow-2xl transition-all space-y-5"
              style={{
                backgroundColor: currentPreviewPalette.cardBackground,
                borderColor: currentPreviewPalette.border,
                color: currentPreviewPalette.mainText,
              }}
            >
              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                <span
                  className="px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 border"
                  style={{
                    backgroundColor: `${currentPreviewPalette.primaryColor}18`,
                    color: currentPreviewPalette.primaryColor,
                    borderColor: `${currentPreviewPalette.primaryColor}40`,
                  }}
                >
                  <ShieldCheck className="h-3 w-3" />
                  Primary Electric Blue
                </span>

                <span
                  className="px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 border"
                  style={{
                    backgroundColor: `${currentPreviewPalette.secondaryAccent}18`,
                    color: currentPreviewPalette.secondaryAccent,
                    borderColor: `${currentPreviewPalette.secondaryAccent}40`,
                  }}
                >
                  <Sparkles className="h-3 w-3" />
                  Secondary Soft Accent
                </span>
              </div>

              {/* Title & Body */}
              <div className="space-y-2">
                <h4
                  className="text-xl font-bold tracking-tight"
                  style={{ color: currentPreviewPalette.mainText }}
                >
                  Engineering Sustainable Solutions
                </h4>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: currentPreviewPalette.secondaryText }}
                >
                  This live preview demonstrates how heading fonts, body copy, surface cards, and accent buttons will render across your portfolio with the chosen tokens.
                </p>
              </div>

              {/* Interactive buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="button"
                  className="px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md text-white"
                  style={{
                    backgroundColor: currentPreviewPalette.primaryColor,
                  }}
                >
                  Primary Action
                </button>

                <button
                  type="button"
                  className="px-4 py-2 rounded-xl text-xs font-semibold border transition-all"
                  style={{
                    borderColor: currentPreviewPalette.border,
                    color: currentPreviewPalette.secondaryAccent,
                    backgroundColor: currentPreviewPalette.elevatedSurface,
                  }}
                >
                  Secondary Action
                </button>
              </div>

              {/* Semantic Status Strip */}
              <div className="pt-3 border-t space-y-2" style={{ borderColor: currentPreviewPalette.border }}>
                <p className="text-[10px] uppercase font-mono tracking-wider" style={{ color: currentPreviewPalette.mutedText }}>
                  Semantic Indicators
                </p>
                <div className="grid grid-cols-2 gap-2 text-[11px] font-medium">
                  <span className="flex items-center gap-1.5 px-2 py-1 rounded" style={{ backgroundColor: `${theme.semantics.success}18`, color: theme.semantics.success }}>
                    <CheckCircle2 className="h-3 w-3" />
                    Success #23875B
                  </span>
                  <span className="flex items-center gap-1.5 px-2 py-1 rounded" style={{ backgroundColor: `${theme.semantics.warning}18`, color: theme.semantics.warning }}>
                    <AlertTriangle className="h-3 w-3" />
                    Warning #D18A24
                  </span>
                  <span className="flex items-center gap-1.5 px-2 py-1 rounded" style={{ backgroundColor: `${theme.semantics.error}18`, color: theme.semantics.error }}>
                    <AlertCircle className="h-3 w-3" />
                    Error #D94B4B
                  </span>
                  <span className="flex items-center gap-1.5 px-2 py-1 rounded" style={{ backgroundColor: `${theme.semantics.info}18`, color: theme.semantics.info }}>
                    <Info className="h-3 w-3" />
                    Info #3284D6
                  </span>
                </div>
              </div>

              {/* Base background swatch */}
              <div
                className="p-3 rounded-xl border flex items-center justify-between text-xs font-mono"
                style={{
                  backgroundColor: currentPreviewPalette.mainBackground,
                  borderColor: currentPreviewPalette.border,
                  color: currentPreviewPalette.secondaryText,
                }}
              >
                <span>Active Page Background:</span>
                <span className="font-bold" style={{ color: currentPreviewPalette.mainText }}>
                  {currentPreviewPalette.mainBackground}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
