"use client";

import React from "react";
import { Award, Star, GraduationCap, Sparkles, ShieldCheck } from "lucide-react";

export const AchievementsVisual: React.FC = () => {
  return (
    <div className="relative w-full max-w-lg mx-auto aspect-video sm:aspect-[16/10] rounded-2xl bg-gradient-to-br from-background-secondary via-[#111915] to-background-secondary border border-border-muted/80 p-6 flex flex-col justify-between overflow-hidden shadow-2xl">
      {/* Background ambient radial gradients */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-accent-gold/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-accent-emerald/20 rounded-full blur-3xl pointer-events-none" />

      {/* Grid Pattern */}
      <svg
        className="absolute inset-0 w-full h-full opacity-10 pointer-events-none stroke-accent-gold"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="achieve-grid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" strokeWidth="1" />
            <circle cx="15" cy="15" r="1.5" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#achieve-grid)" />
      </svg>

      {/* Top Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/5 pb-3">
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 rounded-full bg-accent-gold animate-pulse" />
          <span className="text-xs font-mono tracking-wider uppercase text-accent-gold-light">
            Verified Scholastic Distinctions
          </span>
        </div>
        <span className="text-[11px] font-mono text-content-muted bg-white/5 px-2 py-0.5 rounded border border-white/10">
          NUST Honors
        </span>
      </div>

      {/* Central Visual Stage */}
      <div className="relative z-10 my-auto py-3 flex flex-col items-center justify-center text-center">
        {/* Orbital Medallion */}
        <div className="relative mb-3 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-accent-gold/40 animate-spin-slow" />
          <div className="absolute -inset-2.5 rounded-full border border-accent-emerald/30 border-dashed" />
          <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-gradient-to-tr from-accent-gold/25 via-accent-gold/10 to-transparent border border-accent-gold/60 flex items-center justify-center shadow-gold-subtle">
            <Award className="h-9 w-9 sm:h-11 sm:w-11 text-accent-gold" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-accent-gold" />
          <h4 className="text-base sm:text-lg font-bold text-content-primary">
            Rector&apos;s Gold Medalist
          </h4>
          <Sparkles className="h-4 w-4 text-accent-gold" />
        </div>
        <p className="text-xs sm:text-sm text-accent-gold-light font-mono mt-0.5">
          Top Final Year Project • Chemical Engineering Batch
        </p>
      </div>

      {/* Bottom Telemetry Nodes */}
      <div className="relative z-10 grid grid-cols-2 gap-2 pt-3 border-t border-white/5 text-center">
        <div className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded bg-background/50 border border-white/5">
          <Star className="h-3.5 w-3.5 text-accent-emerald" />
          <span className="text-[11px] font-mono text-content-secondary">Dean&apos;s List (2021–2025)</span>
        </div>
        <div className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded bg-background/50 border border-white/5">
          <ShieldCheck className="h-3.5 w-3.5 text-accent-gold" />
          <span className="text-[11px] font-mono text-content-secondary">Harvard & McKinsey Programs</span>
        </div>
      </div>
    </div>
  );
};

