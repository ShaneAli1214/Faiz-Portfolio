import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  FileText,
  Briefcase,
  GraduationCap,
  ArrowRight,
  Award,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Layers,
  ShieldCheck,
  Mail,
  Linkedin,
} from "lucide-react";
import { PortfolioService } from "@/lib/portfolio-service";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { HeroHeadshot } from "@/components/home/HeroHeadshot";
import { AnimatedHighlights } from "@/components/home/AnimatedHighlights";
import { ProjectVisual } from "@/components/home/ProjectVisual";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Muhammad Faiz Waheed | Chemical Engineer | Sustainability & Business Operations",
  description:
    "Professional portfolio of Muhammad Faiz Waheed – Chemical Engineer (NUST Rector's Gold Medalist, CGPA 3.53) specializing in Sustainability, Circular Economy, Responsible Supply Chain, and Project Tracking.",
  alternates: {
    canonical: "/",
  },
};

export default async function HomePage() {
  const { profile, highlights, experience, projects, education, professionalInterests } =
    await PortfolioService.getPortfolioDataAsync();

  // Selected 3 experiences for homepage preview
  const previewExperiences = experience.filter((exp) =>
    ["exp-packages", "exp-descon", "exp-faiz-traders"].includes(exp.id)
  );

  return (
    <div className="flex flex-col w-full">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 overflow-hidden">
        {/* Subtle Background Lighting Mesh */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-accent-emerald/10 via-transparent to-transparent pointer-events-none blur-3xl animate-pulse-glow" />
        <div className="absolute top-1/4 right-10 w-72 h-72 bg-accent-gold/5 pointer-events-none blur-3xl rounded-full" />

        <PageContainer>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content Column */}
            <FadeIn direction="left" className="lg:col-span-7 flex flex-col items-start text-left z-10">
              {/* Verified Status Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface/90 border border-border-muted text-xs font-medium mb-6 backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-accent-emerald animate-pulse" />
                <span className="text-content-secondary">
                  Rector&apos;s Gold Medalist • NUST
                </span>
                <span className="text-border-muted">|</span>
                <span className="text-accent-gold-light font-mono font-semibold">
                  CGPA {profile.cgpa}
                </span>
              </div>

              {/* Candidate Full Name */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-content-primary leading-[1.15]">
                {profile.fullName}
              </h1>

              {/* Roles & Identity */}
              <div className="mt-3 text-lg sm:text-xl font-semibold flex flex-wrap items-center gap-x-2 text-content-secondary">
                <span className="text-accent-emerald">Chemical Engineer</span>
                <span className="text-content-muted">•</span>
                <span className="text-content-primary">
                  Sustainability &amp; Business Operations Professional
                </span>
              </div>

              {/* Tagline */}
              <p className="mt-4 text-base sm:text-lg text-accent-gold-light font-medium italic border-l-2 border-accent-gold/40 pl-3">
                &ldquo;{profile.tagline}&rdquo;
              </p>

              {/* Bio Summary Snippet */}
              <p className="mt-4 text-sm sm:text-base text-content-secondary max-w-2xl leading-relaxed">
                Bridging industrial process engineering with circular economy frameworks,
                responsible supply chains, and enterprise project tracking. Committed to
                engineering resilient, high-impact industrial solutions.
              </p>

              {/* Hero Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4 w-full sm:w-auto">
                <PrimaryButton
                  href="/experience"
                  variant="emerald"
                  size="lg"
                  icon={<ArrowRight className="h-4 w-4" />}
                  iconPosition="right"
                  className="w-full sm:w-auto"
                >
                  Explore My Experience
                </PrimaryButton>

                <SecondaryButton
                  href="/M.Faiz.Resume.pdf"
                  variant="outline"
                  size="lg"
                  icon={<FileText className="h-4 w-4 text-accent-gold" />}
                  iconPosition="left"
                  className="w-full sm:w-auto"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download Resume
                </SecondaryButton>
              </div>

              {/* Quick Contacts strip */}
              <div className="mt-8 pt-6 border-t border-border-muted/50 flex flex-wrap items-center gap-6 text-xs text-content-muted">
                <a
                  href={`mailto:${profile.contact.email}`}
                  className="flex items-center gap-1.5 hover:text-accent-emerald-light transition-colors"
                >
                  <Mail className="h-3.5 w-3.5 text-accent-emerald" />
                  <span>{profile.contact.email}</span>
                </a>
                <a
                  href={profile.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-accent-gold-light transition-colors"
                >
                  <Linkedin className="h-3.5 w-3.5 text-accent-gold" />
                  <span>LinkedIn Profile</span>
                </a>
              </div>
            </FadeIn>

            {/* Right Headshot / Portrait Column */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end z-10">
              <HeroHeadshot
                fullName={profile.fullName}
                photoUrl={profile.homeHeroImage?.url || profile.photoUrl}
                settings={profile.homeHeroImage}
                placement="home"
              />
            </div>
          </div>
        </PageContainer>
      </section>

      {/* 2. PROFESSIONAL HIGHLIGHTS (ANIMATED METRICS) */}
      <AnimatedHighlights highlights={highlights} />

      {/* 3. ABOUT ME PREVIEW */}
      <section className="py-20 sm:py-24 relative">
        <PageContainer>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <FadeIn className="lg:col-span-6">
              <SectionHeading
                badge="About Me"
                title="Engineering Precision Meets Sustainable Strategy"
                subtitle="A dedicated Chemical Engineer combining analytical rigor with strategic operational insight."
                accent="emerald"
              />

              <div className="space-y-4 text-sm sm:text-base text-content-secondary leading-relaxed">
                <p>
                  Graduating with a Bachelor of Engineering in Chemical Engineering from the
                  <strong className="text-content-primary font-semibold"> National University of Sciences and Technology (NUST)</strong> with
                  a CGPA of <strong className="text-accent-gold-light font-semibold">3.53</strong>, I was honored with the prestigious
                  <strong className="text-accent-gold font-semibold"> Rector&apos;s Gold Medal</strong> and multiple Dean&apos;s Honor List recognitions.
                </p>
                <p>
                  My professional ethos focuses on the convergence of industrial process efficiency,
                  circular economy methodologies, and end-to-end operational governance. I believe
                  engineering excellence is realized when sustainable environmental impact directly drives
                  long-term commercial viability.
                </p>
              </div>

              <div className="mt-8 flex items-center gap-4">
                <PrimaryButton
                  href="/about"
                  variant="emerald"
                  size="md"
                  icon={<ChevronRight className="h-4 w-4" />}
                >
                  Read Full Bio &amp; Journey
                </PrimaryButton>
              </div>
            </FadeIn>

            {/* Core Pillars Grid */}
            <StaggerContainer
              staggerChildren={0.1}
              className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {professionalInterests.slice(0, 4).map((interest, idx) => (
                <StaggerItem key={idx}>
                  <div className="rounded-xl bg-background-secondary/70 border border-border-muted p-5 transition-all duration-300 hover:border-accent-emerald/40 hover:-translate-y-1.5 hover:shadow-card-hover-glow h-full">
                    <div className="h-8 w-8 rounded-lg bg-accent-emerald/10 border border-accent-emerald/20 flex items-center justify-center text-accent-emerald mb-3">
                      {idx === 0 && <Layers className="h-4 w-4" />}
                      {idx === 1 && <TrendingUp className="h-4 w-4" />}
                      {idx === 2 && <Briefcase className="h-4 w-4" />}
                      {idx === 3 && <ShieldCheck className="h-4 w-4" />}
                    </div>
                    <h4 className="text-sm font-bold text-content-primary mb-1">
                      {interest.title}
                    </h4>
                    <p className="text-xs text-content-secondary leading-relaxed">
                      {interest.description}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </PageContainer>
      </section>

      {/* 4. EXPERIENCE PREVIEW */}
      <section className="py-20 sm:py-24 bg-background-secondary/30 border-y border-border-muted/60 relative">
        <PageContainer>
          <FadeIn className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <SectionHeading
              badge="Professional Trajectory"
              title="Verified Industrial & Operations Experience"
              subtitle="Practical experience spanning plant operations, EPC coordination, and commercial trade logistics."
              accent="emerald"
              className="mb-0"
            />
            <div className="mt-6 md:mt-0">
              <SecondaryButton
                href="/experience"
                variant="outline"
                size="md"
                icon={<ArrowRight className="h-4 w-4 text-accent-emerald" />}
              >
                View Full Experience
              </SecondaryButton>
            </div>
          </FadeIn>

          <StaggerContainer
            staggerChildren={0.12}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {previewExperiences.map((exp) => (
              <StaggerItem key={exp.id}>
                <div className="rounded-xl bg-background-secondary/90 border border-border-muted p-6 flex flex-col justify-between transition-all duration-300 hover:border-accent-emerald/40 hover:shadow-card-hover-glow hover:-translate-y-1.5 h-full">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono font-medium text-accent-gold-light bg-accent-gold/10 px-2.5 py-0.5 rounded border border-accent-gold/20">
                        Verified
                      </span>
                      <Briefcase className="h-4 w-4 text-content-muted" />
                    </div>
                    <h3 className="text-lg font-bold text-content-primary">
                      {exp.company}
                    </h3>
                    <p className="text-xs font-semibold text-accent-emerald-light mt-0.5 mb-3">
                      {exp.role}
                    </p>
                    <ul className="space-y-2 text-xs text-content-secondary">
                      {exp.responsibilities.slice(0, 3).map((resp, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-accent-emerald mt-0.5">•</span>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {exp.technologies && (
                    <div className="flex flex-wrap gap-1.5 pt-4 mt-4 border-t border-border-muted/50">
                      {exp.technologies.slice(0, 3).map((tech, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-mono text-content-muted bg-surface px-2 py-0.5 rounded border border-border-muted/60"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </PageContainer>
      </section>

      {/* 5. FEATURED PROJECTS */}
      <section className="py-20 sm:py-24 relative">
        <PageContainer>
          <FadeIn className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <SectionHeading
              badge="Case Studies"
              title="Featured Technical Projects"
              subtitle="Applied engineering, circular economy models, and project controls in practice."
              accent="emerald"
              className="mb-0"
            />
            <div className="mt-6 md:mt-0">
              <SecondaryButton
                href="/projects"
                variant="outline"
                size="md"
                icon={<ArrowRight className="h-4 w-4 text-accent-emerald" />}
              >
                View All Projects
              </SecondaryButton>
            </div>
          </FadeIn>

          <StaggerContainer
            staggerChildren={0.12}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {projects.map((project) => (
              <StaggerItem key={project.id}>
                <div className="group rounded-xl bg-background-secondary/80 border border-border-muted p-6 flex flex-col justify-between transition-all duration-300 hover:border-accent-emerald/40 hover:shadow-card-hover-glow hover:-translate-y-1.5 h-full">
                  <div>
                    {/* Clean Engineering Vector Visual (Zero Broken Assets) */}
                    <ProjectVisual
                      type={project.visualType || "circular"}
                      className="mb-5 group-hover:border-accent-emerald/30 transition-colors"
                    />

                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold uppercase tracking-wider text-accent-emerald-light">
                        {project.category}
                      </span>
                      <span className="text-[10px] font-mono text-content-muted">
                        Verified Study
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-content-primary mb-2.5 group-hover:text-accent-emerald-light transition-colors leading-snug">
                      {project.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-content-secondary leading-relaxed mb-4">
                      {project.summary}
                    </p>

                    {project.outcomes && (
                      <ul className="space-y-1.5 mb-4 border-t border-border-muted/40 pt-3">
                        {project.outcomes.map((outcome, idx) => (
                          <li
                            key={idx}
                            className="text-xs text-content-muted flex items-start gap-2"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5 text-accent-gold flex-shrink-0 mt-0.5" />
                            <span>{outcome}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border-muted/40 mt-auto">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-mono text-content-secondary bg-surface px-2 py-0.5 rounded border border-border-muted/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </PageContainer>
      </section>

      {/* 6. ACADEMIC EXCELLENCE */}
      <section className="py-20 sm:py-24 bg-background-secondary/40 border-y border-border-muted/60 relative">
        <PageContainer>
          <FadeIn>
            <div className="rounded-2xl bg-gradient-to-br from-surface to-background-secondary border border-accent-gold/30 p-8 sm:p-12 relative overflow-hidden shadow-card-elevation hover:border-accent-gold/60 transition-colors duration-300">
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-accent-gold/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                <div className="lg:col-span-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-accent-gold-light bg-accent-gold/10 border border-accent-gold/30 mb-4">
                    <Award className="h-3.5 w-3.5 text-accent-gold" />
                    <span>Academic Distinction</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-content-primary">
                    National University of Sciences and Technology (NUST)
                  </h2>

                  <p className="text-lg font-semibold text-accent-emerald-light mt-2">
                    BE Chemical Engineering • CGPA 3.53
                  </p>

                  <p className="text-sm sm:text-base text-content-secondary mt-4 max-w-2xl leading-relaxed">
                    Graduated with highest institutional honors including the prestigious
                    <strong className="text-content-primary"> Rector&apos;s Gold Medal</strong> for academic excellence
                    and continuous placement on the <strong className="text-content-primary">Dean&apos;s Honor List</strong>.
                    Strong foundation in process engineering thermodynamics, reaction kinetics, and unit operations.
                  </p>

                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <PrimaryButton
                      href="/education"
                      variant="gold"
                      size="md"
                      icon={<GraduationCap className="h-4 w-4" />}
                    >
                      View Education &amp; Academic Details
                    </PrimaryButton>
                  </div>
                </div>

                {/* Distinction Stat Callout */}
                <div className="lg:col-span-4 flex flex-col gap-4">
                  <div className="p-5 rounded-xl bg-background/80 border border-accent-gold/30 backdrop-blur-sm">
                    <span className="text-xs font-mono text-content-muted uppercase">
                      Institution Ranking
                    </span>
                    <div className="text-xl sm:text-2xl font-bold text-content-primary mt-1">
                      #1 Engineering University
                    </div>
                    <span className="text-xs text-content-muted mt-1 block">
                      NUST Pakistan
                    </span>
                  </div>

                  <div className="p-5 rounded-xl bg-background/80 border border-accent-emerald/30 backdrop-blur-sm">
                    <span className="text-xs font-mono text-content-muted uppercase">
                      Highest Honor
                    </span>
                    <div className="text-xl sm:text-2xl font-bold text-accent-gold mt-1">
                      Rector&apos;s Gold Medal
                    </div>
                    <span className="text-xs text-content-muted mt-1 block">
                      BE Chemical Engineering
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </PageContainer>
      </section>

      {/* 7. CLOSING CTA */}
      <section className="py-24 sm:py-32 relative text-center">
        {/* Subtle Ambient Center Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent-emerald/10 blur-3xl rounded-full pointer-events-none animate-pulse-glow" />

        <PageContainer maxWidth="lg">
          <FadeIn className="relative z-10 flex flex-col items-center">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-accent-emerald-light bg-accent-emerald/10 border border-accent-emerald/20 mb-4">
              Get in Touch
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-content-primary tracking-tight max-w-2xl">
              Let&apos;s Connect and Create Meaningful Impact.
            </h2>

            <p className="mt-4 text-base sm:text-lg text-content-secondary max-w-xl leading-relaxed">
              Open to conversations with international recruiters, engineering enterprises,
              and sustainability innovators seeking verified technical and operational leadership.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <PrimaryButton
                href="/contact"
                variant="emerald"
                size="lg"
                icon={<Mail className="h-4 w-4" />}
              >
                Initiate Conversation
              </PrimaryButton>

              <SecondaryButton
                href={profile.contact.linkedin}
                variant="outline"
                size="lg"
                icon={<Linkedin className="h-4 w-4 text-accent-gold" />}
                target="_blank"
                rel="noopener noreferrer"
              >
                Connect on LinkedIn
              </SecondaryButton>
            </div>
          </FadeIn>
        </PageContainer>
      </section>
    </div>
  );
}
