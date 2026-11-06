import React from "react";
import type { Metadata } from "next";
import { PortfolioService } from "@/lib/portfolio-service";
import { PageContainer } from "@/components/layout/PageContainer";
import { FadeIn } from "@/components/animations/FadeIn";
import { AchievementsHero } from "@/components/achievements/AchievementsHero";
import { AcademicAwardsSection } from "@/components/achievements/AcademicAwardsSection";
import { DevelopmentProgramsSection } from "@/components/achievements/DevelopmentProgramsSection";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import {
  Award,
  Sparkles,
  ArrowRight,
  Database,
  Users,
  Briefcase,
} from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Achievements & Recognition | Muhammad Faiz Waheed",
  description:
    "Scholastic honors and executive recognition for Muhammad Faiz Waheed: Rector's Gold Medalist at NUST, 4-year Dean's List honors recipient, Harvard Aspire Leaders Program, and McKinsey Forward Program.",
  keywords: [
    "Muhammad Faiz Waheed Achievements",
    "NUST Rector's Gold Medal",
    "Chemical Engineering Gold Medalist",
    "NUST Dean's List",
    "Aspire Leaders Harvard",
    "McKinsey Forward Learner",
    "Academic Awards Pakistan",
  ],
  alternates: {
    canonical: "/achievements",
  },
};

export default function AchievementsPage() {
  const awards = PortfolioService.getAwards();
  const programs = PortfolioService.getCertifications();

  return (
    <PageContainer>
      <div className="space-y-16 sm:space-y-24 py-4 sm:py-8">
        {/* 1. Page Hero */}
        <AchievementsHero />

        {/* 2. Academic Awards (Rector's Gold Medal & Dean's List) */}
        <AcademicAwardsSection awards={awards} />

        {/* 3. Professional Development Programs (Harvard Aspire & McKinsey Forward) */}
        <DevelopmentProgramsSection programs={programs} />

        {/* 4. Future Admin Panel CMS Indicator */}
        <FadeIn direction="up">
          <div className="rounded-xl bg-background-secondary/40 border border-dashed border-border-muted/70 p-6 sm:p-7 text-xs text-content-secondary space-y-2">
            <div className="flex items-center gap-2 text-accent-gold-light font-mono font-semibold">
              <Database className="h-4 w-4 text-accent-gold" />
              <span>Admin CMS Architecture • Recognition & Accolades Registry</span>
            </div>
            <p className="leading-relaxed">
              Academic awards, citations, and professional development programs are maintained in
              <code className="text-accent-emerald-light bg-black/30 px-1.5 py-0.5 rounded">src/data/portfolioData.ts</code>.
              In the upcoming password-protected Admin Panel, authorized administrators can add newly conferred distinctions,
              upload verified credential certificates, and migrate programs from
              <span className="text-amber-300 font-mono"> &quot;In Progress&quot;</span> to
              <span className="text-accent-emerald-light font-mono"> &quot;Completed&quot;</span> upon graduation.
            </p>
          </div>
        </FadeIn>

        {/* 5. Closing Inter-Page CTA */}
        <FadeIn direction="up">
          <div className="rounded-2xl bg-gradient-to-r from-background-secondary via-[#0C151C] to-background-secondary border border-border-muted/80 p-8 sm:p-12 text-center space-y-6 relative overflow-hidden shadow-card-elevation">
            <div className="absolute top-0 right-1/4 w-64 h-64 bg-accent-gold/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-accent-emerald/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-3">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-accent-gold/10 border border-accent-gold/30 text-accent-gold-light font-semibold">
                <Sparkles className="h-3.5 w-3.5" />
                Leadership Beyond Academia
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-content-primary">
                Explore Leadership & Community Impact
              </h3>
              <p className="text-sm sm:text-base text-content-secondary leading-relaxed">
                Discover how technical distinction pairs with student leadership at AIChE NUST
                and tangible humanitarian initiatives across local communities.
              </p>
            </div>

            <div className="relative z-10 flex flex-wrap items-center justify-center gap-4 pt-2">
              <PrimaryButton href="/leadership" size="lg" variant="gold" className="gap-2">
                <Users className="h-4 w-4" />
                <span>View Leadership & Community</span>
                <ArrowRight className="h-4 w-4" />
              </PrimaryButton>
              <SecondaryButton href="/projects" size="lg" className="gap-2">
                <Briefcase className="h-4 w-4 text-accent-emerald" />
                <span>Explore Technical Projects</span>
              </SecondaryButton>
            </div>
          </div>
        </FadeIn>
      </div>
    </PageContainer>
  );
}
