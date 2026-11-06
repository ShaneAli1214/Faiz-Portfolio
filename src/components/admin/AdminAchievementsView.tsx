"use client";

import React, { useState } from "react";
import {
  Award,
  Save,
  Check,
  Plus,
  Trash2,
  Sparkles,
  BookOpen,
  Calendar,
} from "lucide-react";
import { AwardItem, CertificationItem } from "@/types/portfolio";

interface AdminAchievementsViewProps {
  awards: AwardItem[];
  certifications: CertificationItem[];
  onSaveAchievements: (payload: {
    awards: AwardItem[];
    certifications: CertificationItem[];
  }) => Promise<void>;
}

export function AdminAchievementsView({
  awards: initialAwards,
  certifications: initialCerts,
  onSaveAchievements,
}: AdminAchievementsViewProps) {
  const [awards, setAwards] = useState<AwardItem[]>([...initialAwards]);
  const [programs, setPrograms] = useState<CertificationItem[]>([...initialCerts]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSaveAchievements({
        awards,
        certifications: programs,
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-surface border border-border-muted">
        <div>
          <h2 className="text-base font-bold text-content-primary flex items-center gap-2">
            <Award className="h-5 w-5 text-accent-gold" />
            Achievements & Professional Programs
          </h2>
          <p className="text-xs text-content-secondary mt-0.5">
            Manage scholastic honors and executive development programs (Harvard Aspire, McKinsey Forward).
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
          <span>{saveSuccess ? "Achievements Saved!" : isSaving ? "Saving..." : "Save Achievements"}</span>
        </button>
      </div>

      {/* Academic Awards Section */}
      <div className="p-6 rounded-2xl bg-surface border border-border-muted space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-content-primary flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-accent-gold" />
              Academic Honors & Medals ({awards.length})
            </h3>
            <p className="text-[11px] text-content-muted">
              Distinctions conferred by the university administration.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              const newAward: AwardItem = {
                id: `award-${Date.now()}`,
                title: "Academic Honor",
                institution: "National University of Sciences and Technology (NUST)",
                description: "Distinction description.",
                verified: true,
              };
              setAwards([...awards, newAward]);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-accent-gold bg-accent-gold/10 hover:bg-accent-gold/20 border border-accent-gold/30 transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add Award</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {awards.map((award, idx) => (
            <div
              key={award.id || idx}
              className="p-4 rounded-xl bg-background-secondary border border-border-subtle space-y-3 relative"
            >
              <button
                type="button"
                onClick={() => setAwards(awards.filter((_, i) => i !== idx))}
                className="absolute top-3 right-3 p-1 rounded-md text-content-muted hover:text-red-400 hover:bg-red-950/40 transition-colors"
                title="Delete award"
              >
                <Trash2 className="h-4 w-4" />
              </button>

              <div className="pr-6">
                <label className="text-[10px] font-semibold text-content-muted uppercase">Award Title</label>
                <input
                  type="text"
                  value={award.title}
                  onChange={(e) => {
                    const copy = [...awards];
                    copy[idx].title = e.target.value;
                    setAwards(copy);
                  }}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-surface border border-border-muted text-xs text-content-primary font-bold"
                />
              </div>

              <div>
                <label className="text-[10px] font-semibold text-content-muted uppercase">Institution</label>
                <input
                  type="text"
                  value={award.institution}
                  onChange={(e) => {
                    const copy = [...awards];
                    copy[idx].institution = e.target.value;
                    setAwards(copy);
                  }}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-surface border border-border-muted text-xs text-content-primary"
                />
              </div>

              <div>
                <label className="text-[10px] font-semibold text-content-muted uppercase">Description</label>
                <textarea
                  rows={2}
                  value={award.description}
                  onChange={(e) => {
                    const copy = [...awards];
                    copy[idx].description = e.target.value;
                    setAwards(copy);
                  }}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-surface border border-border-muted text-xs text-content-secondary leading-relaxed"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Professional Development Programs Section */}
      <div className="p-6 rounded-2xl bg-surface border border-border-muted space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-content-primary flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-accent-emerald" />
              Executive & Professional Programs ({programs.length})
            </h3>
            <p className="text-[11px] text-content-muted">
              Harvard Aspire Leaders Program & McKinsey Forward (distinguish In Progress vs Completed).
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              const newProg: CertificationItem = {
                id: `prog-${Date.now()}`,
                title: "New Program",
                issuer: "Institution / Faculty",
                duration: "October–December 2026",
                status: "In Progress",
                description: "Executive leadership and problem-solving development curriculum.",
                verified: true,
              };
              setPrograms([...programs, newProg]);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-accent-emerald bg-accent-emerald/10 hover:bg-accent-emerald/20 border border-accent-emerald/30 transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add Program</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {programs.map((prog, pIdx) => (
            <div
              key={prog.id || pIdx}
              className="p-4 rounded-xl bg-background-secondary border border-border-subtle space-y-3 relative"
            >
              <button
                type="button"
                onClick={() => setPrograms(programs.filter((_, i) => i !== pIdx))}
                className="absolute top-3 right-3 p-1 rounded-md text-content-muted hover:text-red-400 hover:bg-red-950/40 transition-colors"
                title="Delete program"
              >
                <Trash2 className="h-4 w-4" />
              </button>

              <div className="pr-6">
                <label className="text-[10px] font-semibold text-content-muted uppercase">Program Title</label>
                <input
                  type="text"
                  value={prog.title}
                  onChange={(e) => {
                    const copy = [...programs];
                    copy[pIdx].title = e.target.value;
                    setPrograms(copy);
                  }}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-surface border border-border-muted text-xs text-content-primary font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-semibold text-content-muted uppercase">Issuer / Faculty</label>
                  <input
                    type="text"
                    value={prog.issuer}
                    onChange={(e) => {
                      const copy = [...programs];
                      copy[pIdx].issuer = e.target.value;
                      setPrograms(copy);
                    }}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-surface border border-border-muted text-xs text-content-primary"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-semibold text-content-muted uppercase">Status</label>
                  <select
                    value={prog.status}
                    onChange={(e) => {
                      const copy = [...programs];
                      copy[pIdx].status = e.target.value as "In Progress" | "Completed";
                      setPrograms(copy);
                    }}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-surface border border-border-muted text-xs text-accent-emerald-light outline-none font-semibold"
                  >
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-semibold text-content-muted uppercase">Dates / Duration</label>
                <input
                  type="text"
                  value={prog.duration || prog.period || ""}
                  onChange={(e) => {
                    const copy = [...programs];
                    copy[pIdx].duration = e.target.value;
                    setPrograms(copy);
                  }}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-surface border border-border-muted text-xs text-content-primary font-mono"
                  placeholder="October–December 2026"
                />
              </div>

              <div>
                <label className="text-[10px] font-semibold text-content-muted uppercase">Description</label>
                <textarea
                  rows={2}
                  value={prog.description || ""}
                  onChange={(e) => {
                    const copy = [...programs];
                    copy[pIdx].description = e.target.value;
                    setPrograms(copy);
                  }}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-surface border border-border-muted text-xs text-content-secondary leading-relaxed"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

