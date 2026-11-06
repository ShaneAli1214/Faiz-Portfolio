"use client";

import React, { useState } from "react";
import {
  FolderGit2,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Star,
  Check,
  Save,
  X,
  ExternalLink,
  Sparkles,
  Layers,
} from "lucide-react";
import { ProjectItem, ProjectCategory } from "@/types/portfolio";

interface AdminProjectsViewProps {
  projects: ProjectItem[];
  onSaveProjects: (updatedProjects: ProjectItem[]) => Promise<void>;
  onConfirmDelete: (title: string, onConfirm: () => void) => void;
}

const CATEGORIES: ProjectCategory[] = [
  "Academic Projects",
  "Engineering & Industrial",
  "Sustainability",
  "Data & Analytics",
  "Other Projects",
];

export function AdminProjectsView({
  projects: initialProjects,
  onSaveProjects,
  onConfirmDelete,
}: AdminProjectsViewProps) {
  const [projects, setProjects] = useState<ProjectItem[]>([...initialProjects]);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [isNewProject, setIsNewProject] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Helper to open create modal
  const handleAddNew = () => {
    const newId = `project-${Date.now()}`;
    const newProj: ProjectItem = {
      id: newId,
      title: "New Engineering Project",
      category: "Engineering & Industrial",
      summary: "Short project summary and problem scope.",
      description: "Comprehensive technical implementation description.",
      technologies: ["Engineering", "Analysis"],
      keyContributions: ["Analyzed engineering requirements", "Optimized process efficiency"],
      outcomes: ["Improved operational metrics"],
      visibility: true,
      verified: true,
      isFeaturedAcademic: false,
    };
    setEditingProject(newProj);
    setIsNewProject(true);
  };

  const handleEdit = (project: ProjectItem) => {
    setEditingProject({ ...project });
    setIsNewProject(false);
  };

  const handleModalSave = async () => {
    if (!editingProject) return;

    let updatedList: ProjectItem[];
    if (isNewProject) {
      updatedList = [editingProject, ...projects];
    } else {
      updatedList = projects.map((p) => (p.id === editingProject.id ? editingProject : p));
    }

    setProjects(updatedList);
    setEditingProject(null);
    setIsNewProject(false);

    setIsSaving(true);
    try {
      await onSaveProjects(updatedList);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = (project: ProjectItem) => {
    onConfirmDelete(`Delete "${project.title}" permanently?`, async () => {
      const updatedList = projects.filter((p) => p.id !== project.id);
      setProjects(updatedList);
      await onSaveProjects(updatedList);
    });
  };

  const handleToggleVisibility = async (id: string) => {
    const updated = projects.map((p) => (p.id === id ? { ...p, visibility: !p.visibility } : p));
    setProjects(updated);
    await onSaveProjects(updated);
  };

  const handleToggleFeatured = async (id: string) => {
    const updated = projects.map((p) =>
      p.id === id ? { ...p, isFeaturedAcademic: !p.isFeaturedAcademic } : p
    );
    setProjects(updated);
    await onSaveProjects(updated);
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-surface border border-border-muted">
        <div>
          <h2 className="text-base font-bold text-content-primary flex items-center gap-2">
            <FolderGit2 className="h-5 w-5 text-accent-emerald" />
            Projects & Technical Work Manager
          </h2>
          <p className="text-xs text-content-secondary mt-0.5">
            Manage your engineering case studies, academic capstone, and industrial frameworks.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddNew}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-background bg-accent-emerald hover:bg-accent-emerald-dark transition-all shadow-lg shadow-accent-emerald/20"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Projects List Table / Cards */}
      <div className="grid grid-cols-1 gap-3">
        {projects.map((project) => (
          <div
            key={project.id}
            className={`p-5 rounded-2xl bg-surface border transition-all ${
              project.isFeaturedAcademic
                ? "border-accent-gold/40 shadow-gold-subtle/10"
                : "border-border-muted hover:border-accent-emerald/30"
            } flex flex-col md:flex-row md:items-center justify-between gap-4`}
          >
            <div className="space-y-2 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-background-secondary border border-border-subtle text-accent-emerald-light">
                  {project.category}
                </span>

                {project.isFeaturedAcademic && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-accent-gold/20 border border-accent-gold/40 text-accent-gold-light flex items-center gap-1">
                    <Star className="h-3 w-3 fill-accent-gold text-accent-gold" />
                    Rector&apos;s Gold Medal Project
                  </span>
                )}

                {!project.visibility && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-950/40 border border-red-500/30 text-red-300">
                    Draft / Hidden
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-sm font-bold text-content-primary">
                  {project.title}
                </h3>
                <p className="text-xs text-content-secondary line-clamp-2 mt-0.5">
                  {project.summary}
                </p>
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.technologies.slice(0, 5).map((tech, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-background-secondary text-content-muted"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 5 && (
                  <span className="text-[10px] text-content-muted font-mono self-center">
                    +{project.technologies.length - 5} more
                  </span>
                )}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2 self-end md:self-auto border-t md:border-t-0 pt-3 md:pt-0 border-border-subtle w-full md:w-auto justify-end">
              <button
                type="button"
                onClick={() => handleToggleFeatured(project.id)}
                className={`p-2 rounded-xl text-xs transition-colors ${
                  project.isFeaturedAcademic
                    ? "text-accent-gold bg-accent-gold/10"
                    : "text-content-muted hover:text-content-primary hover:bg-surface-hover"
                }`}
                title={project.isFeaturedAcademic ? "Remove Gold Medal highlight" : "Mark as Gold Medal highlight"}
              >
                <Star className={`h-4 w-4 ${project.isFeaturedAcademic ? "fill-accent-gold" : ""}`} />
              </button>

              <button
                type="button"
                onClick={() => handleToggleVisibility(project.id)}
                className="p-2 rounded-xl text-content-muted hover:text-content-primary hover:bg-surface-hover text-xs transition-colors"
                title={project.visibility ? "Hide from public view" : "Make visible publicly"}
              >
                {project.visibility ? <Eye className="h-4 w-4 text-accent-emerald" /> : <EyeOff className="h-4 w-4" />}
              </button>

              <button
                type="button"
                onClick={() => handleEdit(project)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-content-primary bg-background-secondary hover:bg-background-tertiary border border-border-muted transition-colors"
              >
                <Edit2 className="h-3.5 w-3.5 text-accent-emerald" />
                <span>Edit</span>
              </button>

              <button
                type="button"
                onClick={() => handleDelete(project)}
                className="p-2 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-950/40 border border-red-500/20 text-xs transition-colors"
                title="Delete project"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Project Editor Modal */}
      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-fade-in-up overflow-y-auto">
          <div className="w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl bg-surface border border-border-muted shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="p-5 border-b border-border-muted flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-content-primary">
                  {isNewProject ? "Create New Project" : "Edit Project Details"}
                </h3>
                <p className="text-xs text-content-secondary">
                  Configure technical case study parameters, technologies, and outcomes.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEditingProject(null)}
                className="p-2 rounded-xl text-content-muted hover:text-content-primary hover:bg-surface-hover transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-4 flex-1 custom-scrollbar">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-semibold uppercase text-content-secondary mb-1">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    value={editingProject.title}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-background-secondary border border-border-muted focus:border-accent-emerald outline-none text-xs text-content-primary font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold uppercase text-content-secondary mb-1">
                    Category *
                  </label>
                  <select
                    value={editingProject.category}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, category: e.target.value as ProjectCategory })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-background-secondary border border-border-muted focus:border-accent-emerald outline-none text-xs text-content-primary"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-semibold uppercase text-content-secondary mb-1">
                  Card Summary (Short introduction) *
                </label>
                <textarea
                  rows={2}
                  value={editingProject.summary}
                  onChange={(e) => setEditingProject({ ...editingProject, summary: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-background-secondary border border-border-muted focus:border-accent-emerald outline-none text-xs text-content-primary leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold uppercase text-content-secondary mb-1">
                  Comprehensive Description (Project Details Page)
                </label>
                <textarea
                  rows={4}
                  value={editingProject.description || ""}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-background-secondary border border-border-muted focus:border-accent-emerald outline-none text-xs text-content-primary leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold uppercase text-content-secondary mb-1">
                  Technologies Applied (Comma-separated)
                </label>
                <input
                  type="text"
                  value={editingProject.technologies.join(", ")}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      technologies: e.target.value.split(",").map((t) => t.trim()).filter(Boolean),
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-background-secondary border border-border-muted focus:border-accent-emerald outline-none text-xs text-content-primary font-mono"
                  placeholder="e.g. Primavera P6, Process Simulation, Mass Balance, SAP PS"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-semibold uppercase text-content-secondary mb-1">
                    Live Demo / Report URL
                  </label>
                  <input
                    type="text"
                    value={editingProject.liveDemoUrl || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, liveDemoUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3 py-2 rounded-xl bg-background-secondary border border-border-muted focus:border-accent-emerald outline-none text-xs text-content-primary"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold uppercase text-content-secondary mb-1">
                    GitHub / Code Repository URL
                  </label>
                  <input
                    type="text"
                    value={editingProject.githubUrl || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full px-3 py-2 rounded-xl bg-background-secondary border border-border-muted focus:border-accent-emerald outline-none text-xs text-content-primary"
                  />
                </div>
              </div>

              {/* Toggles */}
              <div className="pt-2 border-t border-border-subtle flex flex-wrap gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProject.isFeaturedAcademic || false}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, isFeaturedAcademic: e.target.checked })
                    }
                    className="rounded accent-accent-gold"
                  />
                  <span className="text-xs text-content-primary font-semibold flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 text-accent-gold" />
                    Feature as Rector&apos;s Gold Medal Project
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProject.visibility}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, visibility: e.target.checked })
                    }
                    className="rounded accent-accent-emerald"
                  />
                  <span className="text-xs text-content-primary">
                    Visible on Public Site
                  </span>
                </label>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-border-muted flex items-center justify-end gap-3 bg-surface">
              <button
                type="button"
                onClick={() => setEditingProject(null)}
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
                <span>{isSaving ? "Saving..." : "Save Project"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

