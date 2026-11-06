"use client";

import React from "react";
import { FadeIn } from "@/components/animations/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LeadershipVisual } from "./LeadershipVisual";
import { Users, Heart, CheckCircle2 } from "lucide-react";

export const LeadershipHero: React.FC = () => {
  return (
    <section className="relative pt-6 sm:pt-10 pb-12 sm:pb-16 border-b border-border-muted/50">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Heading, Subtitle, & Verified Badges */}
        <div className="lg:col-span-7 space-y-6">
          <FadeIn direction="up">
            <SectionHeading
              badge="Service & Leadership"
              title="Leadership & Community Impact"
              subtitle="Taking initiative, organizing meaningful experiences, and contributing to communities through leadership and service."
              accent="emerald"
            />
          </FadeIn>

          <FadeIn direction="up" delay={0.1}>
            <div className="bg-background-secondary/60 border border-border-muted/60 rounded-xl p-5 sm:p-6 backdrop-blur-sm space-y-3">
              <div className="flex items-center gap-2 text-accent-emerald-light text-sm font-semibold">
                <Users className="h-4 w-4 text-accent-emerald" />
                <span>Executive Responsibility & Grassroots Service</span>
              </div>
              <p className="text-content-secondary text-sm leading-relaxed">
                Demonstrated leadership through executive governance as <span className="text-content-primary font-medium">Director at AIChE NUST Chapter</span>,
                campus-wide <span className="text-content-primary font-medium">Event Planning across 2.5+ years</span>, and tangible
                humanitarian service raising <span className="text-accent-gold-light font-semibold">PKR 30,000 for a clean water pump in Thar</span> and
                distributing educational and religious resources.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono text-content-muted">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-accent-emerald/10 border border-accent-emerald/20 text-accent-emerald-light">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  AIChE Chapter Director
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-accent-gold/10 border border-accent-gold/20 text-accent-gold-light">
                  <Heart className="h-3.5 w-3.5" />
                  PKR 30k Thar Water Pump
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/5 border border-white/10 text-content-secondary">
                  5+ Technical Workshops
                </span>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Right Column: Visual Schematic */}
        <div className="lg:col-span-5">
          <FadeIn direction="left" delay={0.15}>
            <LeadershipVisual />
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

