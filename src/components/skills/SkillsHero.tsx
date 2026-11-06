"use client";

import React from "react";
import { FadeIn } from "@/components/animations/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SkillsVisual } from "./SkillsVisual";
import { Layers, ShieldCheck, CheckCircle2 } from "lucide-react";

export const SkillsHero: React.FC = () => {
  return (
    <section className="relative pt-6 sm:pt-10 pb-12 sm:pb-16 border-b border-border-muted/50">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Heading, Subtitle, & Verified Badges */}
        <div className="lg:col-span-7 space-y-6">
          <FadeIn direction="up">
            <SectionHeading
              badge="Capability Matrix"
              title="Skills & Professional Expertise"
              subtitle="Combining engineering knowledge, analytical thinking, business understanding, and professional capabilities to deliver value."
              accent="emerald"
            />
          </FadeIn>

          <FadeIn direction="up" delay={0.1}>
            <div className="bg-background-secondary/60 border border-border-muted/60 rounded-xl p-5 sm:p-6 backdrop-blur-sm space-y-3">
              <div className="flex items-center gap-2 text-accent-emerald-light text-sm font-semibold">
                <ShieldCheck className="h-4 w-4 text-accent-emerald" />
                <span>Strict Fact-Based Competency Profile</span>
              </div>
              <p className="text-content-secondary text-sm leading-relaxed">
                Proficiencies reflect verified tools and methodologies documented in professional
                engineering practice and CV records. Skill classifications avoid arbitrary percentage bars,
                faithfully preserving certified qualification levels (such as <span className="text-accent-emerald-light font-mono">Basic</span> for
                Power BI and SAP PS Module).
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono text-content-muted">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-accent-emerald/10 border border-accent-emerald/20 text-accent-emerald-light">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Software & Enterprise Systems
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-accent-gold/10 border border-accent-gold/20 text-accent-gold-light">
                  <Layers className="h-3.5 w-3.5" />
                  Professional Capabilities
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/5 border border-white/10 text-content-secondary">
                  Harvard & McKinsey Learning
                </span>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Right Column: Visual Schematic */}
        <div className="lg:col-span-5">
          <FadeIn direction="left" delay={0.15}>
            <SkillsVisual />
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

