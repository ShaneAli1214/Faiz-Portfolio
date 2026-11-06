"use client";

import React from "react";
import { GraduationCap, Award, BookOpen, Atom } from "lucide-react";

export const EducationVisual: React.FC = () => {
  return (
    <div className="relative w-full max-w-lg mx-auto aspect-video sm:aspect-[16/10] rounded-2xl bg-gradient-to-br from-background-secondary via-[#0C141C] to-background-secondary border border-border-muted/80 p-6 flex flex-col justify-between overflow-hidden shadow-2xl">
      {/* Background ambient radial gradients */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-accent-gold/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-accent-emerald/15 rounded-full blur-3xl pointer-events-none" />

      {/* Subtle background circuit / molecular grid */}
      <svg
        className="absolute inset-0 w-full h-full opacity-10 pointer-events-none stroke-accent-emerald"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="edu-grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" strokeWidth="1" />
            <circle cx="16" cy="16" r="1.5" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#edu-grid)" />
      </svg>

      {/* Top Header Row of the Schematic */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/5 pb-3">
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 rounded-full bg-accent-gold animate-pulse" />
          <span className="text-xs font-mono tracking-wider uppercase text-accent-gold-light">
            NUST SCME • Top Academic Honors
          </span>
        </div>
        <span className="text-[11px] font-mono text-content-muted bg-white/5 px-2 py-0.5 rounded border border-white/10">
          BE Chemical Engineering
        </span>
      </div>

      {/* Central Visual Stage */}
      <div className="relative z-10 my-auto py-4 flex flex-col items-center justify-center text-center">
        {/* Orbital Gold Ring & Medallion */}
        <div className="relative mb-3 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-accent-gold/30 animate-spin-slow" />
          <div className="absolute -inset-2 rounded-full border border-accent-emerald/20 border-dashed" />
          <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-gradient-to-tr from-accent-gold/20 via-accent-gold/10 to-transparent border border-accent-gold/50 flex items-center justify-center shadow-gold-subtle">
            <Award className="h-8 w-8 sm:h-10 sm:w-10 text-accent-gold" />
          </div>
        </div>

        <h4 className="text-base sm:text-lg font-bold text-content-primary">
          Rector&apos;s Gold Medalist
        </h4>
        <p className="text-xs sm:text-sm text-accent-emerald-light font-mono mt-0.5">
          Cumulative GPA: 3.53 / 4.00 • Dean&apos;s List (2021–2025)
        </p>
      </div>

      {/* Bottom Telemetry Nodes */}
      <div className="relative z-10 grid grid-cols-3 gap-2 pt-3 border-t border-white/5 text-center">
        <div className="flex items-center justify-center gap-1.5 py-1 px-2 rounded bg-background/50 border border-white/5">
          <GraduationCap className="h-3.5 w-3.5 text-accent-emerald" />
          <span className="text-[11px] font-mono text-content-secondary">Nov 2021 – Jun 2025</span>
        </div>
        <div className="flex items-center justify-center gap-1.5 py-1 px-2 rounded bg-background/50 border border-white/5">
          <BookOpen className="h-3.5 w-3.5 text-accent-gold" />
          <span className="text-[11px] font-mono text-content-secondary">Final Year Capstone</span>
        </div>
        <div className="flex items-center justify-center gap-1.5 py-1 px-2 rounded bg-background/50 border border-white/5">
          <Atom className="h-3.5 w-3.5 text-accent-emerald-light" />
          <span className="text-[11px] font-mono text-content-secondary">Process Engineering</span>
        </div>
      </div>
    </div>
  );
};

