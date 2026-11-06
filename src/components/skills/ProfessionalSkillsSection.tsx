"use client";

import React from "react";
import { ProfessionalSkillItem } from "@/types/portfolio";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MessageSquare, CalendarCheck, Compass, CheckCircle } from "lucide-react";

interface ProfessionalSkillsSectionProps {
  skills: ProfessionalSkillItem[];
}

export const ProfessionalSkillsSection: React.FC<ProfessionalSkillsSectionProps> = ({
  skills,
}) => {
  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case "MessageSquare":
        return <MessageSquare className="h-6 w-6 text-accent-emerald" />;
      case "CalendarCheck":
        return <CalendarCheck className="h-6 w-6 text-accent-gold" />;
      case "Compass":
        return <Compass className="h-6 w-6 text-accent-emerald-light" />;
      default:
        return <CheckCircle className="h-6 w-6 text-accent-emerald" />;
    }
  };

  return (
    <section className="space-y-8">
      <FadeIn direction="up">
        <SectionHeading
          badge="Leadership & Execution"
          title="Professional Capabilities"
          subtitle="Non-technical competencies driving cross-functional alignment, rigorous project tracking, and ethical leadership."
          accent="gold"
        />
      </FadeIn>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {skills.map((skill) => (
          <StaggerItem key={skill.id}>
            <div className="rounded-2xl bg-gradient-to-br from-background-secondary via-[#0D151D] to-background-secondary border border-border-muted/70 p-6 sm:p-7 backdrop-blur-sm h-full flex flex-col justify-between transition-all duration-300 hover:border-accent-gold/40 hover:-translate-y-1 hover:shadow-card-elevation group">
              <div>
                <div className="h-12 w-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-5 transition-transform group-hover:scale-105">
                  {getIcon(skill.iconName)}
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-accent-gold-light bg-accent-gold/10 px-2 py-0.5 rounded border border-accent-gold/20">
                    {skill.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-content-primary mb-3 group-hover:text-accent-gold-light transition-colors">
                  {skill.title}
                </h3>

                <p className="text-sm text-content-secondary leading-relaxed">
                  {skill.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-content-muted">
                <span className="flex items-center gap-1.5 text-accent-emerald-light">
                  <CheckCircle className="h-3.5 w-3.5 text-accent-emerald" />
                  Verified Core Trait
                </span>
                <span>Active Practice</span>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
};

