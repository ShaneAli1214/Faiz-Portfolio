"use client";

import React from "react";
import { CertificationItem } from "@/types/portfolio";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  GraduationCap,
  Calendar,
  Building2,
  Clock,
  Sparkles,
  Info,
} from "lucide-react";

interface DevelopmentProgramsSectionProps {
  programs: CertificationItem[];
}

export const DevelopmentProgramsSection: React.FC<DevelopmentProgramsSectionProps> = ({
  programs,
}) => {
  return (
    <section className="space-y-8">
      <FadeIn direction="up">
        <SectionHeading
          badge="Executive & Leadership Development"
          title="Professional Development Programs"
          subtitle="Selective executive learning initiatives actively underway to strengthen global leadership and strategic problem-solving."
          accent="gold"
        />
      </FadeIn>

      <FadeIn direction="up" delay={0.1}>
        <div className="rounded-xl bg-amber-500/5 border border-amber-500/20 p-4 sm:p-5 flex items-start gap-3">
          <Info className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-content-secondary leading-relaxed">
            <strong className="text-amber-300 font-semibold block mb-0.5">
              Program Status Notice:
            </strong>
            The executive programs listed below represent ongoing cohorts (October – December 2026).
            In compliance with strict factual integrity, they are explicitly designated as
            <span className="text-amber-300 font-mono font-medium"> &quot;In Progress&quot;</span> and
            will be updated with completed credential references upon official cohort graduation.
          </div>
        </div>
      </FadeIn>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {programs.map((program) => (
          <StaggerItem key={program.id}>
            <div className="relative rounded-2xl bg-gradient-to-br from-background-secondary via-[#0E161D] to-background-secondary border border-border-muted/70 p-6 sm:p-8 backdrop-blur-sm h-full flex flex-col justify-between transition-all duration-300 hover:border-accent-gold/40 hover:-translate-y-1 hover:shadow-card-elevation group overflow-hidden">
              {/* Subtle ambient light */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-accent-gold/10 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10 space-y-4">
                {/* Header with Issuer & Status Badge */}
                <div className="flex items-start justify-between gap-4">
                  <div className="h-12 w-12 rounded-xl bg-accent-gold/10 border border-accent-gold/30 flex items-center justify-center text-accent-gold shadow-gold-subtle flex-shrink-0 transition-transform group-hover:scale-105">
                    <GraduationCap className="h-6 w-6" />
                  </div>

                  {/* Explicit In-Progress Badge */}
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-amber-500/10 border border-amber-500/30 text-amber-300">
                    <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                    In Progress
                  </span>
                </div>

                {/* Program Title & Institution */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-content-primary group-hover:text-accent-gold-light transition-colors">
                    {program.title}
                  </h3>
                  <p className="text-sm font-medium text-accent-emerald-light mt-1 flex items-center gap-1.5">
                    <Building2 className="h-4 w-4 text-accent-emerald" />
                    {program.issuer}
                  </p>
                </div>

                {/* Description */}
                {program.description && (
                  <p className="text-sm text-content-secondary leading-relaxed pt-1">
                    {program.description}
                  </p>
                )}
              </div>

              {/* Footer Meta */}
              <div className="relative z-10 mt-6 pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-content-muted">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-accent-gold" />
                  {program.duration || program.period}
                </span>
                <span className="inline-flex items-center gap-1 text-accent-gold-light">
                  <Clock className="h-3.5 w-3.5 text-accent-gold" />
                  Active Learner Cohort
                </span>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
};

