"use client";

import React, { useState } from "react";
import {
  GraduationCap,
  Save,
  Check,
  Plus,
  Trash2,
  Award,
  Sparkles,
  BookOpen,
} from "lucide-react";
import { EducationItem, AcademicAchievement } from "@/types/portfolio";

interface AdminEducationViewProps {
  educationList: EducationItem[];
  achievements: AcademicAchievement[];
  onSaveEducation: (payload: {
    education: EducationItem[];
    academicAchievements: AcademicAchievement[];
  }) => Promise<void>;
}

export function AdminEducationView({
  educationList: initialEducation,
  achievements: initialAchievements,
  onSaveEducation,
}: AdminEducationViewProps) {
  const [educationList, setEducationList] = useState<EducationItem[]>([...initialEducation]);
  const [achievements, setAchievements] = useState<AcademicAchievement[]>([...initialAchievements]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const primaryEdu = educationList[0] || {
    id: "nust-scme",
    degree: "Bachelor of Engineering in Chemical Engineering",
    institution: "National University of Sciences and Technology (NUST)",
    duration: "November 2021 – June 2025",
    cgpa: "3.53",
    distinction: "Gold Medalist",
    honors: ["Rector's Gold Medalist", "Dean's List (2021–2025)"],
    verified: true,
  };

  const handleUpdatePrimary = (field: keyof EducationItem, val: any) => {
    const updated = [...educationList];
    updated[0] = { ...primaryEdu, [field]: val };
    setEducationList(updated);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSaveEducation({
        education: educationList,
        academicAchievements: achievements,
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-surface border border-border-muted">
        <div>
          <h2 className="text-base font-bold text-content-primary flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-accent-emerald" />
            Education & Academic Excellence Manager
          </h2>
          <p className="text-xs text-content-secondary mt-0.5">
            Configure NUST degree credentials, scholastic GPA, and Rector&apos;s Gold Medal honors.
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
          <span>{saveSuccess ? "Education Saved!" : isSaving ? "Saving..." : "Save Education Changes"}</span>
        </button>
      </div>

      {/* Primary Degree Card */}
      <div className="p-6 rounded-2xl bg-surface border border-border-muted space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-content-primary flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-accent-emerald" />
            Primary Engineering Degree
          </h3>
          <span className="text-[10px] font-bold text-accent-emerald-light bg-accent-emerald/10 px-2 py-0.5 rounded-full">
            Verified NUST Record
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-semibold uppercase text-content-secondary mb-1">
              Degree Title
            </label>
            <input
              type="text"
              value={primaryEdu.degree}
              onChange={(e) => handleUpdatePrimary("degree", e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-background-secondary border border-border-muted focus:border-accent-emerald outline-none text-xs text-content-primary font-semibold"
            />
          </div>

          <div>
            <label className="block text-[10px] font-semibold uppercase text-content-secondary mb-1">
              University / Institution
            </label>
            <input
              type="text"
              value={primaryEdu.institution}
              onChange={(e) => handleUpdatePrimary("institution", e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-background-secondary border border-border-muted focus:border-accent-emerald outline-none text-xs text-content-primary"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-[10px] font-semibold uppercase text-content-secondary mb-1">
              Duration / Period
            </label>
            <input
              type="text"
              value={primaryEdu.duration}
              onChange={(e) => handleUpdatePrimary("duration", e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-background-secondary border border-border-muted focus:border-accent-emerald outline-none text-xs text-content-primary"
            />
          </div>

          <div>
            <label className="block text-[10px] font-semibold uppercase text-content-secondary mb-1">
              CGPA
            </label>
            <input
              type="text"
              value={primaryEdu.cgpa}
              onChange={(e) => handleUpdatePrimary("cgpa", e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-background-secondary border border-border-muted focus:border-accent-emerald outline-none text-xs text-content-primary font-mono font-bold"
            />
          </div>

          <div>
            <label className="block text-[10px] font-semibold uppercase text-content-secondary mb-1">
              Scholastic Distinction
            </label>
            <input
              type="text"
              value={primaryEdu.distinction || ""}
              onChange={(e) => handleUpdatePrimary("distinction", e.target.value)}
              placeholder="Gold Medalist"
              className="w-full px-3 py-2 rounded-xl bg-background-secondary border border-border-muted focus:border-accent-emerald outline-none text-xs text-content-primary text-accent-gold-light"
            />
          </div>
        </div>

        {/* Honors list */}
        <div>
          <label className="block text-[10px] font-semibold uppercase text-content-secondary mb-1">
            Academic Honors (Comma-separated)
          </label>
          <input
            type="text"
            value={primaryEdu.honors ? primaryEdu.honors.join(", ") : ""}
            onChange={(e) =>
              handleUpdatePrimary(
                "honors",
                e.target.value.split(",").map((h) => h.trim()).filter(Boolean)
              )
            }
            className="w-full px-3 py-2 rounded-xl bg-background-secondary border border-border-muted focus:border-accent-emerald outline-none text-xs text-content-primary"
            placeholder="Rector's Gold Medalist, Dean's List (2021–2025)"
          />
        </div>
      </div>

      {/* Academic Achievements / Awards */}
      <div className="p-6 rounded-2xl bg-surface border border-border-muted space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-content-primary flex items-center gap-2">
              <Award className="h-4 w-4 text-accent-gold" />
              Academic Distinctions ({achievements.length})
            </h3>
            <p className="text-[11px] text-content-muted">
              Rector&apos;s Gold Medal, Dean&apos;s List, and academic accolades.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              const newAch: AcademicAchievement = {
                id: `ach-${Date.now()}`,
                title: "Academic Award",
                institution: "National University of Sciences and Technology (NUST)",
                description: "Award description and recognition scope.",
                distinctionType: "general",
                verified: true,
              };
              setAchievements([...achievements, newAch]);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-accent-gold bg-accent-gold/10 hover:bg-accent-gold/20 border border-accent-gold/30 transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add Distinction</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((ach, idx) => (
            <div
              key={ach.id || idx}
              className="p-4 rounded-xl bg-background-secondary border border-border-subtle space-y-3 relative"
            >
              <button
                type="button"
                onClick={() => setAchievements(achievements.filter((_, i) => i !== idx))}
                className="absolute top-3 right-3 p-1 rounded-md text-content-muted hover:text-red-400 hover:bg-red-950/40 transition-colors"
                title="Delete distinction"
              >
                <Trash2 className="h-4 w-4" />
              </button>

              <div className="pr-6">
                <label className="text-[10px] font-semibold text-content-muted uppercase">Distinction Title</label>
                <input
                  type="text"
                  value={ach.title}
                  onChange={(e) => {
                    const copy = [...achievements];
                    copy[idx].title = e.target.value;
                    setAchievements(copy);
                  }}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-surface border border-border-muted text-xs text-content-primary font-bold"
                />
              </div>

              <div>
                <label className="text-[10px] font-semibold text-content-muted uppercase">Institution</label>
                <input
                  type="text"
                  value={ach.institution}
                  onChange={(e) => {
                    const copy = [...achievements];
                    copy[idx].institution = e.target.value;
                    setAchievements(copy);
                  }}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-surface border border-border-muted text-xs text-content-primary"
                />
              </div>

              <div>
                <label className="text-[10px] font-semibold text-content-muted uppercase">Description</label>
                <textarea
                  rows={2}
                  value={ach.description}
                  onChange={(e) => {
                    const copy = [...achievements];
                    copy[idx].description = e.target.value;
                    setAchievements(copy);
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

