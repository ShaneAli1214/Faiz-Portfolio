"use client";

import React from "react";
import { Briefcase, Leaf, Network, Sparkles, CheckCircle2 } from "lucide-react";

export const ProfessionalAvailability: React.FC = () => {
  const availabilityFocusAreas = [
    {
      icon: <Briefcase className="h-5 w-5 text-accent-emerald" />,
      title: "Professional Opportunities",
      description:
        "Open for discussions regarding engineering roles, project monitoring, operational risk compliance, and responsible supply chain leadership.",
    },
    {
      icon: <Leaf className="h-5 w-5 text-accent-gold" />,
      title: "Engineering & Sustainability Discussions",
      description:
        "Welcoming dialogue on industrial circular economy frameworks, EPR compliance, material recovery modeling, and ESG reporting standards.",
    },
    {
      icon: <Network className="h-5 w-5 text-accent-emerald-light" />,
      title: "Collaboration & Networking",
      description:
        "Connecting with fellow chemical engineers, sustainability executives, academic collaborators, and industrial partners.",
    },
  ];

  return (
    <div className="rounded-2xl bg-gradient-to-br from-background-secondary via-[#0C151A] to-background-secondary border border-border-muted/70 p-6 sm:p-7 space-y-5">
      <div className="flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-accent-gold" />
        <h3 className="text-base sm:text-lg font-bold text-content-primary">
          Professional Availability & Scope
        </h3>
      </div>

      <div className="space-y-4">
        {availabilityFocusAreas.map((area, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3.5 p-3.5 rounded-xl bg-background/50 border border-border-muted/50 transition-colors hover:border-border-muted"
          >
            <div className="h-9 w-9 rounded-lg bg-surface flex items-center justify-center border border-border-muted flex-shrink-0 mt-0.5">
              {area.icon}
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold text-content-primary">
                {area.title}
              </h4>
              <p className="text-xs text-content-secondary leading-relaxed">
                {area.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-2 border-t border-white/5 flex items-center gap-2 text-xs font-mono text-content-muted">
        <CheckCircle2 className="h-3.5 w-3.5 text-accent-emerald" />
        <span>Inquiries are typically answered within 24–48 hours</span>
      </div>
    </div>
  );
};

