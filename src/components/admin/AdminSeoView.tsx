"use client";

import React, { useState } from "react";
import {
  Search,
  Save,
  Check,
  Globe,
  Share2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export interface SeoConfig {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  canonicalDomain: string;
  enableRobotsIndex: boolean;
}

export const defaultSeoConfig: SeoConfig = {
  metaTitle: "Muhammad Faiz Waheed | Chemical Engineer | Sustainability & Business Operations",
  metaDescription:
    "Professional portfolio of Muhammad Faiz Waheed – Chemical Engineer (NUST Rector's Gold Medalist, CGPA 3.53) specializing in Sustainability, Circular Economy, Responsible Supply Chain, and Project Tracking.",
  keywords:
    "Muhammad Faiz Waheed, Chemical Engineer, Sustainability Professional, Circular Economy, Responsible Supply Chain, Business Operations, NUST Gold Medalist, Primavera P6, ESG, Packages Group, Descon Engineering",
  ogTitle: "Muhammad Faiz Waheed | Chemical Engineer & Sustainability Professional",
  ogDescription:
    "Engineering Sustainable Solutions. Driving Business Impact. Rector's Gold Medalist (NUST, CGPA 3.53).",
  canonicalDomain: "https://faizwaheed.com",
  enableRobotsIndex: true,
};

interface AdminSeoViewProps {
  onSaveSeo?: (seo: SeoConfig) => Promise<void>;
}

export function AdminSeoView({ onSaveSeo }: AdminSeoViewProps) {
  const [seo, setSeo] = useState<SeoConfig>(defaultSeoConfig);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (onSaveSeo) {
        await onSaveSeo(seo);
      }
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-surface border border-border-muted">
        <div>
          <h2 className="text-base font-bold text-content-primary flex items-center gap-2">
            <Search className="h-5 w-5 text-accent-emerald" />
            SEO & Social Metadata Manager
          </h2>
          <p className="text-xs text-content-secondary mt-0.5">
            Optimize search engine rankings, meta descriptions, Open Graph preview tags, and canonical domains.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-background bg-accent-emerald hover:bg-accent-emerald-dark transition-all shadow-lg shadow-accent-emerald/20 disabled:opacity-50"
        >
          {isSaving ? (
            <span className="h-4 w-4 rounded-full border-2 border-background border-t-transparent animate-spin" />
          ) : saveSuccess ? (
            <Check className="h-4 w-4" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          <span>{saveSuccess ? "SEO Saved!" : isSaving ? "Saving..." : "Save SEO Settings"}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Settings form */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-surface border border-border-muted space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-content-muted flex items-center gap-2">
            <Globe className="h-4 w-4 text-accent-emerald" />
            Global Search Engine Parameters
          </h3>

          <div>
            <label className="block text-[10px] font-semibold uppercase text-content-secondary mb-1">
              Global Site Title (Default)
            </label>
            <input
              type="text"
              value={seo.metaTitle}
              onChange={(e) => setSeo({ ...seo, metaTitle: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-background-secondary border border-border-muted focus:border-accent-emerald outline-none text-xs text-content-primary font-semibold"
            />
            <p className="text-[10px] text-content-muted mt-1">
              {seo.metaTitle.length} characters (recommended: 50–65 characters)
            </p>
          </div>

          <div>
            <label className="block text-[10px] font-semibold uppercase text-content-secondary mb-1">
              Meta Description
            </label>
            <textarea
              rows={3}
              value={seo.metaDescription}
              onChange={(e) => setSeo({ ...seo, metaDescription: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-background-secondary border border-border-muted focus:border-accent-emerald outline-none text-xs text-content-primary leading-relaxed"
            />
            <p className="text-[10px] text-content-muted mt-1">
              {seo.metaDescription.length} characters (recommended: 140–160 characters)
            </p>
          </div>

          <div>
            <label className="block text-[10px] font-semibold uppercase text-content-secondary mb-1">
              Meta Keywords (Comma-separated)
            </label>
            <textarea
              rows={2}
              value={seo.keywords}
              onChange={(e) => setSeo({ ...seo, keywords: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-background-secondary border border-border-muted focus:border-accent-emerald outline-none text-xs text-content-primary font-mono text-[11px]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-semibold uppercase text-content-secondary mb-1">
                Canonical Base Domain
              </label>
              <input
                type="url"
                value={seo.canonicalDomain}
                onChange={(e) => setSeo({ ...seo, canonicalDomain: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-background-secondary border border-border-muted focus:border-accent-emerald outline-none text-xs text-content-primary font-mono"
              />
            </div>

            <div>
              <label className="block text-[10px] font-semibold uppercase text-content-secondary mb-1">
                Search Engine Indexing
              </label>
              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={seo.enableRobotsIndex}
                    onChange={(e) => setSeo({ ...seo, enableRobotsIndex: e.target.checked })}
                    className="rounded accent-accent-emerald"
                  />
                  <span className="text-xs text-content-primary font-medium">
                    Allow Public Robots Indexing
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Social Share Preview Card */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-surface border border-border-muted space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-content-muted flex items-center gap-2">
            <Share2 className="h-4 w-4 text-accent-emerald" />
            Social Share & Google SERP Simulation
          </h3>

          <div className="space-y-4">
            {/* Google SERP Preview */}
            <div className="p-4 rounded-xl bg-background-secondary border border-border-subtle space-y-1">
              <span className="text-[10px] font-mono text-content-muted">
                {seo.canonicalDomain}
              </span>
              <p className="text-sm font-semibold text-accent-emerald hover:underline cursor-pointer line-clamp-1">
                {seo.metaTitle}
              </p>
              <p className="text-xs text-content-secondary line-clamp-2 leading-relaxed">
                {seo.metaDescription}
              </p>
            </div>

            {/* LinkedIn / Twitter Card Preview */}
            <div className="rounded-xl overflow-hidden border border-border-subtle bg-background-secondary shadow-md">
              <div className="aspect-[1.91/1] bg-gradient-to-br from-surface to-background-secondary flex flex-col items-center justify-center p-6 text-center border-b border-border-subtle">
                <span className="text-xs font-mono font-bold text-accent-emerald-light uppercase tracking-wider mb-1">
                  Muhammad Faiz Waheed
                </span>
                <p className="text-sm font-bold text-content-primary max-w-xs">
                  Chemical Engineer & Sustainability Professional
                </p>
                <span className="text-[10px] text-accent-gold-light mt-1">
                  NUST Rector&apos;s Gold Medalist • CGPA 3.53
                </span>
              </div>
              <div className="p-3 space-y-1">
                <span className="text-[10px] font-mono text-content-muted uppercase">
                  faizwaheed.com
                </span>
                <p className="text-xs font-bold text-content-primary line-clamp-1">
                  {seo.ogTitle}
                </p>
                <p className="text-[11px] text-content-secondary line-clamp-2">
                  {seo.ogDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

