"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Github, ExternalLink, Sparkles, CheckCircle2, FolderGit2 } from "lucide-react";
import { ProjectItem, ProjectCategory } from "@/types/portfolio";
import { ProjectVisual } from "@/components/home/ProjectVisual";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProjectGalleryProps {
  projects: ProjectItem[];
}

export const ProjectGallery: React.FC<ProjectGalleryProps> = ({ projects }) => {
  // Extract only categories that actually have projects
  const activeCategories: ProjectCategory[] = Array.from(
    new Set(projects.map((p) => p.category))
  );

  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <div className="w-full">
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        <button
          onClick={() => setSelectedCategory("All")}
          className={cn(
            "px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-all duration-200 cursor-pointer border",
            selectedCategory === "All"
              ? "bg-accent-emerald text-background border-accent-emerald shadow-emerald-subtle scale-105"
              : "bg-surface/80 text-content-secondary border-border-muted hover:border-accent-emerald/40 hover:text-content-primary"
          )}
        >
          All Projects ({projects.length})
        </button>

        {activeCategories.map((category) => {
          const count = projects.filter((p) => p.category === category).length;
          const isSelected = selectedCategory === category;

          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-all duration-200 cursor-pointer border",
                isSelected
                  ? "bg-accent-emerald text-background border-accent-emerald shadow-emerald-subtle scale-105"
                  : "bg-surface/80 text-content-secondary border-border-muted hover:border-accent-emerald/40 hover:text-content-primary"
              )}
            >
              {category} ({count})
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
      >
        <AnimatePresence>
          {filteredProjects.map((project) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              key={project.id}
              className="group rounded-2xl bg-background-secondary/90 border border-border-muted p-6 sm:p-7 flex flex-col justify-between transition-colors duration-300 hover:border-accent-emerald/40 hover:shadow-card-hover-glow h-full"
            >
              <div>
                {/* Visual Engineering Thumbnail */}
                <ProjectVisual
                  type={project.visualType || "circular"}
                  className="mb-5 group-hover:border-accent-emerald/30 transition-colors"
                />

                {/* Header Row: Category & Status */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent-emerald-light bg-accent-emerald/10 border border-accent-emerald/20 px-2.5 py-0.5 rounded-md">
                    {project.category}
                  </span>

                  {project.isPlaceholderDetails && (
                    <span className="text-[10px] font-mono text-accent-gold-light bg-accent-gold/10 px-2 py-0.5 rounded border border-accent-gold/20">
                      Editable via Admin
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-content-primary mb-2.5 group-hover:text-accent-emerald-light transition-colors leading-snug">
                  {project.title}
                </h3>

                {/* Short Description */}
                <p className="text-xs sm:text-sm text-content-secondary leading-relaxed mb-4">
                  {project.summary}
                </p>

                {/* Key Contributions */}
                {project.keyContributions && project.keyContributions.length > 0 && (
                  <div className="mb-4 pt-3 border-t border-border-muted/50">
                    <span className="text-[11px] font-mono text-content-muted uppercase tracking-wider block mb-2 font-semibold">
                      Key Contributions:
                    </span>
                    <ul className="space-y-1.5">
                      {project.keyContributions.slice(0, 2).map((item, idx) => (
                        <li
                          key={idx}
                          className="text-xs text-content-secondary flex items-start gap-2"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5 text-accent-gold flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div>
                {/* Technologies Used */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border-muted/40 mb-5">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono text-content-muted bg-surface px-2 py-0.5 rounded border border-border-muted/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Links Row */}
                <div className="flex items-center justify-between pt-3 border-t border-border-muted/50">
                  <Link
                    href={`/projects/${project.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-emerald hover:text-accent-emerald-light transition-colors group-hover:translate-x-1 duration-200"
                  >
                    <span>View Project Details</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>

                  {/* GitHub or Live Demo links (ONLY rendered when legitimately available) */}
                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-surface hover:text-accent-emerald text-content-muted transition-colors border border-border-muted"
                        title="GitHub Repository"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                    {project.liveDemoUrl && (
                      <a
                        href={project.liveDemoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-surface hover:text-accent-emerald text-content-muted transition-colors border border-border-muted"
                        title="Live Demonstration"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

