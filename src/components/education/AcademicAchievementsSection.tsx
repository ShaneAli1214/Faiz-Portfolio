"use client";

import React from "react";
import { AcademicAchievement } from "@/types/portfolio";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Award, Star, CheckCircle, ShieldCheck } from "lucide-react";

interface AcademicAchievementsSectionProps {
  achievements: AcademicAchievement[];
}

export const AcademicAchievementsSection: React.FC<AcademicAchievementsSectionProps> = ({
  achievements,
}) => {
  return (
    <section className="py-12 sm:py-16 space-y-8">
      <FadeIn direction="up">
        <SectionHeading
          badge="Distinctions & Accolades"
          title="Academic Achievements & Honors"
          subtitle="Documented scholastic awards recognized by the National University of Sciences and Technology (NUST)."
          accent="gold"
        />
      </FadeIn>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {achievements.map((item) => {
          const isGoldMedal = item.distinctionType === "gold-medal";

          return (
            <StaggerItem key={item.id}>
              <div
                className={`relative rounded-2xl p-6 sm:p-8 transition-all duration-300 backdrop-blur-sm border h-full flex flex-col justify-between group hover:-translate-y-1 ${
                  isGoldMedal
                    ? "bg-gradient-to-br from-background-secondary via-[#141B18] to-background-secondary border-accent-gold/40 hover:border-accent-gold/80 hover:shadow-gold-subtle"
                    : "bg-gradient-to-br from-background-secondary via-[#0E171E] to-background-secondary border-accent-emerald/30 hover:border-accent-emerald/60 hover:shadow-emerald-subtle"
                }`}
              >
                {/* Decorative glow */}
                <div
                  className={`absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl pointer-events-none opacity-20 ${
                    isGoldMedal ? "bg-accent-gold" : "bg-accent-emerald"
                  }`}
                />

                <div className="relative z-10 space-y-4">
                  {/* Top Badge and Icon Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className={`h-12 w-12 rounded-xl flex items-center justify-center border transition-transform group-hover:scale-105 ${
                        isGoldMedal
                          ? "bg-accent-gold/15 border-accent-gold/40 text-accent-gold shadow-gold-subtle"
                          : "bg-accent-emerald/15 border-accent-emerald/40 text-accent-emerald shadow-emerald-subtle"
                      }`}
                    >
                      {isGoldMedal ? (
                        <Award className="h-6 w-6" />
                      ) : (
                        <Star className="h-6 w-6" />
                      )}
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      {item.badge && (
                        <span
                          className={`text-[11px] font-mono font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                            isGoldMedal
                              ? "bg-accent-gold/10 text-accent-gold-light border-accent-gold/30"
                              : "bg-accent-emerald/10 text-accent-emerald-light border-accent-emerald/30"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                      {item.year && (
                        <span className="text-xs font-mono text-content-muted">
                          {item.year}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title & Institution */}
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-content-primary group-hover:text-accent-gold-light transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm font-medium text-accent-emerald-light mt-1 flex items-center gap-1.5">
                      <ShieldCheck className="h-4 w-4 text-accent-emerald" />
                      {item.institution}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-content-secondary leading-relaxed pt-1">
                    {item.description}
                  </p>
                </div>

                {/* Footer Verified Marker */}
                <div className="relative z-10 pt-6 mt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-content-muted">
                  <span className="flex items-center gap-1.5 text-accent-emerald-light">
                    <CheckCircle className="h-3.5 w-3.5 text-accent-emerald" />
                    Verified NUST Academic Record
                  </span>
                  <span>{item.period || item.year}</span>
                </div>
              </div>
            </StaggerItem>
          );
        })}
      </StaggerContainer>
    </section>
  );
};

