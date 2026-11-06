"use client";

import React from "react";
import { FadeIn } from "@/components/animations/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EducationVisual } from "./EducationVisual";
import { Award, BookOpen, GraduationCap, CheckCircle2 } from "lucide-react";

export const EducationHero: React.FC = () => {
  return (
    <section className="relative pt-6 sm:pt-10 pb-12 sm:pb-16 border-b border-border-muted/50">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Heading, Subtitle, & Verified Badges */}
        <div className="lg:col-span-7 space-y-6">
          <FadeIn direction="up">
            <SectionHeading
              badge="Academic Foundation"
              title="Education & Academic Excellence"
              subtitle="Building a strong engineering foundation through academic excellence, technical learning, and practical problem-solving."
              accent="gold"
            />
          </FadeIn>

          <FadeIn direction="up" delay={0.1}>
            <div className="bg-background-secondary/60 border border-border-muted/60 rounded-xl p-5 sm:p-6 backdrop-blur-sm space-y-3">
              <div className="flex items-center gap-2 text-accent-gold-light text-sm font-semibold">
                <Award className="h-4 w-4 text-accent-gold" />
                <span>Highest Academic Honor Conferred at NUST</span>
              </div>
              <p className="text-content-secondary text-sm leading-relaxed">
                Graduated with a Bachelor of Engineering in Chemical Engineering from the
                prestigious <span className="text-content-primary font-medium">National University of Sciences and Technology (NUST)</span>,
                earning the <span className="text-accent-gold font-semibold">Rector&apos;s Gold Medal</span> for the top Final Year
                Capstone Project alongside sustained recognition on the <span className="text-content-primary font-medium">Dean&apos;s List (2021–2025)</span>.
              </p>
              
              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono text-content-muted">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-accent-emerald/10 border border-accent-emerald/20 text-accent-emerald-light">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  CGPA 3.53 / 4.00
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-accent-gold/10 border border-accent-gold/20 text-accent-gold-light">
                  <Award className="h-3.5 w-3.5" />
                  Rector&apos;s Gold Medalist
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/5 border border-white/10 text-content-secondary">
                  <GraduationCap className="h-3.5 w-3.5" />
                  Class of 2025
                </span>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Right Column: Visual Schematic */}
        <div className="lg:col-span-5">
          <FadeIn direction="left" delay={0.15}>
            <EducationVisual />
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

