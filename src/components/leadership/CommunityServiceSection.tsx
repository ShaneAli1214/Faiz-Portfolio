"use client";

import React from "react";
import { CommunityServiceItem } from "@/types/portfolio";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  Droplets,
  BookOpen,
  School,
  Heart,
  Calendar,
  Building2,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

interface CommunityServiceSectionProps {
  initiatives: CommunityServiceItem[];
}

export const CommunityServiceSection: React.FC<CommunityServiceSectionProps> = ({
  initiatives,
}) => {
  return (
    <section className="space-y-8">
      <FadeIn direction="up">
        <SectionHeading
          badge="Humanitarian Outreach"
          title="Community Service & Social Impact"
          subtitle="Mobilizing charitable resources for clean water infrastructure, educational materials, and local classroom support."
          accent="gold"
        />
      </FadeIn>

      {initiatives.map((service) => (
        <FadeIn key={service.id} direction="up">
          <div className="relative rounded-2xl bg-gradient-to-br from-background-secondary via-[#0F171A] to-background-secondary border border-border-muted/80 p-6 sm:p-8 lg:p-10 shadow-card-elevation overflow-hidden space-y-8">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-accent-gold/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent-emerald/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header: Title, Organization & Duration */}
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/5 pb-6">
              <div className="flex items-start gap-4">
                <div className="h-14 w-14 rounded-xl bg-accent-gold/15 border border-accent-gold/40 flex items-center justify-center text-accent-gold shadow-gold-subtle flex-shrink-0">
                  <Heart className="h-7 w-7" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-accent-gold-light bg-accent-gold/10 border border-accent-gold/20 px-2.5 py-0.5 rounded-full font-semibold">
                    Humanitarian Campaign
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-content-primary tracking-tight mt-1">
                    {service.title}
                  </h3>
                  <p className="text-sm sm:text-base text-accent-emerald-light font-medium mt-0.5 flex items-center gap-1.5">
                    <Building2 className="h-4 w-4 text-accent-emerald" />
                    {service.organization}
                  </p>
                </div>
              </div>

              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-background/60 border border-border-muted/60 text-xs font-mono text-content-muted w-fit">
                <Calendar className="h-3.5 w-3.5 text-accent-gold" />
                {service.duration}
              </span>
            </div>

            {/* Impact Metric Cards (Strictly CV Verified Numbers) */}
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Metric 1: Thar Water Pump */}
              <div className="rounded-xl bg-background/50 border border-border-muted/60 p-5 space-y-2 transition-all hover:border-accent-gold/50 group">
                <div className="flex items-center justify-between">
                  <div className="h-9 w-9 rounded-lg bg-accent-gold/15 border border-accent-gold/30 flex items-center justify-center text-accent-gold">
                    <Droplets className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-mono uppercase text-accent-gold-light bg-accent-gold/10 px-2 py-0.5 rounded">
                    Clean Water Access
                  </span>
                </div>
                <div className="pt-1">
                  <span className="text-2xl sm:text-3xl font-extrabold text-accent-gold font-mono block">
                    PKR 30,000
                  </span>
                  <span className="text-xs font-bold text-content-primary mt-0.5 block">
                    Water Pump in Thar
                  </span>
                  <span className="text-[11px] text-content-secondary mt-1 block">
                    Funds raised to construct a clean drinking water pump for arid desert communities.
                  </span>
                </div>
              </div>

              {/* Metric 2: Quran Copies */}
              <div className="rounded-xl bg-background/50 border border-border-muted/60 p-5 space-y-2 transition-all hover:border-accent-emerald/50 group">
                <div className="flex items-center justify-between">
                  <div className="h-9 w-9 rounded-lg bg-accent-emerald/15 border border-accent-emerald/30 flex items-center justify-center text-accent-emerald">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-mono uppercase text-accent-emerald-light bg-accent-emerald/10 px-2 py-0.5 rounded">
                    Education Outreach
                  </span>
                </div>
                <div className="pt-1">
                  <span className="text-2xl sm:text-3xl font-extrabold text-accent-emerald-light font-mono block">
                    40 Copies
                  </span>
                  <span className="text-xs font-bold text-content-primary mt-0.5 block">
                    Holy Quran Distribution
                  </span>
                  <span className="text-[11px] text-content-secondary mt-1 block">
                    Distributed to religious classrooms and local community students.
                  </span>
                </div>
              </div>

              {/* Metric 3: Madrasa Tables */}
              <div className="rounded-xl bg-background/50 border border-border-muted/60 p-5 space-y-2 transition-all hover:border-accent-gold/50 group">
                <div className="flex items-center justify-between">
                  <div className="h-9 w-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-content-primary">
                    <School className="h-5 w-5 text-accent-gold" />
                  </div>
                  <span className="text-[10px] font-mono uppercase text-content-secondary bg-white/5 px-2 py-0.5 rounded">
                    Infrastructure Support
                  </span>
                </div>
                <div className="pt-1">
                  <span className="text-2xl sm:text-3xl font-extrabold text-content-primary font-mono block">
                    Class Tables
                  </span>
                  <span className="text-xs font-bold text-content-primary mt-0.5 block">
                    Provided to Local Madrasas
                  </span>
                  <span className="text-[11px] text-content-secondary mt-1 block">
                    Classroom study tables supplied to improve student learning facilities.
                  </span>
                </div>
              </div>
            </div>

            {/* Documented Activities List */}
            <div className="relative z-10 border-t border-white/5 pt-6 space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-content-muted block">
                Documented Service Activities
              </span>
              <div className="space-y-2.5">
                {service.activities.map((act, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-background/40 border border-border-muted/50 text-xs sm:text-sm text-content-secondary leading-relaxed"
                  >
                    <CheckCircle2 className="h-4 w-4 text-accent-emerald flex-shrink-0 mt-0.5" />
                    <span>{act}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      ))}
    </section>
  );
};

