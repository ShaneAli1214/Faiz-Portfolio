"use client";

import React, { useState } from "react";
import { Palette, RotateCcw, Check, Sparkles, Eye, ShieldCheck } from "lucide-react";
import { ThemeConfig, defaultTheme } from "@/types/theme";

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
  const [theme, setTheme] = useState<ThemeConfig>({ ...themeConfig });
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleChange = (key: keyof ThemeConfig, value: string) => {
    setTheme((prev) => ({ ...prev, [key]: value }));
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
    if (confirm("Reset all theme color tokens to the verified Dark Emerald defaults?")) {
      await onResetTheme();
      setTheme({ ...defaultTheme });
    }
  };

  const colorFields: {
    key: keyof ThemeConfig;
    label: string;
    description: string;
    fallbackColor: string;
  }[] = [
    {
      key: "primaryColor",
      label: "Primary Accent (Emerald)",
      description: "Main brand color used for key call-to-actions, active indicators, and highlights.",
      fallbackColor: "#10B981",
    },
    {
      key: "secondaryColor",
      label: "Secondary Accent (Gold)",
      description: "Executive accent used for scholastic distinctions, honors, and secondary actions.",
      fallbackColor: "#D4AF37",
    },
    {
      key: "accentEmeraldLight",
      label: "Emerald Light Variant",
      description: "Subtle emerald glow used for badge text and gradient endpoints.",
      fallbackColor: "#34D399",
    },
    {
      key: "accentGoldLight",
      label: "Gold Light Variant",
      description: "Bright gold shade used for distinction badges and subtle highlights.",
      fallbackColor: "#F3E5AB",
    },
    {
      key: "backgroundColor",
      label: "Page Background Base",
      description: "Deep charcoal navy baseline background color of the entire website.",
      fallbackColor: "#090D12",
    },
    {
      key: "cardBackground",
      label: "Card & Surface Background",
      description: "Surface background tone for timeline cards, project containers, and dialogs.",
      fallbackColor: "#0F1720",
    },
    {
      key: "headingColor",
      label: "Headings & Primary Text",
      description: "High-contrast text color for page titles, section headings, and emphasis.",
      fallbackColor: "#F8FAFC",
    },
    {
      key: "bodyTextColor",
      label: "Body & Subtitle Text",
      description: "Muted contrast text color for narrative paragraphs, descriptions, and metadata.",
      fallbackColor: "#94A3B8",
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Top action row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-surface border border-border-muted">
        <div>
          <h2 className="text-base font-bold text-content-primary flex items-center gap-2">
            <Palette className="h-5 w-5 text-accent-emerald" />
            Visual Theme Customizer
          </h2>
          <p className="text-xs text-content-secondary mt-0.5">
            Modify color tokens with real-time preview. Saving updates public styling immediately.
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
            className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-semibold text-background bg-accent-emerald hover:bg-accent-emerald-dark transition-all shadow-lg shadow-accent-emerald/20 disabled:opacity-50"
          >
            {isSaving ? (
              <span className="h-4 w-4 rounded-full border-2 border-background border-t-transparent animate-spin" />
            ) : saveSuccess ? (
              <Check className="h-4 w-4" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
            <span>{saveSuccess ? "Theme Saved!" : isSaving ? "Saving..." : "Save Theme Changes"}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Color controls */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-6 rounded-2xl bg-surface border border-border-muted space-y-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-content-muted">
              Design Token Palette
            </h3>

            <div className="space-y-4">
              {colorFields.map((field) => {
                const currentColor = (theme[field.key] as string) || field.fallbackColor;
                // For HTML5 color input, ensure hex format #RRGGBB
                const hexColor = currentColor.startsWith("#") && currentColor.length === 7 ? currentColor : field.fallbackColor;

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
                          onChange={(e) => handleChange(field.key, e.target.value)}
                          className="w-9 h-9 rounded-lg border border-border-muted cursor-pointer bg-transparent p-0.5"
                          title={`Select ${field.label}`}
                        />
                      </div>
                      <input
                        type="text"
                        value={currentColor}
                        onChange={(e) => handleChange(field.key, e.target.value)}
                        className="w-28 px-2.5 py-1.5 rounded-lg bg-surface border border-border-muted text-xs font-mono text-content-primary focus:border-accent-emerald outline-none"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
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
              <span className="text-[11px] font-mono text-accent-emerald-light">
                Instant Visual Simulation
              </span>
            </div>

            {/* Simulated public card using theme states */}
            <div
              className="p-6 rounded-2xl border shadow-2xl transition-all space-y-5"
              style={{
                backgroundColor: theme.cardBackground || "#0F1720",
                borderColor: theme.borderColor || "rgba(255, 255, 255, 0.08)",
              }}
            >
              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                <span
                  className="px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5"
                  style={{
                    backgroundColor: `${theme.primaryColor}20`,
                    color: theme.accentEmeraldLight || theme.primaryColor,
                    borderColor: `${theme.primaryColor}40`,
                    borderWidth: "1px",
                  }}
                >
                  <ShieldCheck className="h-3 w-3" />
                  Primary Accent Badge
                </span>

                <span
                  className="px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5"
                  style={{
                    backgroundColor: `${theme.secondaryColor}20`,
                    color: theme.accentGoldLight || theme.secondaryColor,
                    borderColor: `${theme.secondaryColor}40`,
                    borderWidth: "1px",
                  }}
                >
                  <Sparkles className="h-3 w-3" />
                  Gold Honor Badge
                </span>
              </div>

              {/* Title & Body */}
              <div className="space-y-2">
                <h4
                  className="text-xl font-bold tracking-tight"
                  style={{ color: theme.headingColor || "#F8FAFC" }}
                >
                  Engineering Sustainable Solutions
                </h4>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: theme.bodyTextColor || "#94A3B8" }}
                >
                  This live preview demonstrates how heading fonts, body copy, surface cards, and accent buttons will render across your portfolio with the chosen tokens.
                </p>
              </div>

              {/* Interactive buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="button"
                  className="px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md"
                  style={{
                    backgroundColor: theme.primaryColor || "#10B981",
                    color: theme.backgroundColor || "#090D12",
                  }}
                >
                  Primary Action
                </button>

                <button
                  type="button"
                  className="px-4 py-2 rounded-xl text-xs font-semibold border transition-all"
                  style={{
                    borderColor: `${theme.secondaryColor}50`,
                    color: theme.accentGoldLight || theme.secondaryColor,
                    backgroundColor: `${theme.secondaryColor}15`,
                  }}
                >
                  Gold Secondary
                </button>
              </div>

              {/* Base background swatch */}
              <div
                className="p-3 rounded-xl border flex items-center justify-between text-xs font-mono"
                style={{
                  backgroundColor: theme.backgroundColor || "#090D12",
                  borderColor: theme.borderColor || "rgba(255, 255, 255, 0.08)",
                  color: theme.bodyTextColor || "#94A3B8",
                }}
              >
                <span>Site Background:</span>
                <span className="font-bold" style={{ color: theme.headingColor }}>
                  {theme.backgroundColor}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

