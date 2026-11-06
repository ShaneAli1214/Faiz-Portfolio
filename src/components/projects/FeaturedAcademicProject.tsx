"use client";

import React from "react";
import Link from "next/link";
import { Award, ArrowRight, ShieldCheck, Sparkles, GraduationCap, CheckCircle2 } from "lucide-react";
import { ProjectItem } from "@/types/portfolio";
import { ProjectVisual } from "@/components/home/ProjectVisual";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { motion } from "framer-motion";

interface FeaturedAcademicProjectProps {
  project: ProjectItem;
}

export const FeaturedAcademicProject: React.FC<FeaturedAcademicProjectProps> = ({
  project,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative rounded-2xl bg-gradient-to-br from-surface via-background-secondary to-[#0c1622] border border-accent-gold/40 p-8 sm:p-10 lg:p-12 shadow-card-elevation overflow-hidden group hover:border-accent-gold/70 transition-all duration-300"
    >
      {/* Ambient Pulsing Glow Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-gold/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

      {/* Top Banner Ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-8 pb-4 border-b border-border-muted/60 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-accent-gold-light bg-accent-gold/10 border border-accent-gold/30">
          <Award className="h-4 w-4 text-accent-gold" />
          <span>Featured Academic Honor • Rector&apos;s Gold Medal Winner</span>
        </div>

        <span className="text-xs font-mono text-content-muted">
          Alma Mater: National University of Sciences and Technology (NUST)
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
        {/* Left Column: Information */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <GraduationCap className="h-4 w-4 text-accent-emerald" />
              <span className="text-xs font-semibold uppercase tracking-wider text-accent-emerald-light">
                {project.category}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-content-primary tracking-tight leading-tight group-hover:text-accent-gold-light transition-colors">
              {project.title}
            </h3>

            <p className="mt-4 text-sm sm:text-base text-content-secondary leading-relaxed">
              {project.description || project.summary}
            </p>

            {/* Clear Placeholder Notice for Non-Invention Compliance */}
            {project.isPlaceholderDetails && (
              <div className="mt-4 p-3.5 rounded-lg bg-surface/80 border border-accent-gold/25 text-xs text-content-secondary flex items-start gap-2.5">
                <Sparkles className="h-4 w-4 text-accent-gold flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-accent-gold-light block mb-0.5">
                    Verified Award • Documentation Status:
                  </span>
                  <span>
                    Awarded Rector&apos;s Gold Medal for best Final Year Project in Chemical
                    Engineering at NUST. Specific technical parameters, equipment design sheets,
                    and simulation models are customizable placeholders ready to be updated through
                    the Admin Panel.
                  </span>
                </div>
              </div>
            )}

            {/* Key Contributions List */}
            {project.keyContributions && (
              <ul className="mt-6 space-y-2">
                {project.keyContributions.map((item, idx) => (
                  <li
                    key={idx}
                    className="text-xs sm:text-sm text-content-secondary flex items-start gap-2.5"
                  >
                    <CheckCircle2 className="h-4 w-4 text-accent-emerald flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Action Row */}
          <div className="mt-8 pt-6 border-t border-border-muted/50 flex flex-wrap items-center gap-4">
            <PrimaryButton
              href={`/projects/${project.id}`}
              variant="gold"
              size="md"
              icon={<ArrowRight className="h-4 w-4" />}
            >
              View Project Specification
            </PrimaryButton>

            <span className="text-xs font-mono text-content-muted">
              BE Chemical Engineering • CGPA 3.53
            </span>
          </div>
        </div>

        {/* Right Column: Visual Schematic */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <div className="rounded-xl p-2 bg-surface/60 border border-border-muted shadow-lg">
            <ProjectVisual
              type={project.visualType || "gold-medal"}
              className="h-56 sm:h-64"
            />
          </div>

          {/* Tech Pills */}
          <div className="flex flex-wrap gap-1.5 mt-4 justify-center">
            {project.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="text-[11px] font-mono text-content-secondary bg-surface px-2.5 py-1 rounded border border-border-muted"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

