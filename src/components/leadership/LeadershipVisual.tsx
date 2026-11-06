"use client";

import React from "react";
import { Users, Heart, Droplets, BookOpen, Sparkles, Building2 } from "lucide-react";

export const LeadershipVisual: React.FC = () => {
  return (
    <div className="relative w-full max-w-lg mx-auto aspect-video sm:aspect-[16/10] rounded-2xl bg-gradient-to-br from-background-secondary via-[#0C1518] to-background-secondary border border-border-muted/80 p-6 flex flex-col justify-between overflow-hidden shadow-2xl">
      {/* Background ambient radial gradients */}
      <div className="absolute -top-12 -left-12 w-48 h-48 bg-accent-emerald/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-accent-gold/15 rounded-full blur-3xl pointer-events-none" />

      {/* Grid Pattern */}
      <svg
        className="absolute inset-0 w-full h-full opacity-10 pointer-events-none stroke-accent-emerald"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="lead-grid" width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M 28 0 L 0 0 0 28" fill="none" strokeWidth="1" />
            <circle cx="14" cy="14" r="1.5" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#lead-grid)" />
      </svg>

      {/* Top Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/5 pb-3">
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 rounded-full bg-accent-emerald animate-pulse" />
          <span className="text-xs font-mono tracking-wider uppercase text-accent-emerald-light">
            Community & Student Leadership
          </span>
        </div>
        <span className="text-[11px] font-mono text-content-muted bg-white/5 px-2 py-0.5 rounded border border-white/10">
          NUST Campus & Outreach
        </span>
      </div>

      {/* Center 2-Column Impact Nodes */}
      <div className="relative z-10 my-auto py-3 grid grid-cols-2 gap-3">
        {/* Node 1: AIChE Leadership */}
        <div className="rounded-xl bg-background/60 border border-border-muted/70 p-3.5 space-y-1.5 transition-transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div className="h-8 w-8 rounded-lg bg-accent-emerald/15 border border-accent-emerald/30 flex items-center justify-center text-accent-emerald">
              <Users className="h-4 w-4" />
            </div>
            <span className="text-[10px] font-mono text-accent-emerald-light bg-accent-emerald/10 px-1.5 py-0.5 rounded">
              AIChE Chapter
            </span>
          </div>
          <span className="text-xs font-bold text-content-primary block">
            Director & Event Planner
          </span>
          <span className="text-[11px] font-mono text-content-secondary block">
            5+ Technical Workshops Organized
          </span>
        </div>

        {/* Node 2: Humanitarian Service */}
        <div className="rounded-xl bg-background/60 border border-border-muted/70 p-3.5 space-y-1.5 transition-transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div className="h-8 w-8 rounded-lg bg-accent-gold/15 border border-accent-gold/30 flex items-center justify-center text-accent-gold">
              <Droplets className="h-4 w-4" />
            </div>
            <span className="text-[10px] font-mono text-accent-gold-light bg-accent-gold/10 px-1.5 py-0.5 rounded">
              Thar Project
            </span>
          </div>
          <span className="text-xs font-bold text-content-primary block">
            PKR 30,000 Raised
          </span>
          <span className="text-[11px] font-mono text-content-secondary block">
            Clean Water Pump & 40 Qurans
          </span>
        </div>
      </div>

      {/* Bottom Telemetry Bar */}
      <div className="relative z-10 grid grid-cols-2 gap-2 pt-3 border-t border-white/5 text-center">
        <div className="flex items-center justify-center gap-1.5 py-1 px-2 rounded bg-background/50 border border-white/5">
          <Building2 className="h-3.5 w-3.5 text-accent-emerald" />
          <span className="text-[11px] font-mono text-content-secondary">
            NUST Campus Coordination
          </span>
        </div>
        <div className="flex items-center justify-center gap-1.5 py-1 px-2 rounded bg-background/50 border border-white/5">
          <Heart className="h-3.5 w-3.5 text-accent-gold" />
          <span className="text-[11px] font-mono text-content-secondary">
            Humanitarian Outreach
          </span>
        </div>
      </div>
    </div>
  );
};

