"use client";

import React from "react";
import { CertificationItem } from "@/types/portfolio";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  GraduationCap,
  Calendar,
  Sparkles,
  Building2,
  Clock,
  CheckCircle2,
} from "lucide-react";

interface LearningCertificationsSectionProps {
  programs: CertificationItem[];
}

export const LearningCertificationsSection: React.FC<
  LearningCertificationsSectionProps
> = ({ programs }) => {
  return (
    <section className="space-y-8">
      <FadeIn direction="up">
        <SectionHeading
          badge="Continuous Learning"
          title="Professional Learning & Certifications"
          subtitle="Selective executive and leadership development programs actively underway."
          accent="gold"
        />
      </FadeIn>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {programs.map((program) => {
          const isInProgress = program.status === "In Progress";

          return (
            <StaggerItem key={program.id}>
              <div className="relative rounded-2xl bg-gradient-to-br from-background-secondary via-[#0E161D] to-background-secondary border border-border-muted/70 p-6 sm:p-8 backdrop-blur-sm h-full flex flex-col justify-between transition-all duration-300 hover:border-accent-gold/40 hover:-translate-y-1 hover:shadow-card-elevation group overflow-hidden">
                {/* Ambient glow */}
                <div className="absolute top-0 right-0 w-36 h-36 bg-accent-gold/10 rounded-full blur-2xl pointer-events-none" />

                <div className="relative z-10 space-y-4">
                  {/* Top Header: Issuer & Status Badge */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="h-12 w-12 rounded-xl bg-accent-gold/10 border border-accent-gold/30 flex items-center justify-center text-accent-gold shadow-gold-subtle flex-shrink-0 transition-transform group-hover:scale-105">
                      <GraduationCap className="h-6 w-6" />
                    </div>

                    {/* Status Badge: Explicit distinction */}
                    {isInProgress ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-amber-500/10 border border-amber-500/30 text-amber-300">
                        <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                        In Progress
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-accent-emerald/10 border border-accent-emerald/30 text-accent-emerald-light">
                        <CheckCircle2 className="h-3 w-3" />
                        Completed
                      </span>
                    )}
                  </div>

                  {/* Title & Organization */}
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-content-primary group-hover:text-accent-gold-light transition-colors">
                      {program.title}
                    </h3>
                    <p className="text-sm font-medium text-accent-emerald-light mt-1 flex items-center gap-1.5">
                      <Building2 className="h-4 w-4 text-accent-emerald" />
                      {program.issuer}
                    </p>
                  </div>

                  {/* Program Description */}
                  {program.description && (
                    <p className="text-sm text-content-secondary leading-relaxed pt-1">
                      {program.description}
                    </p>
                  )}
                </div>

                {/* Footer: Timeline & Verified Status */}
                <div className="relative z-10 mt-6 pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-content-muted">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-accent-gold" />
                    {program.duration || program.period}
                  </span>
                  <span className="inline-flex items-center gap-1 text-accent-gold-light">
                    <Clock className="h-3.5 w-3.5 text-accent-gold" />
                    Active Cohort (Not Completed)
                  </span>
                </div>
              </div>
            </StaggerItem>
          );
        })}
      </StaggerContainer>
    </section>
  );
};

