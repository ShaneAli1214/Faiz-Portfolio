"use client";

import React from "react";
import { LeadershipItem } from "@/types/portfolio";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  Users,
  Calendar,
  Building2,
  CheckCircle2,
  Sparkles,
  Workflow,
  CalendarDays,
} from "lucide-react";

interface LeadershipExperienceSectionProps {
  roles: LeadershipItem[];
}

export const LeadershipExperienceSection: React.FC<
  LeadershipExperienceSectionProps
> = ({ roles }) => {
  return (
    <section className="space-y-8">
      <FadeIn direction="up">
        <SectionHeading
          badge="Campus & Society Governance"
          title="Leadership Experience"
          subtitle="Directing student chapter operations, organizing engineering seminars, and spearheading university-wide event logistics."
          accent="emerald"
        />
      </FadeIn>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {roles.map((item) => {
          const isAiche = item.id === "lead-aiche";

          return (
            <StaggerItem key={item.id}>
              <div
                className={`relative rounded-2xl p-6 sm:p-8 backdrop-blur-sm border h-full flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${
                  isAiche
                    ? "bg-gradient-to-br from-background-secondary via-[#0C161D] to-background-secondary border-accent-emerald/40 hover:border-accent-emerald/70 hover:shadow-emerald-subtle"
                    : "bg-gradient-to-br from-background-secondary via-[#0F171A] to-background-secondary border-border-muted/70 hover:border-accent-gold/40 hover:shadow-gold-subtle"
                }`}
              >
                <div className="space-y-5">
                  {/* Header: Icon & Duration */}
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className={`h-12 w-12 rounded-xl flex items-center justify-center border transition-transform ${
                        isAiche
                          ? "bg-accent-emerald/15 border-accent-emerald/40 text-accent-emerald"
                          : "bg-accent-gold/15 border-accent-gold/40 text-accent-gold"
                      }`}
                    >
                      {isAiche ? (
                        <Users className="h-6 w-6" />
                      ) : (
                        <CalendarDays className="h-6 w-6" />
                      )}
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-accent-emerald-light bg-accent-emerald/10 border border-accent-emerald/20 px-2.5 py-0.5 rounded-full font-semibold">
                        Verified Role
                      </span>
                      <span className="text-xs font-mono text-content-muted flex items-center gap-1.5 mt-0.5">
                        <Calendar className="h-3 w-3" />
                        {item.duration}
                      </span>
                    </div>
                  </div>

                  {/* Role Title & Organization */}
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-content-primary">
                      {item.role}
                    </h3>
                    <p className="text-sm font-medium text-accent-emerald-light mt-1 flex items-center gap-1.5">
                      <Building2 className="h-4 w-4 text-accent-emerald" />
                      {item.organization}
                    </p>
                  </div>

                  {/* Core Responsibilities */}
                  <div className="space-y-2 pt-1">
                    <span className="text-xs font-mono uppercase tracking-wider text-content-muted block">
                      Key Responsibilities & Scope
                    </span>
                    <ul className="space-y-2">
                      {item.responsibilities.map((resp, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-content-secondary leading-relaxed"
                        >
                          <CheckCircle2 className="h-4 w-4 text-accent-emerald flex-shrink-0 mt-0.5" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Verified Achievement Badge */}
                  {item.achievements && item.achievements.length > 0 && (
                    <div className="rounded-xl bg-background/50 border border-border-muted/60 p-3.5 space-y-1.5 text-xs">
                      <div className="flex items-center gap-1.5 text-accent-gold-light font-mono font-medium">
                        <Sparkles className="h-3.5 w-3.5 text-accent-gold" />
                        <span>Key Documented Output:</span>
                      </div>
                      <ul className="space-y-1 text-content-secondary">
                        {item.achievements.map((ach, aIdx) => (
                          <li key={aIdx} className="flex items-center gap-2">
                            <span className="h-1 w-1 rounded-full bg-accent-gold" />
                            <span>{ach}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Footer Tag */}
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-content-muted">
                  <span>Student Society Leadership</span>
                  <span className="text-content-secondary font-mono">{item.period}</span>
                </div>
              </div>
            </StaggerItem>
          );
        })}
      </StaggerContainer>
    </section>
  );
};

