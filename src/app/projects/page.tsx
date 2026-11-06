import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { FolderGit2, ArrowRight, Mail, Sparkles, GraduationCap, Cpu, Layers } from "lucide-react";
import { PortfolioService } from "@/lib/portfolio-service";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { FeaturedAcademicProject } from "@/components/projects/FeaturedAcademicProject";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { FadeIn } from "@/components/animations/FadeIn";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Projects & Technical Work | Muhammad Faiz Waheed",
  description:
    "Engineering capstone, industrial plant tie-in monitoring, circular economy frameworks, and commercial supply chain optimization case studies.",
  alternates: {
    canonical: "/projects",
  },
};

export default function ProjectsPage() {
  const projects = PortfolioService.getProjects();

  const featuredAcademic =
    projects.find((p) => p.isFeaturedAcademic) || projects[0];

  return (
    <div className="flex flex-col w-full">
      {/* 1. PROJECTS HERO SECTION */}
      <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 overflow-hidden border-b border-border-muted/60 bg-gradient-to-b from-background via-background-secondary/30 to-background">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent-emerald/5 blur-3xl rounded-full pointer-events-none animate-pulse-glow" />

        <PageContainer>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Heading & Intro */}
            <FadeIn direction="left" className="lg:col-span-7 flex flex-col items-start text-left z-10">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-accent-emerald-light bg-accent-emerald/10 border border-accent-emerald/20 mb-4">
                <FolderGit2 className="h-3.5 w-3.5 text-accent-emerald" />
                Technical Case Studies &amp; Research
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-content-primary">
                Projects &amp; Technical Work
              </h1>

              <p className="mt-4 text-base sm:text-lg text-content-secondary max-w-2xl leading-relaxed">
                Applying rigorous chemical engineering principles, analytical modeling, and
                data-driven problem-solving to industrial operations, closed-loop sustainability,
                and enterprise logistics.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <PrimaryButton
                  href="/contact"
                  variant="emerald"
                  size="md"
                  icon={<Mail className="h-4 w-4" />}
                >
                  Discuss Project Collaboration
                </PrimaryButton>

                <SecondaryButton
                  href="/education"
                  variant="outline"
                  size="md"
                  icon={<GraduationCap className="h-4 w-4 text-accent-gold" />}
                >
                  View Academic Credentials
                </SecondaryButton>
              </div>
            </FadeIn>

            {/* Right Column: Sophisticated Engineering Visual */}
            <FadeIn direction="right" className="lg:col-span-5 flex justify-center z-10">
              <div className="relative w-full max-w-md aspect-[4/3] rounded-2xl bg-gradient-to-b from-[#111A22] to-[#0A1017] p-6 border border-border-muted shadow-card-elevation flex flex-col justify-between overflow-hidden">
                {/* Visual Grid Lines */}
                <div className="absolute inset-0 bg-[radial-gradient(#10B981_1px,transparent_1px)] [background-size:16px_16px] opacity-15" />

                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-xs font-mono text-accent-emerald-light font-semibold uppercase tracking-wider">
                    Engineering Systems Modeling
                  </span>
                  <div className="h-2 w-2 rounded-full bg-accent-emerald animate-pulse" />
                </div>

                {/* Vector Flow Animation Diagram */}
                <div className="relative z-10 my-auto py-2">
                  <svg viewBox="0 0 280 100" fill="none" className="w-full h-auto">
                    {/* Pipeline */}
                    <path
                      d="M20 50H80C100 50 110 25 130 25H160C180 25 190 75 210 75H260"
                      stroke="#10B981"
                      strokeWidth="2"
                      strokeDasharray="4 2"
                      className="opacity-80"
                    />
                    <circle cx="20" cy="50" r="5" fill="#10B981" />
                    <circle cx="145" cy="25" r="7" fill="#090D12" stroke="#D4AF37" strokeWidth="2" />
                    <circle cx="260" cy="75" r="5" fill="#34D399" />
                    <rect x="70" y="38" width="24" height="24" rx="4" fill="#090D12" stroke="#10B981" strokeWidth="1.5" />
                    <rect x="195" y="63" width="24" height="24" rx="4" fill="#090D12" stroke="#D4AF37" strokeWidth="1.5" />
                  </svg>
                </div>

                <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-content-muted pt-3 border-t border-border-muted/50">
                  <span>Thermodynamics &bull; Operations</span>
                  <span className="text-accent-gold">Verified Methodology</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </PageContainer>
      </section>

      {/* 2. FEATURED ACADEMIC PROJECT SECTION */}
      {featuredAcademic && (
        <section className="py-16 sm:py-20 relative">
          <PageContainer>
            <FadeIn>
              <div className="mb-8">
                <span className="text-xs font-mono uppercase tracking-widest text-accent-gold font-semibold">
                  Top Distinction Spotlight
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-content-primary mt-1">
                  Featured Academic Capstone
                </h2>
              </div>
            </FadeIn>

            <FeaturedAcademicProject project={featuredAcademic} />
          </PageContainer>
        </section>
      )}

      {/* 3. ALL PROJECTS & CATEGORY GALLERY */}
      <section className="py-16 sm:py-20 bg-background-secondary/30 border-y border-border-muted/60 relative">
        <PageContainer>
          <FadeIn className="text-center max-w-2xl mx-auto mb-10">
            <SectionHeading
              badge="Project Portfolio"
              title="Applied Engineering &amp; Operations Studies"
              subtitle="Explore technical projects categorized by domain. Select a category below to filter."
              align="center"
              accent="emerald"
            />
          </FadeIn>

          <ProjectGallery projects={projects} />
        </PageContainer>
      </section>

      {/* 4. CLOSING CTA */}
      <section className="py-20 sm:py-28 relative text-center">
        <PageContainer maxWidth="md">
          <FadeIn>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-accent-emerald-light bg-accent-emerald/10 border border-accent-emerald/20 mb-4">
              Academic Credentials
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-content-primary tracking-tight">
              Academic Honors &amp; Distinction
            </h2>

            <p className="mt-3 text-base text-content-secondary">
              Review BE Chemical Engineering degree transcripts, Rector&apos;s Gold Medal
              recognition, and Dean&apos;s Honor List placements at NUST.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <PrimaryButton
                href="/education"
                variant="gold"
                size="lg"
                icon={<ArrowRight className="h-4 w-4" />}
              >
                View Education &amp; Honors
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
