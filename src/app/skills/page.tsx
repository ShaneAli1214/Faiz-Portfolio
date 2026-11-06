import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { PortfolioService } from "@/lib/portfolio-service";
import { PageContainer } from "@/components/layout/PageContainer";
import { FadeIn } from "@/components/animations/FadeIn";
import { SkillsHero } from "@/components/skills/SkillsHero";
import { TechnicalSkillsSection } from "@/components/skills/TechnicalSkillsSection";
import { ProfessionalSkillsSection } from "@/components/skills/ProfessionalSkillsSection";
import { LearningCertificationsSection } from "@/components/skills/LearningCertificationsSection";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import {
  Layers,
  Sparkles,
  ArrowRight,
  Database,
  Briefcase,
  GraduationCap,
} from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Skills & Professional Expertise | Muhammad Faiz Waheed",
  description:
    "Technical and professional competencies of Muhammad Faiz Waheed: Software & Productivity (Microsoft Office), Data & Analytics (Power BI Basic), Enterprise Tools (SAP PS Module Basic, PROAACT, Primavera P6), Harvard Aspire and McKinsey Forward learning programs.",
  keywords: [
    "Muhammad Faiz Waheed Skills",
    "Chemical Engineering Competencies",
    "Power BI Basic",
    "SAP PS Module",
    "PROAACT",
    "Primavera P6",
    "Aspire Leaders Program",
    "McKinsey Forward Learner",
    "Responsible Supply Chain Skills",
  ],
  alternates: {
    canonical: "/skills",
  },
};

export default async function SkillsPage() {
  const data = await PortfolioService.getPortfolioDataAsync();
  const categories = data.skillCategories;
  const professionalSkills = PortfolioService.getProfessionalSkills();
  const learningPrograms = PortfolioService.getCertifications();

  return (
    <PageContainer>
      <div className="space-y-16 sm:space-y-24 py-4 sm:py-8">
        {/* 1. Skills Hero */}
        <SkillsHero />

        {/* 2. Technical Skills & Enterprise Systems */}
        <TechnicalSkillsSection categories={categories} />

        {/* 3. Professional Capabilities */}
        <ProfessionalSkillsSection skills={professionalSkills} />

        {/* 4. Professional Learning & Certifications */}
        <LearningCertificationsSection programs={learningPrograms} />

        {/* 5. Future Admin Panel CMS Indicator */}
        <FadeIn direction="up">
          <div className="rounded-xl bg-background-secondary/40 border border-dashed border-border-muted/70 p-6 sm:p-7 text-xs text-content-secondary space-y-2">
            <div className="flex items-center gap-2 text-accent-emerald-light font-mono font-semibold">
              <Database className="h-4 w-4 text-accent-emerald" />
              <span>Admin CMS Architecture • Skills & Program Management</span>
            </div>
            <p className="leading-relaxed">
              All technical skills, categories, professional capabilities, and executive programs are
              managed via modular data structures in <code className="text-accent-emerald-light bg-black/30 px-1.5 py-0.5 rounded">src/data/portfolioData.ts</code>.
              In the upcoming password-protected Admin Panel, authorized administrators can add, edit, or remove skills,
              update skill categories, log newly acquired certifications, and toggle program statuses between
              <span className="text-amber-300 font-mono"> &quot;In Progress&quot;</span> and
              <span className="text-accent-emerald-light font-mono"> &quot;Completed&quot;</span>.
            </p>
          </div>
        </FadeIn>

        {/* 6. Closing Inter-Page CTA */}
        <FadeIn direction="up">
          <div className="rounded-2xl bg-gradient-to-r from-background-secondary via-[#0C151C] to-background-secondary border border-border-muted/80 p-8 sm:p-12 text-center space-y-6 relative overflow-hidden shadow-card-elevation">
            <div className="absolute top-0 right-1/4 w-64 h-64 bg-accent-emerald/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-accent-gold/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-3">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-accent-emerald/10 border border-accent-emerald/30 text-accent-emerald-light font-semibold">
                <Sparkles className="h-3.5 w-3.5" />
                Applied Engineering & Operations
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-content-primary">
                Review Career Experience & Academic Honors
              </h3>
              <p className="text-sm sm:text-base text-content-secondary leading-relaxed">
                Explore how these competencies have been deployed across 11 group companies, EPC tie-ins,
                and distinguished NUST academic achievements.
              </p>
            </div>

            <div className="relative z-10 flex flex-wrap items-center justify-center gap-4 pt-2">
              <PrimaryButton href="/experience" size="lg" variant="emerald" className="gap-2">
                <Briefcase className="h-4 w-4" />
                <span>View Professional Experience</span>
                <ArrowRight className="h-4 w-4" />
              </PrimaryButton>
              <SecondaryButton href="/education" size="lg" className="gap-2">
                <GraduationCap className="h-4 w-4 text-accent-gold" />
                <span>Explore Education & Academic Honors</span>
              </SecondaryButton>
            </div>
          </div>
        </FadeIn>
      </div>
    </PageContainer>
  );
}
