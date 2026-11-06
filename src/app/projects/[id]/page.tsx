import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  FolderGit2,
  Layers,
  Sparkles,
  Target,
  FileText,
  Mail,
  Award,
  ShieldCheck,
  Github,
  ExternalLink,
} from "lucide-react";
import { PortfolioService } from "@/lib/portfolio-service";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { ProjectVisual } from "@/components/home/ProjectVisual";
import { FadeIn } from "@/components/animations/FadeIn";

interface ProjectDetailsPageProps {
  params: {
    id: string;
  };
}

export function generateStaticParams() {
  return PortfolioService.getProjects().map((project) => ({
    id: project.id,
  }));
}

export function generateMetadata({ params }: ProjectDetailsPageProps) {
  const project = PortfolioService.getProjects().find((p) => p.id === params.id);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} | Muhammad Faiz Waheed`,
    description: project.summary,
    alternates: {
      canonical: `/projects/${project.id}`,
    },
  };
}

export default function ProjectDetailsPage({ params }: ProjectDetailsPageProps) {
  const project = PortfolioService.getProjects().find((p) => p.id === params.id);

  if (!project) {
    notFound();
  }

  return (
    <div className="flex flex-col w-full">
      {/* Top Header / Breadcrumb */}
      <section className="relative pt-10 pb-12 sm:pt-16 sm:pb-16 border-b border-border-muted/60 bg-gradient-to-b from-background via-background-secondary/30 to-background">
        <PageContainer>
          <FadeIn>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-content-secondary hover:text-accent-emerald transition-colors mb-6 group"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to All Projects</span>
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-accent-emerald-light bg-accent-emerald/10 border border-accent-emerald/20 px-3 py-1 rounded-full">
                {project.category}
              </span>

              {project.isFeaturedAcademic && (
                <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-accent-gold-light bg-accent-gold/10 border border-accent-gold/30 px-3 py-1 rounded-full">
                  <Award className="h-3.5 w-3.5 text-accent-gold" />
                  Rector&apos;s Gold Medal Winner
                </span>
              )}

              {project.verified && (
                <span className="inline-flex items-center gap-1 text-[11px] font-mono text-content-muted bg-surface px-2.5 py-0.5 rounded border border-border-muted">
                  <ShieldCheck className="h-3.5 w-3.5 text-accent-emerald" />
                  Verified Work
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-content-primary tracking-tight max-w-4xl">
              {project.title}
            </h1>

            <p className="mt-4 text-base sm:text-lg text-content-secondary max-w-3xl leading-relaxed">
              {project.summary}
            </p>

            {/* Links when legitimate */}
            {(project.githubUrl || project.liveDemoUrl) && (
              <div className="mt-6 flex flex-wrap gap-4">
                {project.githubUrl && (
                  <SecondaryButton
                    href={project.githubUrl}
                    variant="outline"
                    size="sm"
                    icon={<Github className="h-4 w-4" />}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Source Repository
                  </SecondaryButton>
                )}
                {project.liveDemoUrl && (
                  <PrimaryButton
                    href={project.liveDemoUrl}
                    variant="emerald"
                    size="sm"
                    icon={<ExternalLink className="h-4 w-4" />}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live Demo
                  </PrimaryButton>
                )}
              </div>
            )}
          </FadeIn>
        </PageContainer>
      </section>

      {/* Main Body */}
      <section className="py-16 sm:py-20 relative">
        <PageContainer>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Content Column */}
            <div className="lg:col-span-8 space-y-12">
              {/* Notice for Academic Placeholder */}
              {project.isPlaceholderDetails && (
                <FadeIn>
                  <div className="p-5 rounded-xl bg-surface/90 border border-accent-gold/40 shadow-sm flex items-start gap-3">
                    <Sparkles className="h-5 w-5 text-accent-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-accent-gold-light mb-1">
                        Verified Capstone • Documentation Note
                      </h4>
                      <p className="text-xs sm:text-sm text-content-secondary leading-relaxed">
                        {project.placeholderNotice}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              )}

              {/* 1. Problem Statement */}
              {project.problemStatement && (
                <FadeIn>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-accent-emerald" />
                      <h2 className="text-xl sm:text-2xl font-bold text-content-primary">
                        Problem Statement &amp; Context
                      </h2>
                    </div>
                    <p className="text-sm sm:text-base text-content-secondary leading-relaxed bg-background-secondary/60 border border-border-muted p-6 rounded-xl">
                      {project.problemStatement}
                    </p>
                  </div>
                </FadeIn>
              )}

              {/* 2. Objectives */}
              {project.objectives && project.objectives.length > 0 && (
                <FadeIn>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-accent-gold" />
                      <h2 className="text-xl sm:text-2xl font-bold text-content-primary">
                        Key Project Objectives
                      </h2>
                    </div>
                    <div className="bg-background-secondary/60 border border-border-muted p-6 rounded-xl">
                      <ul className="space-y-3">
                        {project.objectives.map((obj, idx) => (
                          <li
                            key={idx}
                            className="text-sm text-content-secondary flex items-start gap-3"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-accent-gold mt-2 flex-shrink-0" />
                            <span>{obj}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </FadeIn>
              )}

              {/* 3. Methodology & Implementation */}
              <FadeIn>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Layers className="h-5 w-5 text-accent-emerald" />
                    <h2 className="text-xl sm:text-2xl font-bold text-content-primary">
                      Methodology &amp; Implementation
                    </h2>
                  </div>
                  <div className="bg-background-secondary/60 border border-border-muted p-6 rounded-xl space-y-4">
                    {project.methodology && (
                      <div>
                        <h4 className="text-xs font-mono uppercase tracking-wider text-accent-emerald-light font-semibold mb-1">
                          Technical Methodology:
                        </h4>
                        <p className="text-sm text-content-secondary leading-relaxed">
                          {project.methodology}
                        </p>
                      </div>
                    )}
                    {project.implementation && (
                      <div className="pt-3 border-t border-border-muted/50">
                        <h4 className="text-xs font-mono uppercase tracking-wider text-accent-gold-light font-semibold mb-1">
                          Implementation Details:
                        </h4>
                        <p className="text-sm text-content-secondary leading-relaxed">
                          {project.implementation}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </FadeIn>

              {/* 4. Results & Outcomes */}
              {(project.results || (project.outcomes && project.outcomes.length > 0)) && (
                <FadeIn>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-accent-gold" />
                      <h2 className="text-xl sm:text-2xl font-bold text-content-primary">
                        Results &amp; Impact
                      </h2>
                    </div>
                    <div className="bg-background-secondary/60 border border-border-muted p-6 rounded-xl space-y-4">
                      {project.results && (
                        <p className="text-sm sm:text-base text-content-primary font-medium leading-relaxed">
                          {project.results}
                        </p>
                      )}

                      {project.outcomes && (
                        <ul className="space-y-2 pt-2">
                          {project.outcomes.map((out, idx) => (
                            <li
                              key={idx}
                              className="text-sm text-content-secondary flex items-start gap-2.5"
                            >
                              <CheckCircle2 className="h-4 w-4 text-accent-emerald flex-shrink-0 mt-0.5" />
                              <span>{out}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </FadeIn>
              )}
            </div>

            {/* Right Sidebar: Visual, Technologies, Meta */}
            <div className="lg:col-span-4 space-y-6">
              {/* Technical Schematic Box */}
              <FadeIn>
                <div className="rounded-2xl bg-background-secondary/90 border border-border-muted p-5 shadow-card-elevation">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-content-muted mb-3 font-semibold">
                    Technical Visual Schematic
                  </h4>
                  <ProjectVisual
                    type={project.visualType || "circular"}
                    className="h-48 mb-3"
                  />
                  <p className="text-[11px] font-mono text-content-muted text-center">
                    Engineered Vector Representation
                  </p>
                </div>
              </FadeIn>

              {/* Technologies Applied */}
              <FadeIn delay={0.1}>
                <div className="rounded-2xl bg-background-secondary/90 border border-border-muted p-6">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-content-muted mb-4 font-semibold">
                    Technologies &amp; Frameworks
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-mono font-medium text-content-primary bg-surface border border-border-muted px-2.5 py-1 rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>

              {/* Inquire Callout */}
              <FadeIn delay={0.15}>
                <div className="rounded-2xl bg-surface/80 border border-accent-emerald/30 p-6 space-y-4">
                  <h4 className="text-base font-bold text-content-primary">
                    Interested in this technical domain?
                  </h4>
                  <p className="text-xs text-content-secondary leading-relaxed">
                    Connect directly to discuss technical methodologies, project tracking, or
                    circular economy frameworks.
                  </p>
                  <PrimaryButton
                    href="/contact"
                    variant="emerald"
                    size="md"
                    icon={<Mail className="h-4 w-4" />}
                    className="w-full"
                  >
                    Initiate Discussion
                  </PrimaryButton>
                </div>
              </FadeIn>
            </div>
          </div>
        </PageContainer>
      </section>
    </div>
  );
}

