"use client";

import React from "react";
import { SkillCategory } from "@/types/portfolio";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  FileText,
  BarChart2,
  Cpu,
  Layers,
  CheckCircle2,
  Workflow,
  Shield,
  Activity,
  Compass,
} from "lucide-react";

interface TechnicalSkillsSectionProps {
  categories: SkillCategory[];
}

export const TechnicalSkillsSection: React.FC<TechnicalSkillsSectionProps> = ({
  categories,
}) => {
  // Helper to pick category icon
  const getCategoryIcon = (categoryName: string) => {
    switch (categoryName) {
      case "Software & Productivity":
        return <FileText className="h-5 w-5 text-accent-emerald" />;
      case "Data & Analytics":
        return <BarChart2 className="h-5 w-5 text-accent-emerald" />;
      case "Enterprise & Project Management":
        return <Workflow className="h-5 w-5 text-accent-gold" />;
      default:
        return <Layers className="h-5 w-5 text-accent-emerald-light" />;
    }
  };

  return (
    <section className="space-y-8">
      <FadeIn direction="up">
        <SectionHeading
          badge="Verified Tools & Systems"
          title="Technical Skills & Enterprise Tooling"
          subtitle="Software and project management applications verified through academic instruction and corporate practice."
          accent="emerald"
        />
      </FadeIn>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat, idx) => {
          const isEnterprise = cat.categoryName === "Enterprise & Project Management";

          return (
            <StaggerItem key={cat.id || idx}>
              <div
                className={`rounded-2xl p-6 sm:p-7 border backdrop-blur-sm h-full flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${
                  isEnterprise
                    ? "bg-gradient-to-br from-background-secondary via-[#111A1E] to-background-secondary border-accent-gold/30 hover:border-accent-gold/60 hover:shadow-gold-subtle"
                    : "bg-gradient-to-br from-background-secondary via-[#0C151B] to-background-secondary border-border-muted/70 hover:border-accent-emerald/40 hover:shadow-emerald-subtle"
                }`}
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                      {getCategoryIcon(cat.categoryName)}
                    </div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-content-muted bg-white/5 border border-white/5 px-2.5 py-0.5 rounded-full">
                      Verified
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-content-primary mb-1">
                    {cat.categoryName}
                  </h3>
                  {cat.description && (
                    <p className="text-xs text-content-secondary mb-5 leading-relaxed">
                      {cat.description}
                    </p>
                  )}

                  {/* Skills List in Category */}
                  <div className="space-y-3 pt-1">
                    {cat.skills.map((skill, sIdx) => {
                      const hasBasicNote =
                        skill.note === "Basic" || skill.proficiencyLevel === "Basic";

                      return (
                        <div
                          key={sIdx}
                          className="rounded-xl bg-background/50 border border-border-muted/50 p-3.5 space-y-1.5 transition-colors hover:border-border-muted"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-sm font-semibold text-content-primary flex items-center gap-2">
                              <CheckCircle2 className="h-3.5 w-3.5 text-accent-emerald flex-shrink-0" />
                              {skill.name}
                            </span>
                            {hasBasicNote ? (
                              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-300 font-medium">
                                Basic
                              </span>
                            ) : skill.note ? (
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-accent-emerald/10 border border-accent-emerald/20 text-accent-emerald-light">
                                {skill.note}
                              </span>
                            ) : (
                              <span className="text-[10px] font-mono text-content-muted">
                                Verified
                              </span>
                            )}
                          </div>

                          {skill.description && (
                            <p className="text-xs text-content-secondary leading-normal pl-5">
                              {skill.description}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Footer Note */}
                <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-content-muted">
                  <span>Standard Non-Inflated Metric</span>
                  <span className="text-accent-emerald-light">CV Corroborated</span>
                </div>
              </div>
            </StaggerItem>
          );
        })}
      </StaggerContainer>
    </section>
  );
};

