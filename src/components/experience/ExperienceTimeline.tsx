"use client";

import React, { useState } from "react";
import { ExperienceItem } from "@/types/portfolio";
import {
  Calendar,
  Building2,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Sparkles,
  Layers,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ExperienceTimelineProps {
  experiences: ExperienceItem[];
}

export const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({
  experiences,
}) => {
  // Store expanded state per experience ID. By default, first two are expanded.
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({
    "exp-packages": true,
    "exp-descon": true,
  });

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAll = () => {
    const allExpanded = experiences.reduce((acc, exp) => {
      acc[exp.id] = true;
      return acc;
    }, {} as Record<string, boolean>);
    setExpandedIds(allExpanded);
  };

  const collapseAll = () => {
    setExpandedIds({});
  };

  return (
    <div className="w-full">
      {/* Controls Bar */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-border-muted/60 text-xs font-mono text-content-muted">
        <span>5 Verified Engineering &amp; Operations Roles</span>
        <div className="flex items-center gap-3">
          <button
            onClick={expandAll}
            className="hover:text-accent-emerald transition-colors underline cursor-pointer"
          >
            Expand All
          </button>
          <span>•</span>
          <button
            onClick={collapseAll}
            className="hover:text-accent-emerald transition-colors underline cursor-pointer"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* Vertical Timeline */}
      <div className="relative pl-6 sm:pl-8 lg:pl-10 border-l-2 border-border-muted/70 space-y-12">
        {experiences.map((exp, index) => {
          const isExpanded = !!expandedIds[exp.id];
          const hasManyResponsibilities = exp.responsibilities.length > 3;
          const visibleResponsibilities = isExpanded
            ? exp.responsibilities
            : exp.responsibilities.slice(0, 3);

          return (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              className="relative group"
            >
              {/* Timeline Node Dot */}
              <div
                className={cn(
                  "absolute -left-[31px] sm:-left-[39px] lg:-left-[47px] top-2 h-4 w-4 rounded-full border-2 bg-background transition-transform duration-300 group-hover:scale-125 z-10",
                  exp.isCurrent
                    ? "border-accent-emerald bg-accent-emerald shadow-emerald-subtle"
                    : "border-accent-gold"
                )}
                aria-hidden="true"
              >
                {exp.isCurrent && (
                  <span className="absolute -inset-1 rounded-full bg-accent-emerald/40 animate-ping" />
                )}
              </div>

              {/* Experience Card */}
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
                className={cn(
                  "rounded-2xl bg-background-secondary/90 border border-border-muted p-6 sm:p-8 transition-colors duration-300 hover:border-accent-emerald/40 hover:shadow-card-hover-glow",
                  exp.isCurrent && "border-accent-emerald/30 shadow-emerald-subtle"
                )}
              >
                {/* Header row: Logo badge, title, company, dates */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                  <div className="flex items-start gap-4">
                    {/* Text-based corporate monogram logo badge */}
                    <div
                      className={cn(
                        "h-12 w-12 rounded-xl flex-shrink-0 flex items-center justify-center font-mono font-bold text-sm border shadow-sm transition-transform duration-200 group-hover:scale-105",
                        exp.isCurrent
                          ? "bg-accent-emerald/15 border-accent-emerald/40 text-accent-emerald-light"
                          : "bg-surface border-border-muted text-content-primary"
                      )}
                    >
                      {exp.companyAcronym || exp.company.substring(0, 3).toUpperCase()}
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-accent-gold-light">
                          {exp.company}
                        </span>
                        {exp.isCurrent && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-accent-emerald bg-accent-emerald/10 border border-accent-emerald/30 px-2 py-0.5 rounded-full font-bold">
                            <span className="h-1.5 w-1.5 rounded-full bg-accent-emerald animate-pulse" />
                            Current Role
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl sm:text-2xl font-extrabold text-content-primary tracking-tight">
                        {exp.role}
                      </h3>

                      {exp.department && (
                        <p className="text-xs font-mono text-content-muted mt-1">
                          Department:{" "}
                          <span className="text-content-secondary font-medium">
                            {exp.department}
                          </span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Duration Badge */}
                  <div className="inline-flex items-center gap-1.5 self-start px-3 py-1.5 rounded-lg bg-surface border border-border-muted text-xs font-mono font-semibold text-content-primary">
                    <Calendar className="h-3.5 w-3.5 text-accent-emerald" />
                    <span>{exp.duration}</span>
                  </div>
                </div>

                {/* Key Metric Banner */}
                {exp.keyMetric && (
                  <div className="mb-6 p-3 rounded-lg bg-surface/70 border border-border-muted/80 flex items-center gap-2.5 text-xs text-content-secondary">
                    <Sparkles className="h-4 w-4 text-accent-gold flex-shrink-0" />
                    <span className="font-semibold text-content-primary">
                      Key Milestone:
                    </span>
                    <span>{exp.keyMetric}</span>
                  </div>
                )}

                {/* Responsibilities list with animated expansion */}
                <div className="space-y-3 mb-6">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-content-muted font-semibold">
                    Core Operational &amp; Engineering Responsibilities:
                  </h4>

                  <ul className="space-y-2.5">
                    {visibleResponsibilities.map((resp, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: idx * 0.04 }}
                        className="text-sm text-content-secondary flex items-start gap-3 leading-relaxed"
                      >
                        <CheckCircle2 className="h-4 w-4 text-accent-emerald flex-shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Expand / Collapse Button if more than 3 responsibilities */}
                  {hasManyResponsibilities && (
                    <button
                      onClick={() => toggleExpand(exp.id)}
                      className="mt-3 inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-accent-emerald hover:text-accent-emerald-light transition-colors py-1 focus:outline-none cursor-pointer"
                    >
                      {isExpanded ? (
                        <>
                          <ChevronUp className="h-3.5 w-3.5" />
                          <span>Show Less Responsibilities</span>
                        </>
                      ) : (
                        <>
                          <ChevronDown className="h-3.5 w-3.5" />
                          <span>
                            View All {exp.responsibilities.length} Responsibilities (+
                            {exp.responsibilities.length - 3} more)
                          </span>
                        </>
                      )}
                    </button>
                  )}
                </div>

                {/* Skills Applied section */}
                {exp.skillsApplied && exp.skillsApplied.length > 0 && (
                  <div className="pt-4 border-t border-border-muted/60">
                    <div className="flex items-center gap-1.5 mb-2.5 text-xs font-mono text-content-muted">
                      <Layers className="h-3.5 w-3.5 text-accent-gold" />
                      <span>Skills Applied:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {exp.skillsApplied.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-xs font-mono font-medium text-content-primary bg-surface/90 border border-border-muted px-2.5 py-1 rounded-md transition-all duration-200 hover:border-accent-emerald/50 hover:text-accent-emerald-light hover:scale-105"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
