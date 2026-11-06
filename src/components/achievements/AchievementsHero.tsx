"use client";

import React from "react";
import { FadeIn } from "@/components/animations/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AchievementsVisual } from "./AchievementsVisual";
import { Award, ShieldCheck, CheckCircle2 } from "lucide-react";

export const AchievementsHero: React.FC = () => {
  return (
    <section className="relative pt-6 sm:pt-10 pb-12 sm:pb-16 border-b border-border-muted/50">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Heading, Subtitle, & Verified Badges */}
        <div className="lg:col-span-7 space-y-6">
          <FadeIn direction="up">
            <SectionHeading
              badge="Accolades & Distinctions"
              title="Achievements & Recognition"
              subtitle="Recognizing academic excellence, professional development, and a commitment to continuous learning."
              accent="gold"
            />
          </FadeIn>

          <FadeIn direction="up" delay={0.1}>
            <div className="bg-background-secondary/60 border border-border-muted/60 rounded-xl p-5 sm:p-6 backdrop-blur-sm space-y-3">
              <div className="flex items-center gap-2 text-accent-gold-light text-sm font-semibold">
                <Award className="h-4 w-4 text-accent-gold" />
                <span>Verified Academic Distinction at NUST</span>
              </div>
              <p className="text-content-secondary text-sm leading-relaxed">
                Highlights include being awarded the <span className="text-accent-gold font-semibold">Rector&apos;s Gold Medal</span> for
                the Best Final Year Project across the Chemical Engineering batch, continuous 4-year
                placement on the <span className="text-content-primary font-medium">Dean&apos;s List</span>, and active participation
                in selective global leadership programs designed by Harvard Faculty and McKinsey & Company.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono text-content-muted">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-accent-gold/10 border border-accent-gold/20 text-accent-gold-light">
                  <Award className="h-3.5 w-3.5" />
                  Rector&apos;s Gold Medalist
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-accent-emerald/10 border border-accent-emerald/20 text-accent-emerald-light">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Dean&apos;s List (2021–2025)
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/5 border border-white/10 text-content-secondary">
                  <ShieldCheck className="h-3.5 w-3.5 text-accent-gold" />
                  CV-Corroborated Records
                </span>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Right Column: Visual Schematic */}
        <div className="lg:col-span-5">
          <FadeIn direction="left" delay={0.15}>
            <AchievementsVisual />
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

