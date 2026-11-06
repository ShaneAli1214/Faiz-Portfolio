"use client";

import React, { useState } from "react";
import {
  Briefcase,
  Plus,
  Edit2,
  Trash2,
  Save,
  Check,
  X,
  ArrowUp,
  ArrowDown,
  Building,
  CheckCircle2,
} from "lucide-react";
import { ExperienceItem } from "@/types/portfolio";

interface AdminExperienceViewProps {
  experienceList: ExperienceItem[];
  onSaveExperience: (updatedList: ExperienceItem[]) => Promise<void>;
  onConfirmDelete: (title: string, onConfirm: () => void) => void;
}

export function AdminExperienceView({
  experienceList: initialList,
  onSaveExperience,
  onConfirmDelete,
}: AdminExperienceViewProps) {
  const [list, setList] = useState<ExperienceItem[]>([...initialList]);
  const [editingItem, setEditingItem] = useState<ExperienceItem | null>(null);
  const [isNewItem, setIsNewItem] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleAddNew = () => {
    const newItem: ExperienceItem = {
      id: `exp-${Date.now()}`,
      company: "New Organization",
      role: "Engineering & Operations Role",
      duration: "Duration (e.g. July 2026 – Present)",
      location: "Location",
      responsibilities: ["Key responsibility or contribution bullet point."],
      skillsApplied: ["Sustainability", "Operations"],
      verified: true,
      isCurrent: false,
    };
    setEditingItem(newItem);
    setIsNewItem(true);
  };

  const handleEdit = (item: ExperienceItem) => {
    setEditingItem({ ...item, responsibilities: [...item.responsibilities] });
    setIsNewItem(false);
  };

  const handleMove = async (index: number, direction: "up" | "down") => {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === list.length - 1) return;

    const targetIndex = direction === "up" ? index - 1 : index + 1;
    const updated = [...list];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, moved);

    setList(updated);
    await onSaveExperience(updated);
  };

  const handleDelete = (item: ExperienceItem) => {
    onConfirmDelete(`Delete experience at "${item.company}"?`, async () => {
      const updated = list.filter((i) => i.id !== item.id);
      setList(updated);
      await onSaveExperience(updated);
    });
  };

  const handleModalSave = async () => {
    if (!editingItem) return;

    let updated: ExperienceItem[];
    if (isNewItem) {
      updated = [editingItem, ...list];
    } else {
      updated = list.map((item) => (item.id === editingItem.id ? editingItem : item));
    }

    setList(updated);
    setEditingItem(null);
    setIsNewItem(false);

    setIsSaving(true);
    try {
      await onSaveExperience(updated);
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
            <Briefcase className="h-5 w-5 text-accent-emerald" />
            Professional Experience Manager
          </h2>
          <p className="text-xs text-content-secondary mt-0.5">
            Manage your verified corporate roles, responsibilities, and operational accomplishments.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddNew}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-background bg-accent-emerald hover:bg-accent-emerald-dark transition-all shadow-lg shadow-accent-emerald/20"
        >
          <Plus className="h-4 w-4" />
          <span>Add Position</span>
        </button>
      </div>

      {/* Experience List */}
      <div className="space-y-3">
        {list.map((item, idx) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-surface border border-border-muted hover:border-accent-emerald/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-1.5 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono font-bold text-accent-emerald-light bg-accent-emerald/10 px-2.5 py-0.5 rounded-full border border-accent-emerald/20">
                  {item.duration}
                </span>
                {item.isCurrent && (
                  <span className="text-[10px] font-bold text-accent-gold-light bg-accent-gold/20 px-2 py-0.5 rounded-full">
                    Current Position
                  </span>
                )}
                {item.location && (
                  <span className="text-xs text-content-muted">
                    • {item.location}
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-sm font-bold text-content-primary">
                  {item.role}
                </h3>
                <p className="text-xs font-semibold text-content-secondary flex items-center gap-1.5">
                  <Building className="h-3.5 w-3.5 text-accent-gold" />
                  {item.company}
                </p>
              </div>

              <p className="text-xs text-content-muted">
                {item.responsibilities.length} verified responsibilities listed
              </p>
            </div>

            <div className="flex items-center gap-1.5 self-end md:self-auto border-t md:border-t-0 pt-3 md:pt-0 border-border-subtle w-full md:w-auto justify-end">
              <button
                type="button"
                onClick={() => handleMove(idx, "up")}
                disabled={idx === 0}
                className="p-2 rounded-xl text-content-muted hover:text-content-primary hover:bg-surface-hover text-xs transition-colors disabled:opacity-20"
                title="Move up"
              >
                <ArrowUp className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => handleMove(idx, "down")}
                disabled={idx === list.length - 1}
                className="p-2 rounded-xl text-content-muted hover:text-content-primary hover:bg-surface-hover text-xs transition-colors disabled:opacity-20"
                title="Move down"
              >
                <ArrowDown className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => handleEdit(item)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-content-primary bg-background-secondary hover:bg-background-tertiary border border-border-muted transition-colors ml-2"
              >
                <Edit2 className="h-3.5 w-3.5 text-accent-emerald" />
                <span>Edit</span>
              </button>

              <button
                type="button"
                onClick={() => handleDelete(item)}
                className="p-2 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-950/40 border border-red-500/20 text-xs transition-colors"
                title="Delete position"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Experience Editor Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-fade-in-up overflow-y-auto">
          <div className="w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl bg-surface border border-border-muted shadow-2xl overflow-hidden">
            <div className="p-5 border-b border-border-muted flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-content-primary">
                  {isNewItem ? "Add Professional Position" : "Edit Position Details"}
                </h3>
                <p className="text-xs text-content-secondary">
                  Update role responsibilities, company name, and applied competencies.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="p-2 rounded-xl text-content-muted hover:text-content-primary hover:bg-surface-hover transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 flex-1 custom-scrollbar">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-semibold uppercase text-content-secondary mb-1">
                    Role / Position Title *
                  </label>
                  <input
                    type="text"
                    value={editingItem.role}
                    onChange={(e) => setEditingItem({ ...editingItem, role: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-background-secondary border border-border-muted focus:border-accent-emerald outline-none text-xs text-content-primary font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold uppercase text-content-secondary mb-1">
                    Company / Organization *
                  </label>
                  <input
                    type="text"
                    value={editingItem.company}
                    onChange={(e) => setEditingItem({ ...editingItem, company: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-background-secondary border border-border-muted focus:border-accent-emerald outline-none text-xs text-content-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-semibold uppercase text-content-secondary mb-1">
                    Duration / Dates *
                  </label>
                  <input
                    type="text"
                    value={editingItem.duration}
                    onChange={(e) => setEditingItem({ ...editingItem, duration: e.target.value })}
                    placeholder="July 2026 – Present"
                    className="w-full px-3 py-2 rounded-xl bg-background-secondary border border-border-muted focus:border-accent-emerald outline-none text-xs text-content-primary"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold uppercase text-content-secondary mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={editingItem.location || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })}
                    placeholder="Lahore / Islamabad, Pakistan"
                    className="w-full px-3 py-2 rounded-xl bg-background-secondary border border-border-muted focus:border-accent-emerald outline-none text-xs text-content-primary"
                  />
                </div>
              </div>

              {/* Responsibilities list editor */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[10px] font-semibold uppercase text-content-secondary">
                    Key Responsibilities & Contributions ({editingItem.responsibilities.length})
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingItem({
                        ...editingItem,
                        responsibilities: [...editingItem.responsibilities, "New responsibility point"],
                      });
                    }}
                    className="text-[11px] font-semibold text-accent-emerald flex items-center gap-1 hover:underline"
                  >
                    <Plus className="h-3 w-3" />
                    <span>Add Bullet Point</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {editingItem.responsibilities.map((resp, rIdx) => (
                    <div key={rIdx} className="flex items-start gap-2">
                      <span className="text-accent-emerald text-sm leading-6">•</span>
                      <textarea
                        rows={2}
                        value={resp}
                        onChange={(e) => {
                          const copy = [...editingItem.responsibilities];
                          copy[rIdx] = e.target.value;
                          setEditingItem({ ...editingItem, responsibilities: copy });
                        }}
                        className="flex-1 px-3 py-1.5 rounded-lg bg-background-secondary border border-border-muted text-xs text-content-primary leading-relaxed"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const copy = editingItem.responsibilities.filter((_, i) => i !== rIdx);
                          setEditingItem({ ...editingItem, responsibilities: copy });
                        }}
                        className="p-1.5 text-content-muted hover:text-red-400 transition-colors"
                        title="Remove bullet"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills applied */}
              <div>
                <label className="block text-[10px] font-semibold uppercase text-content-secondary mb-1">
                  Skills Applied (Comma-separated)
                </label>
                <input
                  type="text"
                  value={editingItem.skillsApplied.join(", ")}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      skillsApplied: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-background-secondary border border-border-muted focus:border-accent-emerald outline-none text-xs text-content-primary font-mono"
                  placeholder="e.g. Circular Economy, ERP Tracking, Primavera P6"
                />
              </div>

              {/* Is Current */}
              <div className="pt-2 border-t border-border-subtle">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingItem.isCurrent || false}
                    onChange={(e) => setEditingItem({ ...editingItem, isCurrent: e.target.checked })}
                    className="rounded accent-accent-emerald"
                  />
                  <span className="text-xs text-content-primary font-medium">
                    Mark as Currently Active Position
                  </span>
                </label>
              </div>
            </div>

            <div className="p-4 border-t border-border-muted flex items-center justify-end gap-3 bg-surface">
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-content-secondary hover:text-content-primary hover:bg-surface-hover border border-border-muted transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleModalSave}
                disabled={isSaving}
                className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-semibold text-background bg-accent-emerald hover:bg-accent-emerald-dark transition-all shadow-md shadow-accent-emerald/20"
              >
                <Save className="h-3.5 w-3.5" />
                <span>{isSaving ? "Saving..." : "Save Position"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

