import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { FileText, ArrowRight, Mail, Briefcase, Award, CheckCircle2 } from "lucide-react";
import { PortfolioService } from "@/lib/portfolio-service";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { ExperienceTimeline } from "@/components/experience/ExperienceTimeline";
import { ExperienceHighlights } from "@/components/experience/ExperienceHighlights";
import { FadeIn } from "@/components/animations/FadeIn";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Professional Experience | Muhammad Faiz Waheed",
  description:
    "Industrial operations, project monitoring, circular economy initiatives, and commercial supply chain track record of Muhammad Faiz Waheed.",
  alternates: {
    canonical: "/experience",
  },
};

export default async function ExperiencePage() {
  const { experience } = await PortfolioService.getPortfolioDataAsync();

  return (
    <div className="flex flex-col w-full">
      {/* 1. PAGE INTRODUCTION / HERO */}
      <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 overflow-hidden border-b border-border-muted/60 bg-gradient-to-b from-background via-background-secondary/30 to-background">
        <div className="absolute top-0 right-1/3 w-96 h-96 bg-accent-emerald/5 blur-3xl rounded-full pointer-events-none animate-pulse-glow" />

        <PageContainer>
          <FadeIn className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-accent-emerald-light bg-accent-emerald/10 border border-accent-emerald/20 mb-4">
              <Briefcase className="h-3.5 w-3.5 text-accent-emerald" />
              Career Trajectory &amp; Roles
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-content-primary">
              Professional Experience
            </h1>

            <p className="mt-4 text-base sm:text-xl text-content-secondary leading-relaxed">
              Exploring my professional journey across engineering, sustainability, project
              monitoring and business operations.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <PrimaryButton
                href="/M.Faiz.Resume.pdf"
                variant="emerald"
                size="md"
                icon={<FileText className="h-4 w-4" />}
                target="_blank"
                rel="noopener noreferrer"
              >
                Download Resume (PDF)
              </PrimaryButton>

              <SecondaryButton
                href="/contact"
                variant="outline"
                size="md"
                icon={<Mail className="h-4 w-4 text-accent-emerald" />}
              >
                Discuss Opportunities
              </SecondaryButton>
            </div>
          </FadeIn>
        </PageContainer>
      </section>

      {/* 2. EXPERIENCE HIGHLIGHTS */}
      <ExperienceHighlights />

      {/* 3. CAREER TIMELINE */}
      <section className="py-20 sm:py-24 relative">
        <PageContainer maxWidth="xl">
          <FadeIn>
            <SectionHeading
              badge="Chronological Trajectory"
              title="Positions &amp; Operational Milestones"
              subtitle="Verified professional experience ordered latest first, detailing specific engineering deliverables, project controls, and commercial outcomes."
              accent="emerald"
            />
          </FadeIn>

          <ExperienceTimeline experiences={experience} />
        </PageContainer>
      </section>

      {/* 4. DOWNLOAD RESUME CALLOUT BANNER */}
      <section className="py-14 sm:py-16 bg-background-secondary/50 border-y border-border-muted/60 relative">
        <PageContainer maxWidth="lg">
          <FadeIn>
            <div className="rounded-2xl bg-gradient-to-br from-surface to-background-secondary border border-accent-emerald/30 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-card-elevation hover:border-accent-emerald/60 transition-colors duration-300">
              <div className="space-y-2 text-center md:text-left">
                <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-accent-gold-light bg-accent-gold/10 px-2.5 py-0.5 rounded border border-accent-gold/20">
                  <Award className="h-3.5 w-3.5 text-accent-gold" />
                  Verified Candidate Profile
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-content-primary">
                  Need a Complete Verified Resume?
                </h3>
                <p className="text-sm text-content-secondary max-w-xl">
                  Download the official curriculum vitae covering academic transcripts, industrial
                  trainings, project monitoring, and sustainability certifications.
                </p>
              </div>

              <div className="flex-shrink-0">
                <PrimaryButton
                  href="/M.Faiz.Resume.pdf"
                  variant="gold"
                  size="lg"
                  icon={<FileText className="h-4 w-4" />}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download Resume
                </PrimaryButton>
              </div>
            </div>
          </FadeIn>
        </PageContainer>
      </section>

      {/* 5. CLOSING CTA */}
      <section className="py-20 sm:py-28 relative text-center">
        <PageContainer maxWidth="md">
          <FadeIn>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-accent-emerald-light bg-accent-emerald/10 border border-accent-emerald/20 mb-4">
              Next Section
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-content-primary tracking-tight">
              Explore Technical Case Studies
            </h2>

            <p className="mt-3 text-base text-content-secondary">
              Discover applied engineering projects in circular economy modeling, plant shutdown
              tie-in monitoring, and supply chain logistics.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <PrimaryButton
                href="/projects"
                variant="emerald"
                size="lg"
                icon={<ArrowRight className="h-4 w-4" />}
              >
                View Projects &amp; Case Studies
              </PrimaryButton>

              <SecondaryButton
                href="/contact"
                variant="outline"
                size="lg"
                icon={<Mail className="h-4 w-4 text-accent-emerald" />}
              >
                Get in Touch
              </SecondaryButton>
            </div>
          </FadeIn>
        </PageContainer>
      </section>
    </div>
  );
}
