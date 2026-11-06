"use client";

import React, { useState } from "react";
import {
  Wrench,
  Plus,
  Trash2,
  Save,
  Check,
  Layers,
  Sparkles,
} from "lucide-react";
import { SkillCategory, SkillItem } from "@/types/portfolio";

interface AdminSkillsViewProps {
  categories: SkillCategory[];
  onSaveSkills: (updated: SkillCategory[]) => Promise<void>;
  onConfirmDelete: (title: string, onConfirm: () => void) => void;
}

const PROFICIENCIES = [
  "Fundamental",
  "Basic",
  "Working Knowledge",
  "Proficient",
  "Advanced",
] as const;

export function AdminSkillsView({
  categories: initialCategories,
  onSaveSkills,
  onConfirmDelete,
}: AdminSkillsViewProps) {
  const [categories, setCategories] = useState<SkillCategory[]>([...initialCategories]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleAddCategory = () => {
    const newCat: SkillCategory = {
      id: `cat-${Date.now()}`,
      categoryName: "New Technical Domain",
      description: "Description of competencies within this group.",
      skills: [
        {
          name: "Skill 1",
          proficiencyLevel: "Basic",
          note: "Contextual note",
          verified: true,
        },
      ],
    };
    setCategories([...categories, newCat]);
  };

  const handleDeleteCategory = (catIndex: number) => {
    const cat = categories[catIndex];
    onConfirmDelete(`Delete category "${cat.categoryName}" and all its skills?`, () => {
      const updated = categories.filter((_, i) => i !== catIndex);
      setCategories(updated);
    });
  };

  const handleAddSkill = (catIndex: number) => {
    const copy = [...categories];
    copy[catIndex].skills.push({
      name: "New Skill",
      proficiencyLevel: "Basic",
      note: "",
      verified: true,
    });
    setCategories(copy);
  };

  const handleDeleteSkill = (catIndex: number, skillIndex: number) => {
    const copy = [...categories];
    copy[catIndex].skills = copy[catIndex].skills.filter((_, i) => i !== skillIndex);
    setCategories(copy);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSaveSkills(categories);
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
            <Wrench className="h-5 w-5 text-accent-emerald" />
            Skills & Competencies Manager
          </h2>
          <p className="text-xs text-content-secondary mt-0.5">
            Organize verified software competencies, data tools, and project management applications.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleAddCategory}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-content-primary bg-background-secondary hover:bg-background-tertiary border border-border-muted transition-colors"
          >
            <Plus className="h-4 w-4 text-accent-emerald" />
            <span>Add Category</span>
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
              <Save className="h-4 w-4" />
            )}
            <span>{saveSuccess ? "Skills Saved!" : isSaving ? "Saving..." : "Save Skills"}</span>
          </button>
        </div>
      </div>

      {/* Category Accordion / Cards */}
      <div className="space-y-6">
        {categories.map((cat, catIdx) => (
          <div
            key={cat.id || catIdx}
            className="p-6 rounded-2xl bg-surface border border-border-muted space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border-subtle">
              <div className="flex-1 max-w-md">
                <input
                  type="text"
                  value={cat.categoryName}
                  onChange={(e) => {
                    const copy = [...categories];
                    copy[catIdx].categoryName = e.target.value;
                    setCategories(copy);
                  }}
                  className="px-2.5 py-1.5 rounded-lg bg-background-secondary border border-border-muted text-sm font-bold text-content-primary w-full focus:border-accent-emerald outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleAddSkill(catIdx)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-accent-emerald bg-accent-emerald/10 hover:bg-accent-emerald/20 transition-colors"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add Skill</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDeleteCategory(catIdx)}
                  className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-950/40 text-xs transition-colors"
                  title="Delete category"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Skills items grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {cat.skills.map((skill, sIdx) => (
                <div
                  key={sIdx}
                  className="p-3.5 rounded-xl bg-background-secondary border border-border-subtle flex items-start justify-between gap-3"
                >
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={skill.name}
                        onChange={(e) => {
                          const copy = [...categories];
                          copy[catIdx].skills[sIdx].name = e.target.value;
                          setCategories(copy);
                        }}
                        className="px-2 py-1 rounded bg-surface border border-border-muted text-xs font-semibold text-content-primary flex-1 focus:border-accent-emerald outline-none"
                        placeholder="Skill Name"
                      />

                      <select
                        value={skill.proficiencyLevel || "Basic"}
                        onChange={(e) => {
                          const copy = [...categories];
                          copy[catIdx].skills[sIdx].proficiencyLevel = e.target.value as any;
                          setCategories(copy);
                        }}
                        className="px-2 py-1 rounded bg-surface border border-border-muted text-[11px] text-accent-emerald-light outline-none"
                      >
                        {PROFICIENCIES.map((p) => (
                          <option key={p} value={p}>
                            {p}
                          </option>
                        ))}
                      </select>
                    </div>

                    <input
                      type="text"
                      value={skill.note || ""}
                      onChange={(e) => {
                        const copy = [...categories];
                        copy[catIdx].skills[sIdx].note = e.target.value;
                        setCategories(copy);
                      }}
                      placeholder="Optional context note (e.g. Basic / Ongoing)"
                      className="w-full px-2 py-1 rounded bg-surface border border-border-muted text-[11px] text-content-muted focus:border-accent-emerald outline-none"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDeleteSkill(catIdx, sIdx)}
                    className="p-1 rounded text-content-muted hover:text-red-400 hover:bg-red-950/40 transition-colors"
                    title="Remove skill"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

