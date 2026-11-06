"use client";

import React from "react";
import { EducationItem } from "@/types/portfolio";
import { FadeIn } from "@/components/animations/FadeIn";
import {
  GraduationCap,
  Calendar,
  MapPin,
  Award,
  BookOpen,
  CheckCircle2,
  Building2,
  Sparkles,
} from "lucide-react";

interface DegreeCardProps {
  education: EducationItem;
}

export const DegreeCard: React.FC<DegreeCardProps> = ({ education }) => {
  return (
    <FadeIn direction="up">
      <div className="relative rounded-2xl bg-gradient-to-br from-background-secondary via-[#0D161F] to-background-secondary border border-border-muted/80 p-6 sm:p-8 lg:p-10 shadow-card-elevation overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-gold/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-emerald/10 rounded-full blur-3xl pointer-events-none" />

        {/* Decorative Gold Border Notch */}
        <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-accent-gold to-transparent opacity-80" />

        <div className="relative z-10 space-y-8">
          {/* Top Bar: Institution and Duration */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/5 pb-6">
            <div className="flex items-start gap-4">
              <div className="h-14 w-14 rounded-xl bg-accent-gold/10 border border-accent-gold/30 flex items-center justify-center text-accent-gold shadow-gold-subtle flex-shrink-0">
                <GraduationCap className="h-7 w-7" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-xs font-mono uppercase tracking-wider text-accent-gold-light bg-accent-gold/10 border border-accent-gold/20 px-2.5 py-0.5 rounded-full font-semibold">
                    Verified Undergraduate Degree
                  </span>
                  <span className="text-xs font-mono text-accent-emerald-light bg-accent-emerald/10 border border-accent-emerald/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Sparkles className="h-3 w-3" />
                    {education.distinction || "Gold Medalist"}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-content-primary tracking-tight">
                  {education.degree}
                </h3>
                <p className="text-base text-accent-emerald-light font-medium mt-1 flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-accent-emerald" />
                  {education.institution}
                </p>
                {education.campus && (
                  <p className="text-xs sm:text-sm text-content-secondary mt-0.5">
                    {education.campus}
                  </p>
                )}
              </div>
            </div>

            {/* Meta Tags: Location & Duration */}
            <div className="flex flex-col sm:flex-row lg:flex-col lg:items-end gap-2 text-xs font-mono text-content-muted">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-background/60 border border-border-muted/60">
                <Calendar className="h-3.5 w-3.5 text-accent-gold" />
                {education.duration}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-background/60 border border-border-muted/60">
                <MapPin className="h-3.5 w-3.5 text-accent-emerald" />
                {education.location || "Islamabad, Pakistan"}
              </span>
            </div>
          </div>

          {/* Core Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-xl bg-background/50 border border-border-muted/60 p-4 transition-all hover:border-accent-gold/40">
              <span className="text-xs font-mono text-content-muted uppercase tracking-wider block mb-1">
                Cumulative Grade Point
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl font-black text-accent-gold font-mono">
                  {education.cgpa}
                </span>
                <span className="text-xs text-content-muted font-mono">/ 4.00</span>
              </div>
              <span className="text-[11px] text-content-secondary mt-1 block">
                Top academic standing
              </span>
            </div>

            <div className="rounded-xl bg-background/50 border border-border-muted/60 p-4 transition-all hover:border-accent-gold/40">
              <span className="text-xs font-mono text-content-muted uppercase tracking-wider block mb-1">
                Capstone Distinction
              </span>
              <div className="text-lg font-bold text-content-primary flex items-center gap-1.5">
                <Award className="h-5 w-5 text-accent-gold" />
                Rector&apos;s Gold Medal
              </div>
              <span className="text-[11px] text-content-secondary mt-1 block">
                Best Final Year Project in batch
              </span>
            </div>

            <div className="rounded-xl bg-background/50 border border-border-muted/60 p-4 transition-all hover:border-accent-emerald/40">
              <span className="text-xs font-mono text-content-muted uppercase tracking-wider block mb-1">
                Honor Recognition
              </span>
              <div className="text-lg font-bold text-accent-emerald-light">
                Dean&apos;s Honor List
              </div>
              <span className="text-[11px] text-content-secondary mt-1 block">
                Recognized 2021 – 2025
              </span>
            </div>

            <div className="rounded-xl bg-background/50 border border-border-muted/60 p-4 transition-all hover:border-accent-emerald/40">
              <span className="text-xs font-mono text-content-muted uppercase tracking-wider block mb-1">
                Accreditation Status
              </span>
              <div className="text-lg font-bold text-content-primary flex items-center gap-1.5">
                <CheckCircle2 className="h-5 w-5 text-accent-emerald" />
                PEC Level-II / WA
              </div>
              <span className="text-[11px] text-content-secondary mt-1 block">
                Washington Accord Recognized
              </span>
            </div>
          </div>

          {/* Engineering Disciplines & Technical Foundation */}
          {education.coreDisciplines && education.coreDisciplines.length > 0 && (
            <div className="border-t border-white/5 pt-6 space-y-3">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-accent-emerald" />
                <h4 className="text-sm font-bold text-content-primary uppercase tracking-wider font-mono">
                  Core Engineering Disciplines & Academic Foundation
                </h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {education.coreDisciplines.map((course, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-background/40 border border-border-muted/50 text-xs text-content-secondary"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-accent-emerald" />
                    <span>{course}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Final Year Capstone Note */}
          {education.thesisOrCapstone && (
            <div className="rounded-xl bg-accent-gold/5 border border-accent-gold/20 p-4 sm:p-5 flex items-start gap-3">
              <Award className="h-5 w-5 text-accent-gold flex-shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-content-secondary leading-relaxed">
                <strong className="text-accent-gold-light font-semibold block mb-0.5">
                  Academic Capstone Recognition:
                </strong>
                {education.thesisOrCapstone} Evaluated rigorously by the NUST academic examination
                board for synthesis of unit operations, process simulation, and plant feasibility.
              </div>
            </div>
          )}
        </div>
      </div>
    </FadeIn>
  );
};

