import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { PortfolioService } from "@/lib/portfolio-service";
import { PageContainer } from "@/components/layout/PageContainer";
import { FadeIn } from "@/components/animations/FadeIn";
import { EducationHero } from "@/components/education/EducationHero";
import { DegreeCard } from "@/components/education/DegreeCard";
import { AcademicAchievementsSection } from "@/components/education/AcademicAchievementsSection";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import {
  GraduationCap,
  Sparkles,
  ArrowRight,
  Database,
  Layers,
  Award,
} from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Education & Academic Excellence | Muhammad Faiz Waheed",
  description:
    "BE Chemical Engineering from National University of Sciences and Technology (NUST). CGPA 3.53, Rector's Gold Medalist, and 4-year Dean's List honor recipient.",
  keywords: [
    "Muhammad Faiz Waheed Education",
    "NUST Chemical Engineering",
    "Rector's Gold Medalist",
    "Dean's List NUST",
    "Chemical Engineer Pakistan",
    "SCME NUST",
  ],
  alternates: {
    canonical: "/education",
  },
};

export default async function EducationPage() {
  const data = await PortfolioService.getPortfolioDataAsync();
  const educationList = data.education;
  const achievements = data.academicAchievements || [];
  const primaryEducation = educationList[0];

  return (
    <PageContainer>
      <div className="space-y-16 sm:space-y-24 py-4 sm:py-8">
        {/* 1. Education Hero */}
        <EducationHero />

        {/* 2. Academic Background (NUST BE Chemical Engineering) */}
        <section className="space-y-6">
          <FadeIn direction="up">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-accent-gold-light font-semibold block mb-1">
                  Accredited Program
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-content-primary tracking-tight">
                  Academic Background
                </h2>
              </div>
              <span className="text-xs font-mono text-content-muted bg-background-secondary/80 border border-border-muted/60 px-3 py-1.5 rounded-lg w-fit">
                November 2021 – June 2025
              </span>
            </div>
          </FadeIn>

          {primaryEducation && <DegreeCard education={primaryEducation} />}
        </section>

        {/* 3. Academic Achievements (Rector's Gold Medal & Dean's List) */}
        <AcademicAchievementsSection achievements={achievements} />

        {/* 4. Future Admin Panel CMS Indicator */}
        <FadeIn direction="up">
          <div className="rounded-xl bg-background-secondary/40 border border-dashed border-border-muted/70 p-6 sm:p-7 text-xs text-content-secondary space-y-2">
            <div className="flex items-center gap-2 text-accent-gold-light font-mono font-semibold">
              <Database className="h-4 w-4 text-accent-gold" />
              <span>Admin CMS Architecture • Education & Academic Records</span>
            </div>
            <p className="leading-relaxed">
              All academic degrees, CGPA metrics, and scholastic honors are managed through
              modular schemas in <code className="text-accent-emerald-light bg-black/30 px-1.5 py-0.5 rounded">src/data/portfolioData.ts</code>.
              In the upcoming password-protected Admin Panel, authorized administrators can update degree details,
              log additional honors, and edit academic distinction parameters in real time.
            </p>
          </div>
        </FadeIn>

        {/* 5. Closing Inter-Page CTA */}
        <FadeIn direction="up">
          <div className="rounded-2xl bg-gradient-to-r from-background-secondary via-[#0C151C] to-background-secondary border border-border-muted/80 p-8 sm:p-12 text-center space-y-6 relative overflow-hidden shadow-card-elevation">
            <div className="absolute top-0 right-1/4 w-64 h-64 bg-accent-emerald/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-accent-gold/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-3">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-accent-gold/10 border border-accent-gold/30 text-accent-gold-light font-semibold">
                <Sparkles className="h-3.5 w-3.5" />
                Scholastic Rigor to Industrial Impact
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-content-primary">
                Explore Engineering Case Studies & Technical Capabilities
              </h3>
              <p className="text-sm sm:text-base text-content-secondary leading-relaxed">
                See how academic chemical engineering excellence translates into verified industry projects,
                plant turnaround monitoring, and circular economy governance.
              </p>
            </div>

            <div className="relative z-10 flex flex-wrap items-center justify-center gap-4 pt-2">
              <PrimaryButton href="/projects" size="lg" variant="gold" className="gap-2">
                <span>View Projects & Case Studies</span>
                <ArrowRight className="h-4 w-4" />
              </PrimaryButton>
              <SecondaryButton href="/skills" size="lg" className="gap-2">
                <Layers className="h-4 w-4 text-accent-emerald" />
                <span>Explore Technical & Professional Skills</span>
              </SecondaryButton>
            </div>
          </div>
        </FadeIn>
      </div>
    </PageContainer>
  );
}
