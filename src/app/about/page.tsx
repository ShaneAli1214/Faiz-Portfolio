import React from "react";
import Link from "next/link";
import {
  Award,
  GraduationCap,
  Briefcase,
  Layers,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Mail,
  Calendar,
  Building2,
  Compass,
  FileCheck,
  Brain,
  Lightbulb,
  Users,
  MessageSquare,
  Clock,
  Target,
} from "lucide-react";
import { PortfolioService } from "@/lib/portfolio-service";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { HeroHeadshot } from "@/components/home/HeroHeadshot";
import type { Metadata } from "next";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About Me | Muhammad Faiz Waheed | Chemical Engineer",
  description:
    "Professional background, career journey, academic honors, and core specializations of Muhammad Faiz Waheed – Chemical Engineer (NUST Rector's Gold Medalist, CGPA 3.53).",
  alternates: {
    canonical: "/about",
  },
};

export default async function AboutPage() {
  const {
    profile,
    careerJourney,
    professionalInterests,
    professionalValues,
  } = await PortfolioService.getPortfolioDataAsync();

  const valueIcons = [
    <Brain key="brain" className="h-5 w-5 text-accent-emerald" />,
    <Lightbulb key="bulb" className="h-5 w-5 text-accent-gold" />,
    <Users key="users" className="h-5 w-5 text-accent-emerald" />,
    <MessageSquare key="msg" className="h-5 w-5 text-accent-gold" />,
    <Clock key="clock" className="h-5 w-5 text-accent-emerald" />,
    <Target key="target" className="h-5 w-5 text-accent-gold" />,
  ];

  const interestIcons = [
    <Layers key="int-0" className="h-5 w-5 text-accent-emerald" />,
    <TrendingUp key="int-1" className="h-5 w-5 text-accent-gold" />,
    <ShieldCheck key="int-2" className="h-5 w-5 text-accent-emerald" />,
    <Compass key="int-3" className="h-5 w-5 text-accent-gold" />,
    <FileCheck key="int-4" className="h-5 w-5 text-accent-emerald" />,
    <Building2 key="int-5" className="h-5 w-5 text-accent-gold" />,
    <Clock key="int-6" className="h-5 w-5 text-accent-emerald" />,
    <Target key="int-7" className="h-5 w-5 text-accent-gold" />,
  ];

  return (
    <div className="flex flex-col w-full">
      {/* 1. ABOUT HERO SECTION */}
      <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 overflow-hidden border-b border-border-muted/60 bg-gradient-to-b from-background via-background-secondary/30 to-background">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent-emerald/5 blur-3xl rounded-full pointer-events-none animate-pulse-glow" />

        <PageContainer>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Heading & Intro */}
            <FadeIn direction="left" className="lg:col-span-7 flex flex-col items-start text-left z-10">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-accent-emerald-light bg-accent-emerald/10 border border-accent-emerald/20 mb-4">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-emerald animate-pulse" />
                Profile &amp; Background
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-content-primary">
                About Me
              </h1>

              <div className="mt-2 text-xl font-bold text-content-primary">
                {profile.fullName}
              </div>

              <p className="mt-1 text-sm sm:text-base font-semibold text-accent-emerald">
                {profile.professionalTitle}
              </p>

              {/* Exact Mandated Intro Statement */}
              <div className="mt-6 p-5 rounded-xl bg-surface/90 border-l-4 border-accent-emerald border-border-muted shadow-sm hover:border-accent-emerald transition-colors">
                <p className="text-base sm:text-lg text-content-primary font-medium leading-relaxed italic">
                  &ldquo;{profile.aboutIntro}&rdquo;
                </p>
              </div>

              {/* Verified Credentials Pills */}
              <div className="mt-6 flex flex-wrap gap-2 text-xs">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface border border-accent-gold/30 text-accent-gold-light font-medium">
                  <Award className="h-3.5 w-3.5 text-accent-gold" />
                  Rector&apos;s Gold Medalist
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface border border-border-muted text-content-secondary font-medium">
                  <GraduationCap className="h-3.5 w-3.5 text-accent-emerald" />
                  NUST BE Chemical Engineering
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface border border-border-muted text-content-secondary font-mono">
                  CGPA {profile.cgpa}
                </span>
              </div>
            </FadeIn>

            {/* Right Column: Headshot Frame */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end z-10">
              <HeroHeadshot
                fullName={profile.fullName}
                photoUrl={profile.aboutProfileImage?.url || profile.photoUrl}
                settings={profile.aboutProfileImage}
                placement="about"
              />
            </div>
          </div>
        </PageContainer>
      </section>

      {/* 2. PROFESSIONAL BIOGRAPHY */}
      <section className="py-20 sm:py-24 relative">
        <PageContainer>
          <div className="max-w-4xl mx-auto">
            <FadeIn>
              <SectionHeading
                badge="Professional Biography"
                title="Academic Distinction, Process Rigor &amp; Operational Leadership"
                subtitle="A structured overview of education, practical engineering exposure, and business operational contributions."
                accent="emerald"
              />
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="space-y-6 text-base sm:text-lg text-content-secondary leading-relaxed">
                <p>
                  I graduated with a Bachelor of Engineering in Chemical Engineering from the{" "}
                  <strong className="text-content-primary font-semibold">
                    National University of Sciences and Technology (NUST)
                  </strong>
                  , securing a cumulative grade point average of{" "}
                  <strong className="text-accent-gold-light font-semibold">3.53</strong>. In
                  recognition of top-tier academic performance and consistent technical excellence, I
                  was awarded the prestigious{" "}
                  <strong className="text-accent-gold font-semibold">Rector&apos;s Gold Medal</strong>{" "}
                  alongside repeated placements on the Dean&apos;s Honor List.
                </p>

                <p>
                  My professional trajectory is shaped by hands-on engineering project monitoring,
                  plant operations, and commercial systems. During my tenure at{" "}
                  <strong className="text-content-primary font-semibold">
                    Descon Engineering Limited
                  </strong>
                  , I engaged directly in industrial plant engineering workflows, milestone
                  scheduling, and plant turnaround tie-in coordination utilizing Primavera P6. Prior
                  field exposure as an engineering trainee at{" "}
                  <strong className="text-content-primary font-semibold">
                    Attock Oil Refinery Limited
                  </strong>{" "}
                  reinforced my foundational knowledge in refinery unit operations, distillation
                  columns, and occupational process safety compliance.
                </p>

                <p>
                  Presently at{" "}
                  <strong className="text-content-primary font-semibold">Packages Group</strong>, I am
                  actively involved in circular economy frameworks, responsible supply chain
                  initiatives, and sustainability metrics across 11 group enterprises. My focus
                  centers on evaluating material recovery loops, auditing supplier compliance
                  standards, and managing ESG reporting parameters that drive measurable industrial
                  decarbonization while safeguarding operational resilience.
                </p>

                <p>
                  In addition to heavy industrial environments, I possess extensive practical exposure
                  to commercial business operations. Having managed multi-channel order fulfillment,
                  inventory distribution, and commercial risk protocols at{" "}
                  <strong className="text-content-primary font-semibold">Faiz Traders</strong> and{" "}
                  <strong className="text-content-primary font-semibold">Daveyol Store</strong>, I
                  combine engineering precision with an understanding of commercial supply chains,
                  customer fulfillment, and financial performance.
                </p>
              </div>
            </FadeIn>

            {/* Factual Highlights Row */}
            <StaggerContainer className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-border-muted/60">
              <StaggerItem>
                <div className="p-4 rounded-xl bg-background-secondary/80 border border-border-muted hover:border-accent-gold/40 transition-colors">
                  <span className="text-xs font-mono text-accent-gold uppercase font-semibold">
                    Academic Benchmark
                  </span>
                  <p className="text-base font-bold text-content-primary mt-1">
                    Rector&apos;s Gold Medal
                  </p>
                  <p className="text-xs text-content-muted mt-0.5">
                    BE Chemical Engineering • NUST (3.53 CGPA)
                  </p>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="p-4 rounded-xl bg-background-secondary/80 border border-border-muted hover:border-accent-emerald/40 transition-colors">
                  <span className="text-xs font-mono text-accent-emerald uppercase font-semibold">
                    Industrial Core
                  </span>
                  <p className="text-base font-bold text-content-primary mt-1">
                    Project Controls &amp; Plant Ops
                  </p>
                  <p className="text-xs text-content-muted mt-0.5">
                    Descon Engineering &amp; Attock Oil Refinery
                  </p>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="p-4 rounded-xl bg-background-secondary/80 border border-border-muted hover:border-accent-gold/40 transition-colors">
                  <span className="text-xs font-mono text-accent-gold uppercase font-semibold">
                    Current Strategic Focus
                  </span>
                  <p className="text-base font-bold text-content-primary mt-1">
                    Circular Economy &amp; ESG
                  </p>
                  <p className="text-xs text-content-muted mt-0.5">
                    Packages Group (11 Group Companies)
                  </p>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </PageContainer>
      </section>

      {/* 3. MY PROFESSIONAL JOURNEY (CAREER TIMELINE) */}
      <section className="py-20 sm:py-24 bg-background-secondary/40 border-y border-border-muted/60 relative">
        <PageContainer>
          <div className="max-w-4xl mx-auto">
            <FadeIn>
              <SectionHeading
                badge="Career Milestones"
                title="My Professional Journey"
                subtitle="A chronological timeline of verified educational milestones, student leadership, industrial training, and professional roles."
                accent="emerald"
              />
            </FadeIn>

            <div className="relative pl-6 sm:pl-8 border-l-2 border-border-muted space-y-10 sm:space-y-12">
              {careerJourney.map((item, index) => {
                const isCurrent = item.isCurrent;

                return (
                  <FadeIn key={index} delay={index * 0.08} className="relative group">
                    {/* Timeline Node Dot */}
                    <div
                      className={`absolute -left-[31px] sm:-left-[39px] top-1.5 h-4 w-4 rounded-full border-2 bg-background transition-transform duration-200 group-hover:scale-125 ${
                        isCurrent
                          ? "border-accent-emerald bg-accent-emerald shadow-emerald-subtle"
                          : "border-accent-gold"
                      }`}
                    />

                    {/* Timeline Card */}
                    <div className="p-6 rounded-xl bg-background-secondary/90 border border-border-muted transition-all duration-300 hover:border-accent-emerald/40 hover:shadow-card-hover-glow hover:-translate-y-1">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-mono font-bold text-accent-gold-light bg-accent-gold/10 border border-accent-gold/25">
                          <Calendar className="h-3 w-3 text-accent-gold" />
                          {item.year}
                        </span>

                        <span className="text-[11px] font-mono uppercase tracking-wider text-content-muted bg-surface px-2 py-0.5 rounded border border-border-muted/60">
                          {item.category}
                        </span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold text-content-primary mt-2">
                        {item.title}
                      </h3>

                      <p className="text-sm font-semibold text-accent-emerald-light mt-0.5 mb-3">
                        {item.organization}
                      </p>

                      <p className="text-sm text-content-secondary leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </FadeIn>
                );
              })}
            </div>

            <p className="mt-8 text-xs text-content-muted italic text-center">
              * Note: Practical business and leadership activities ran concurrently alongside academic coursework at NUST.
            </p>
          </div>
        </PageContainer>
      </section>

      {/* 4. AREAS OF PROFESSIONAL INTEREST */}
      <section className="py-20 sm:py-24 relative">
        <PageContainer>
          <FadeIn>
            <SectionHeading
              badge="Specialization Domains"
              title="Areas of Professional Interest"
              subtitle="Core engineering principles, sustainability frameworks, and business systems driving my ongoing work."
              align="center"
              accent="emerald"
            />
          </FadeIn>

          <StaggerContainer
            staggerChildren={0.08}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {professionalInterests.map((interest, idx) => (
              <StaggerItem key={idx}>
                <div className="group rounded-xl bg-background-secondary/80 border border-border-muted p-6 flex flex-col justify-between transition-all duration-300 hover:border-accent-emerald/40 hover:shadow-card-hover-glow hover:-translate-y-1.5 h-full">
                  <div>
                    <div className="h-10 w-10 rounded-lg bg-surface border border-border-muted flex items-center justify-center mb-4 group-hover:border-accent-emerald/40 group-hover:scale-110 transition-transform duration-200">
                      {interestIcons[idx] || (
                        <Layers className="h-5 w-5 text-accent-emerald" />
                      )}
                    </div>

                    <h3 className="text-base font-bold text-content-primary mb-2 group-hover:text-accent-emerald-light transition-colors">
                      {interest.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-content-secondary leading-relaxed">
                      {interest.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-border-muted/40 flex items-center justify-between text-[11px] font-mono text-content-muted">
                    <span>Domain #{idx + 1}</span>
                    <span className="text-accent-emerald font-semibold">Active Focus</span>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </PageContainer>
      </section>

      {/* 5. PROFESSIONAL VALUES */}
      <section className="py-20 sm:py-24 bg-background-secondary/30 border-y border-border-muted/60 relative">
        <PageContainer>
          <FadeIn>
            <SectionHeading
              badge="Core Strengths"
              title="Professional Values &amp; Working Philosophy"
              subtitle="Demonstrated technical strengths and operational competencies applied across multidisciplinary engineering and business teams."
              accent="gold"
            />
          </FadeIn>

          <StaggerContainer
            staggerChildren={0.1}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {professionalValues.map((val, idx) => (
              <StaggerItem key={idx}>
                <div className="rounded-xl bg-background-secondary/90 border border-border-muted p-6 flex flex-col justify-between transition-all duration-200 hover:border-accent-gold/40 hover:-translate-y-1 hover:shadow-card-hover-glow h-full">
                  <div>
                    <div className="h-10 w-10 rounded-lg bg-surface border border-accent-gold/30 flex items-center justify-center mb-4">
                      {valueIcons[idx]}
                    </div>

                    <h3 className="text-lg font-bold text-content-primary mb-2">
                      {val.title}
                    </h3>

                    <p className="text-sm text-content-secondary leading-relaxed mb-4">
                      {val.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-border-muted/50 text-xs font-mono text-accent-gold-light bg-accent-gold/5 px-3 py-1.5 rounded border border-accent-gold/15">
                    <span className="text-content-muted block text-[10px] uppercase">
                      Evidence &amp; Context:
                    </span>
                    {val.strengthContext}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </PageContainer>
      </section>

      {/* 6. CAREER DIRECTION */}
      <section className="py-20 sm:py-24 relative">
        <PageContainer>
          <FadeIn>
            <div className="rounded-2xl bg-gradient-to-br from-surface to-background-secondary border border-border-muted p-8 sm:p-12 shadow-card-elevation relative overflow-hidden">
              {/* Ambient Background Accent */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-accent-emerald/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

              <div className="relative z-10 max-w-3xl">
                <span className="text-xs font-mono uppercase tracking-widest text-accent-gold font-semibold">
                  Strategic Vision
                </span>

                <h2 className="text-3xl sm:text-4xl font-extrabold text-content-primary tracking-tight mt-2 mb-6">
                  Where Engineering Meets Sustainable Business
                </h2>

                <div className="space-y-4 text-base sm:text-lg text-content-secondary leading-relaxed">
                  <p>
                    Industrial enterprises are currently navigating the dual imperative of operational
                    profitability and rigorous environmental compliance. My professional aspiration is
                    to bridge the gap between chemical process engineering, data-backed operational
                    tracking, and sustainability frameworks.
                  </p>

                  <p>
                    By applying mass-balance methodologies, lifecycle assessments, and closed-loop
                    circular economy models to manufacturing environments, I aim to help organizations
                    minimize industrial footprint while maximizing resource efficiency and supply chain
                    resilience.
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-border-muted/60 flex flex-wrap gap-4 text-xs font-mono text-content-muted">
                  <span className="flex items-center gap-1.5 text-accent-emerald-light">
                    <CheckCircle2 className="h-4 w-4 text-accent-emerald" />
                    Circular Economy Integration
                  </span>
                  <span className="flex items-center gap-1.5 text-accent-emerald-light">
                    <CheckCircle2 className="h-4 w-4 text-accent-emerald" />
                    Industrial Decarbonization &amp; ESG
                  </span>
                  <span className="flex items-center gap-1.5 text-accent-emerald-light">
                    <CheckCircle2 className="h-4 w-4 text-accent-emerald" />
                    Operational Systems Governance
                  </span>
                </div>
              </div>
            </div>
          </FadeIn>
        </PageContainer>
      </section>

      {/* 7. CALL TO ACTION */}
      <section className="py-20 sm:py-28 relative text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent-emerald/10 blur-3xl rounded-full pointer-events-none animate-pulse-glow" />

        <PageContainer maxWidth="lg">
          <FadeIn className="relative z-10 flex flex-col items-center">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-accent-emerald-light bg-accent-emerald/10 border border-accent-emerald/20 mb-4">
              Next Steps
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-content-primary tracking-tight max-w-2xl">
              Interested in Working Together?
            </h2>

            <p className="mt-4 text-base sm:text-lg text-content-secondary max-w-xl leading-relaxed">
              Explore my verified technical experience across engineering enterprises or get in
              touch to discuss prospective collaborations and opportunities.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <PrimaryButton
                href="/experience"
                variant="emerald"
                size="lg"
                icon={<ArrowRight className="h-4 w-4" />}
              >
                Explore My Experience
              </PrimaryButton>

              <SecondaryButton
                href="/contact"
                variant="outline"
                size="lg"
                icon={<Mail className="h-4 w-4 text-accent-emerald" />}
              >
                Contact Me
              </SecondaryButton>
            </div>
          </FadeIn>
        </PageContainer>
      </section>
    </div>
  );
}
