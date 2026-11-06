"use client";

import React, { useState } from "react";
import {
  User,
  Save,
  Check,
  Plus,
  Trash2,
  Sparkles,
  TrendingUp,
  Compass,
  HeartHandshake,
  Lightbulb,
} from "lucide-react";
import {
  ProfileInfo,
  HighlightMetric,
  CareerMilestone,
  ProfessionalValue,
  ProfessionalInterest,
} from "@/types/portfolio";

interface AdminProfileViewProps {
  profile: ProfileInfo;
  highlights: HighlightMetric[];
  careerJourney: CareerMilestone[];
  professionalValues: ProfessionalValue[];
  professionalInterests: ProfessionalInterest[];
  onSaveProfile: (updates: {
    profile: ProfileInfo;
    highlights: HighlightMetric[];
    careerJourney: CareerMilestone[];
    professionalValues: ProfessionalValue[];
    professionalInterests: ProfessionalInterest[];
  }) => Promise<void>;
}

export function AdminProfileView({
  profile: initialProfile,
  highlights: initialHighlights,
  careerJourney: initialCareer,
  professionalValues: initialValues,
  professionalInterests: initialInterests,
  onSaveProfile,
}: AdminProfileViewProps) {
  const [profile, setProfile] = useState<ProfileInfo>({ ...initialProfile });
  const [highlights, setHighlights] = useState<HighlightMetric[]>([...initialHighlights]);
  const [careerJourney, setCareerJourney] = useState<CareerMilestone[]>([...initialCareer]);
  const [values, setValues] = useState<ProfessionalValue[]>([...initialValues]);
  const [interests, setInterests] = useState<ProfessionalInterest[]>([...initialInterests]);

  const [activeTab, setActiveTab] = useState<"basics" | "highlights" | "journey" | "values" | "interests">("basics");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSaveProfile({
        profile,
        highlights,
        careerJourney,
        professionalValues: values,
        professionalInterests: interests,
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-surface border border-border-muted">
        <div>
          <h2 className="text-base font-bold text-content-primary flex items-center gap-2">
            <User className="h-5 w-5 text-accent-emerald" />
            Profile & Executive About Editor
          </h2>
          <p className="text-xs text-content-secondary mt-0.5">
            Configure narrative summary, verified academic credentials, metrics highlights, and career milestones.
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
          <span>{saveSuccess ? "Profile Saved!" : isSaving ? "Saving..." : "Save Profile Changes"}</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 p-1 rounded-xl bg-background-secondary border border-border-subtle">
        <button
          type="button"
          onClick={() => setActiveTab("basics")}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
            activeTab === "basics"
              ? "bg-surface text-accent-emerald border border-accent-emerald/30 shadow-sm"
              : "text-content-secondary hover:text-content-primary"
          }`}
        >
          Basic Bio & Identity
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("highlights")}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
            activeTab === "highlights"
              ? "bg-surface text-accent-emerald border border-accent-emerald/30 shadow-sm"
              : "text-content-secondary hover:text-content-primary"
          }`}
        >
          Metric Highlights ({highlights.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("journey")}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
            activeTab === "journey"
              ? "bg-surface text-accent-emerald border border-accent-emerald/30 shadow-sm"
              : "text-content-secondary hover:text-content-primary"
          }`}
        >
          Career Milestones ({careerJourney.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("values")}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
            activeTab === "values"
              ? "bg-surface text-accent-emerald border border-accent-emerald/30 shadow-sm"
              : "text-content-secondary hover:text-content-primary"
          }`}
        >
          Core Values ({values.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("interests")}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
            activeTab === "interests"
              ? "bg-surface text-accent-emerald border border-accent-emerald/30 shadow-sm"
              : "text-content-secondary hover:text-content-primary"
          }`}
        >
          Technical Interests ({interests.length})
        </button>
      </div>

      {/* TAB 1: Basics */}
      {activeTab === "basics" && (
        <div className="p-6 rounded-2xl bg-surface border border-border-muted space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-content-secondary mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={profile.fullName}
                onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-background-secondary border border-border-muted focus:border-accent-emerald outline-none text-xs text-content-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-content-secondary mb-1.5">
                Professional Title
              </label>
              <input
                type="text"
                value={profile.professionalTitle}
                onChange={(e) => setProfile({ ...profile, professionalTitle: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-background-secondary border border-border-muted focus:border-accent-emerald outline-none text-xs text-content-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-content-secondary mb-1.5">
              Hero Tagline / Executive Punchline
            </label>
            <input
              type="text"
              value={profile.tagline}
              onChange={(e) => setProfile({ ...profile, tagline: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-background-secondary border border-border-muted focus:border-accent-emerald outline-none text-xs text-content-primary"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-content-secondary mb-1.5">
                Degree
              </label>
              <input
                type="text"
                value={profile.degree}
                onChange={(e) => setProfile({ ...profile, degree: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-background-secondary border border-border-muted focus:border-accent-emerald outline-none text-xs text-content-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-content-secondary mb-1.5">
                Institution
              </label>
              <input
                type="text"
                value={profile.institution}
                onChange={(e) => setProfile({ ...profile, institution: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-background-secondary border border-border-muted focus:border-accent-emerald outline-none text-xs text-content-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-content-secondary mb-1.5">
                Verified CGPA
              </label>
              <input
                type="text"
                value={profile.cgpa}
                onChange={(e) => setProfile({ ...profile, cgpa: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-background-secondary border border-border-muted focus:border-accent-emerald outline-none text-xs text-content-primary font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-content-secondary mb-1.5">
              Avatar Image URL / File Path
            </label>
            <input
              type="text"
              value={profile.photoUrl || ""}
              onChange={(e) => setProfile({ ...profile, photoUrl: e.target.value })}
              placeholder="/uploads/my-photo.webp"
              className="w-full px-3.5 py-2.5 rounded-xl bg-background-secondary border border-border-muted focus:border-accent-emerald outline-none text-xs text-content-primary font-mono"
            />
            <p className="text-[11px] text-content-muted mt-1">
              Tip: You can upload a photo in the <strong className="text-accent-emerald-light">Image & Media Manager</strong> and click &quot;Set Avatar&quot;.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-content-secondary mb-1.5">
              Executive Bio Summary (Homepage Hero & Overview)
            </label>
            <textarea
              rows={4}
              value={profile.bioSummary}
              onChange={(e) => setProfile({ ...profile, bioSummary: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-background-secondary border border-border-muted focus:border-accent-emerald outline-none text-xs text-content-primary leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-content-secondary mb-1.5">
              About Page Narrative Introduction
            </label>
            <textarea
              rows={4}
              value={profile.aboutIntro || ""}
              onChange={(e) => setProfile({ ...profile, aboutIntro: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-background-secondary border border-border-muted focus:border-accent-emerald outline-none text-xs text-content-primary leading-relaxed"
            />
          </div>
        </div>
      )}

      {/* TAB 2: Highlights */}
      {activeTab === "highlights" && (
        <div className="p-6 rounded-2xl bg-surface border border-border-muted space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-content-primary">
                Executive Metric Cards (Homepage Top Banner)
              </h3>
              <p className="text-[11px] text-content-muted">
                Highlights the verified accomplishments (e.g. Rector&apos;s Gold Medal, 3.53 CGPA, 11 Group Companies).
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                const newMetric: HighlightMetric = {
                  id: `metric-${Date.now()}`,
                  value: "100%",
                  numericTarget: 100,
                  label: "New Metric",
                  context: "Verified Context",
                };
                setHighlights([...highlights, newMetric]);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-accent-emerald bg-accent-emerald/10 hover:bg-accent-emerald/20 border border-accent-emerald/30 transition-colors"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Metric</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {highlights.map((h, index) => (
              <div
                key={h.id || index}
                className="p-4 rounded-xl bg-background-secondary border border-border-subtle space-y-3 relative group"
              >
                <button
                  type="button"
                  onClick={() => setHighlights(highlights.filter((_, i) => i !== index))}
                  className="absolute top-3 right-3 p-1 rounded-md text-content-muted hover:text-red-400 hover:bg-red-950/40 transition-colors"
                  title="Delete metric"
                >
                  <Trash2 className="h-4 w-4" />
                </button>

                <div className="grid grid-cols-2 gap-2 pr-6">
                  <div>
                    <label className="text-[10px] font-semibold text-content-muted uppercase">Display Value</label>
                    <input
                      type="text"
                      value={h.value}
                      onChange={(e) => {
                        const copy = [...highlights];
                        copy[index].value = e.target.value;
                        setHighlights(copy);
                      }}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-surface border border-border-muted text-xs text-content-primary font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-semibold text-content-muted uppercase">Target Number</label>
                    <input
                      type="number"
                      value={h.numericTarget}
                      onChange={(e) => {
                        const copy = [...highlights];
                        copy[index].numericTarget = parseFloat(e.target.value) || 0;
                        setHighlights(copy);
                      }}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-surface border border-border-muted text-xs text-content-primary font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-semibold text-content-muted uppercase">Label</label>
                  <input
                    type="text"
                    value={h.label}
                    onChange={(e) => {
                      const copy = [...highlights];
                      copy[index].label = e.target.value;
                      setHighlights(copy);
                    }}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-surface border border-border-muted text-xs text-content-primary"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-semibold text-content-muted uppercase">Context</label>
                  <input
                    type="text"
                    value={h.context}
                    onChange={(e) => {
                      const copy = [...highlights];
                      copy[index].context = e.target.value;
                      setHighlights(copy);
                    }}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-surface border border-border-muted text-xs text-content-secondary"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Journey */}
      {activeTab === "journey" && (
        <div className="p-6 rounded-2xl bg-surface border border-border-muted space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-content-primary">
                Career Journey Milestones (About Page Timeline)
              </h3>
              <p className="text-[11px] text-content-muted">
                Chronological milestones highlighting the evolution from academic excellence to corporate circular economy leadership.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                const newMilestone: CareerMilestone = {
                  year: "2026",
                  title: "New Career Milestone",
                  organization: "Organization",
                  description: "Milestone description and impact details.",
                  category: "Sustainability",
                  isCurrent: false,
                };
                setCareerJourney([newMilestone, ...careerJourney]);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-accent-emerald bg-accent-emerald/10 hover:bg-accent-emerald/20 border border-accent-emerald/30 transition-colors"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Milestone</span>
            </button>
          </div>

          <div className="space-y-3">
            {careerJourney.map((m, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-background-secondary border border-border-subtle space-y-3 relative"
              >
                <button
                  type="button"
                  onClick={() => setCareerJourney(careerJourney.filter((_, i) => i !== idx))}
                  className="absolute top-3 right-3 p-1 rounded-md text-content-muted hover:text-red-400 hover:bg-red-950/40 transition-colors"
                  title="Delete milestone"
                >
                  <Trash2 className="h-4 w-4" />
                </button>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pr-8">
                  <div>
                    <label className="text-[10px] font-semibold text-content-muted uppercase">Year / Period</label>
                    <input
                      type="text"
                      value={m.year}
                      onChange={(e) => {
                        const copy = [...careerJourney];
                        copy[idx].year = e.target.value;
                        setCareerJourney(copy);
                      }}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-surface border border-border-muted text-xs text-content-primary font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-semibold text-content-muted uppercase">Role / Milestone Title</label>
                    <input
                      type="text"
                      value={m.title}
                      onChange={(e) => {
                        const copy = [...careerJourney];
                        copy[idx].title = e.target.value;
                        setCareerJourney(copy);
                      }}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-surface border border-border-muted text-xs text-content-primary"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-semibold text-content-muted uppercase">Organization</label>
                    <input
                      type="text"
                      value={m.organization}
                      onChange={(e) => {
                        const copy = [...careerJourney];
                        copy[idx].organization = e.target.value;
                        setCareerJourney(copy);
                      }}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-surface border border-border-muted text-xs text-content-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-semibold text-content-muted uppercase">Description</label>
                  <textarea
                    rows={2}
                    value={m.description}
                    onChange={(e) => {
                      const copy = [...careerJourney];
                      copy[idx].description = e.target.value;
                      setCareerJourney(copy);
                    }}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-surface border border-border-muted text-xs text-content-secondary leading-relaxed"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: Core Values */}
      {activeTab === "values" && (
        <div className="p-6 rounded-2xl bg-surface border border-border-muted space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-content-primary">
                Core Professional Values
              </h3>
              <p className="text-[11px] text-content-muted">
                Executive principles displayed on the About Me page.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                const newVal: ProfessionalValue = {
                  title: "New Value",
                  description: "Description of this professional principle.",
                  strengthContext: "Application context",
                };
                setValues([...values, newVal]);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-accent-emerald bg-accent-emerald/10 hover:bg-accent-emerald/20 border border-accent-emerald/30 transition-colors"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Value</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {values.map((v, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-background-secondary border border-border-subtle space-y-2.5 relative"
              >
                <button
                  type="button"
                  onClick={() => setValues(values.filter((_, i) => i !== idx))}
                  className="absolute top-3 right-3 p-1 rounded-md text-content-muted hover:text-red-400 hover:bg-red-950/40 transition-colors"
                  title="Delete value"
                >
                  <Trash2 className="h-4 w-4" />
                </button>

                <div className="pr-6">
                  <label className="text-[10px] font-semibold text-content-muted uppercase">Principle Title</label>
                  <input
                    type="text"
                    value={v.title}
                    onChange={(e) => {
                      const copy = [...values];
                      copy[idx].title = e.target.value;
                      setValues(copy);
                    }}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-surface border border-border-muted text-xs text-content-primary font-bold"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-semibold text-content-muted uppercase">Description</label>
                  <textarea
                    rows={2}
                    value={v.description}
                    onChange={(e) => {
                      const copy = [...values];
                      copy[idx].description = e.target.value;
                      setValues(copy);
                    }}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-surface border border-border-muted text-xs text-content-secondary leading-relaxed"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-semibold text-content-muted uppercase">Strength / Context</label>
                  <input
                    type="text"
                    value={v.strengthContext}
                    onChange={(e) => {
                      const copy = [...values];
                      copy[idx].strengthContext = e.target.value;
                      setValues(copy);
                    }}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-surface border border-border-muted text-xs text-content-muted"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: Interests */}
      {activeTab === "interests" && (
        <div className="p-6 rounded-2xl bg-surface border border-border-muted space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-content-primary">
                Technical & Domain Interests
              </h3>
              <p className="text-[11px] text-content-muted">
                Circular economy, responsible supply chain, risk compliance, business operations.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                const newInterest: ProfessionalInterest = {
                  title: "New Interest Area",
                  description: "Interest area description and application scope.",
                };
                setInterests([...interests, newInterest]);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-accent-emerald bg-accent-emerald/10 hover:bg-accent-emerald/20 border border-accent-emerald/30 transition-colors"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Interest</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {interests.map((it, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-background-secondary border border-border-subtle space-y-2.5 relative"
              >
                <button
                  type="button"
                  onClick={() => setInterests(interests.filter((_, i) => i !== idx))}
                  className="absolute top-3 right-3 p-1 rounded-md text-content-muted hover:text-red-400 hover:bg-red-950/40 transition-colors"
                  title="Delete interest"
                >
                  <Trash2 className="h-4 w-4" />
                </button>

                <div className="pr-6">
                  <label className="text-[10px] font-semibold text-content-muted uppercase">Interest Area</label>
                  <input
                    type="text"
                    value={it.title}
                    onChange={(e) => {
                      const copy = [...interests];
                      copy[idx].title = e.target.value;
                      setInterests(copy);
                    }}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-surface border border-border-muted text-xs text-content-primary font-bold"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-semibold text-content-muted uppercase">Description</label>
                  <textarea
                    rows={2}
                    value={it.description}
                    onChange={(e) => {
                      const copy = [...interests];
                      copy[idx].description = e.target.value;
                      setInterests(copy);
                    }}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-surface border border-border-muted text-xs text-content-secondary leading-relaxed"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

