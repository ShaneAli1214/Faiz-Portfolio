"use client";

import React from "react";
import { AwardItem } from "@/types/portfolio";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Award, Star, CheckCircle2, ShieldCheck, Sparkles, Building2 } from "lucide-react";

interface AcademicAwardsSectionProps {
  awards: AwardItem[];
}

export const AcademicAwardsSection: React.FC<AcademicAwardsSectionProps> = ({ awards }) => {
  return (
    <section className="space-y-8">
      <FadeIn direction="up">
        <SectionHeading
          badge="NUST Scholastic Honors"
          title="Academic Awards & Distinctions"
          subtitle="Conferred honors acknowledging engineering rigor, capstone synthesis, and sustained GPA performance."
          accent="gold"
        />
      </FadeIn>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {awards.map((award) => {
          const isGoldMedal = award.distinctionType === "gold-medal" || award.id.includes("gold");

          return (
            <StaggerItem key={award.id}>
              <div
                className={`relative rounded-2xl p-6 sm:p-8 transition-all duration-300 backdrop-blur-sm border h-full flex flex-col justify-between group hover:-translate-y-1 ${
                  isGoldMedal
                    ? "bg-gradient-to-br from-background-secondary via-[#141B17] to-background-secondary border-accent-gold/40 hover:border-accent-gold/80 hover:shadow-gold-subtle"
                    : "bg-gradient-to-br from-background-secondary via-[#0D161F] to-background-secondary border-accent-emerald/30 hover:border-accent-emerald/60 hover:shadow-emerald-subtle"
                }`}
              >
                {/* Decorative glow */}
                <div
                  className={`absolute -top-10 -right-10 w-44 h-44 rounded-full blur-3xl pointer-events-none opacity-20 ${
                    isGoldMedal ? "bg-accent-gold" : "bg-accent-emerald"
                  }`}
                />

                <div className="relative z-10 space-y-4">
                  {/* Top Badge & Distinction Icon */}
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className={`h-14 w-14 rounded-xl flex items-center justify-center border transition-transform group-hover:scale-105 flex-shrink-0 ${
                        isGoldMedal
                          ? "bg-accent-gold/15 border-accent-gold/40 text-accent-gold shadow-gold-subtle"
                          : "bg-accent-emerald/15 border-accent-emerald/40 text-accent-emerald shadow-emerald-subtle"
                      }`}
                    >
                      {isGoldMedal ? (
                        <Award className="h-7 w-7" />
                      ) : (
                        <Star className="h-7 w-7" />
                      )}
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <span
                        className={`text-[11px] font-mono font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                          isGoldMedal
                            ? "bg-accent-gold/10 text-accent-gold-light border-accent-gold/30"
                            : "bg-accent-emerald/10 text-accent-emerald-light border-accent-emerald/30"
                        }`}
                      >
                        {award.badge || "Academic Distinction"}
                      </span>
                      <span className="text-xs font-mono text-content-muted">
                        {award.period || award.year}
                      </span>
                    </div>
                  </div>

                  {/* Title & Organization */}
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-content-primary group-hover:text-accent-gold-light transition-colors">
                      {award.title}
                    </h3>
                    <p className="text-sm font-medium text-accent-emerald-light mt-1 flex items-center gap-1.5">
                      <Building2 className="h-4 w-4 text-accent-emerald" />
                      {award.institution}
                    </p>
                  </div>

                  {/* Citation / Description */}
                  <p className="text-sm text-content-secondary leading-relaxed pt-1">
                    {award.description}
                  </p>

                  {/* Capstone / Criteria Highlight Box */}
                  <div className="rounded-xl bg-background/50 border border-border-muted/60 p-3.5 text-xs text-content-secondary space-y-1">
                    <div className="flex items-center gap-1.5 text-accent-gold-light font-mono font-medium">
                      <Sparkles className="h-3.5 w-3.5 text-accent-gold" />
                      <span>Conferment Criteria:</span>
                    </div>
                    <p>
                      {isGoldMedal
                        ? "Evaluated and adjudicated by the NUST academic examination committee for the Best Final Year Project across the graduating Chemical Engineering cohort."
                        : "Awarded each academic semester for sustaining top-tier academic GPA standing across the 4-year degree curriculum (2021–2025)."}
                    </p>
                  </div>
                </div>

                {/* Footer Verified Marker */}
                <div className="relative z-10 pt-6 mt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-content-muted">
                  <span className="flex items-center gap-1.5 text-accent-emerald-light">
                    <CheckCircle2 className="h-3.5 w-3.5 text-accent-emerald" />
                    Verified Official NUST Transcript
                  </span>
                  <span className="text-content-secondary font-mono">{award.year}</span>
                </div>
              </div>
            </StaggerItem>
          );
        })}
      </StaggerContainer>
    </section>
  );
};

