"use client";

import React from "react";
import {
  Cpu,
  BarChart3,
  Layers,
  ShieldCheck,
  Workflow,
  Sparkles,
} from "lucide-react";

export const SkillsVisual: React.FC = () => {
  return (
    <div className="relative w-full max-w-lg mx-auto aspect-video sm:aspect-[16/10] rounded-2xl bg-gradient-to-br from-background-secondary via-[#0C151B] to-background-secondary border border-border-muted/80 p-6 flex flex-col justify-between overflow-hidden shadow-2xl">
      {/* Background ambient radial gradients */}
      <div className="absolute -top-12 -left-12 w-48 h-48 bg-accent-emerald/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-accent-gold/15 rounded-full blur-3xl pointer-events-none" />

      {/* Grid Pattern */}
      <svg
        className="absolute inset-0 w-full h-full opacity-10 pointer-events-none stroke-accent-emerald"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="skills-grid" width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M 28 0 L 0 0 0 28" fill="none" strokeWidth="1" />
            <circle cx="14" cy="14" r="1" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#skills-grid)" />
      </svg>

      {/* Top Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/5 pb-3">
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 rounded-full bg-accent-emerald animate-pulse" />
          <span className="text-xs font-mono tracking-wider uppercase text-accent-emerald-light">
            Verified Competency Matrix
          </span>
        </div>
        <span className="text-[11px] font-mono text-content-muted bg-white/5 px-2 py-0.5 rounded border border-white/10">
          Executive Portfolio
        </span>
      </div>

      {/* Interactive Hub Visual */}
      <div className="relative z-10 my-auto py-3 grid grid-cols-3 gap-3">
        {/* Node 1: Software & Analytics */}
        <div className="rounded-xl bg-background/60 border border-border-muted/70 p-3 text-center space-y-1.5 transition-transform hover:scale-105">
          <div className="h-8 w-8 mx-auto rounded-lg bg-accent-emerald/10 border border-accent-emerald/30 flex items-center justify-center text-accent-emerald">
            <BarChart3 className="h-4 w-4" />
          </div>
          <span className="text-xs font-bold text-content-primary block">Data & Analytics</span>
          <span className="text-[10px] font-mono text-accent-emerald-light bg-accent-emerald/10 px-1.5 py-0.5 rounded inline-block">
            Power BI (Basic)
          </span>
        </div>

        {/* Node 2: Enterprise Systems */}
        <div className="rounded-xl bg-background/60 border border-border-muted/70 p-3 text-center space-y-1.5 transition-transform hover:scale-105">
          <div className="h-8 w-8 mx-auto rounded-lg bg-accent-gold/10 border border-accent-gold/30 flex items-center justify-center text-accent-gold">
            <Workflow className="h-4 w-4" />
          </div>
          <span className="text-xs font-bold text-content-primary block">Enterprise Systems</span>
          <span className="text-[10px] font-mono text-accent-gold-light bg-accent-gold/10 px-1.5 py-0.5 rounded inline-block">
            SAP PS • PROAACT
          </span>
        </div>

        {/* Node 3: Productivity */}
        <div className="rounded-xl bg-background/60 border border-border-muted/70 p-3 text-center space-y-1.5 transition-transform hover:scale-105">
          <div className="h-8 w-8 mx-auto rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-content-primary">
            <Cpu className="h-4 w-4 text-accent-emerald-light" />
          </div>
          <span className="text-xs font-bold text-content-primary block">Productivity</span>
          <span className="text-[10px] font-mono text-content-secondary bg-white/5 px-1.5 py-0.5 rounded inline-block">
            MS Office Suite
          </span>
        </div>
      </div>

      {/* Bottom Telemetry Bar */}
      <div className="relative z-10 grid grid-cols-2 gap-2 pt-3 border-t border-white/5 text-center">
        <div className="flex items-center justify-center gap-1.5 py-1 px-2 rounded bg-background/50 border border-white/5">
          <ShieldCheck className="h-3.5 w-3.5 text-accent-emerald" />
          <span className="text-[11px] font-mono text-content-secondary">
            Strict CV-Verified Levels
          </span>
        </div>
        <div className="flex items-center justify-center gap-1.5 py-1 px-2 rounded bg-background/50 border border-white/5">
          <Sparkles className="h-3.5 w-3.5 text-accent-gold" />
          <span className="text-[11px] font-mono text-content-secondary">
            Harvard & McKinsey Programs
          </span>
        </div>
      </div>
    </div>
  );
};

