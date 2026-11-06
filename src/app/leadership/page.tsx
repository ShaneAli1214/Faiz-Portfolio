import React from "react";
import type { Metadata } from "next";
import { PortfolioService } from "@/lib/portfolio-service";
import { PageContainer } from "@/components/layout/PageContainer";
import { FadeIn } from "@/components/animations/FadeIn";
import { LeadershipHero } from "@/components/leadership/LeadershipHero";
import { LeadershipExperienceSection } from "@/components/leadership/LeadershipExperienceSection";
import { CommunityServiceSection } from "@/components/leadership/CommunityServiceSection";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import {
  Users,
  Heart,
  Sparkles,
  ArrowRight,
  Database,
  Briefcase,
  Mail,
} from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Leadership & Community Impact | Muhammad Faiz Waheed",
  description:
    "Student leadership and social impact initiatives of Muhammad Faiz Waheed: Director at AIChE NUST Student Chapter, Campus Event Planner, Thar Clean Water Pump fundraising (PKR 30,000), and Quran distribution.",
  keywords: [
    "Muhammad Faiz Waheed Leadership",
    "AIChE NUST Chapter",
    "Community Service Thar Water Pump",
    "NUST Event Planning",
    "Student Leadership Pakistan",
    "Social Responsibility",
  ],
  alternates: {
    canonical: "/leadership",
  },
};

export default function LeadershipPage() {
  const leadershipRoles = PortfolioService.getLeadership();
  const communityInitiatives = PortfolioService.getCommunityService();

  return (
    <PageContainer>
      <div className="space-y-16 sm:space-y-24 py-4 sm:py-8">
        {/* 1. Page Hero */}
        <LeadershipHero />

        {/* 2. Leadership Experience (AIChE Director & NUST Event Planner) */}
        <LeadershipExperienceSection roles={leadershipRoles} />

        {/* 3. Community Service & Humanitarian Impact */}
        <CommunityServiceSection initiatives={communityInitiatives} />

        {/* 4. Future Admin Panel CMS Indicator */}
        <FadeIn direction="up">
          <div className="rounded-xl bg-background-secondary/40 border border-dashed border-border-muted/70 p-6 sm:p-7 text-xs text-content-secondary space-y-2">
            <div className="flex items-center gap-2 text-accent-emerald-light font-mono font-semibold">
              <Database className="h-4 w-4 text-accent-emerald" />
              <span>Admin CMS Architecture • Leadership & Social Outreach Hub</span>
            </div>
            <p className="leading-relaxed">
              Leadership responsibilities, community projects, and verified impact metrics (such as funds raised
              and copies distributed) are dynamically loaded from <code className="text-accent-emerald-light bg-black/30 px-1.5 py-0.5 rounded">src/data/portfolioData.ts</code>.
              In the upcoming password-protected Admin Panel, authorized administrators can add upcoming leadership roles,
              record new community service drives, upload photographic documentation, and update quantitative impact statistics.
            </p>
          </div>
        </FadeIn>

        {/* 5. Closing Inter-Page CTA */}
        <FadeIn direction="up">
          <div className="rounded-2xl bg-gradient-to-r from-background-secondary via-[#0C151C] to-background-secondary border border-border-muted/80 p-8 sm:p-12 text-center space-y-6 relative overflow-hidden shadow-card-elevation">
            <div className="absolute top-0 right-1/4 w-64 h-64 bg-accent-emerald/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-accent-gold/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-3">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-accent-emerald/10 border border-accent-emerald/30 text-accent-emerald-light font-semibold">
                <Sparkles className="h-3.5 w-3.5" />
                Collaborative Impact & Purpose
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-content-primary">
                Let&apos;s Connect and Create Meaningful Value
              </h3>
              <p className="text-sm sm:text-base text-content-secondary leading-relaxed">
                Whether discussing responsible supply chain initiatives, engineering project tracking,
                or community partnerships, I welcome the opportunity to connect.
              </p>
            </div>

            <div className="relative z-10 flex flex-wrap items-center justify-center gap-4 pt-2">
              <PrimaryButton href="/contact" size="lg" variant="emerald" className="gap-2">
                <Mail className="h-4 w-4" />
                <span>Contact Muhammad Faiz Waheed</span>
                <ArrowRight className="h-4 w-4" />
              </PrimaryButton>
              <SecondaryButton href="/experience" size="lg" className="gap-2">
                <Briefcase className="h-4 w-4 text-accent-gold" />
                <span>Review Professional Experience</span>
              </SecondaryButton>
            </div>
          </div>
        </FadeIn>
      </div>
    </PageContainer>
  );
}
