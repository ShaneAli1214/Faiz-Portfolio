"use client";

import React from "react";
import { FadeIn } from "@/components/animations/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Mail, MessageSquare, ShieldCheck, CheckCircle2 } from "lucide-react";

export const ContactHero: React.FC = () => {
  return (
    <section className="relative pt-6 sm:pt-10 pb-8 sm:pb-12 border-b border-border-muted/50">
      <div className="max-w-3xl space-y-4">
        <FadeIn direction="up">
          <SectionHeading
            badge="Get in Touch"
            title="Let's Connect"
            subtitle="Interested in discussing engineering, sustainability, supply chain, or professional opportunities? Feel free to get in touch."
            accent="emerald"
          />
        </FadeIn>

        <FadeIn direction="up" delay={0.1}>
          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono text-content-muted">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-emerald/10 border border-accent-emerald/20 text-accent-emerald-light">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Verified Direct Channels
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-content-secondary">
              <ShieldCheck className="h-3.5 w-3.5 text-accent-gold" />
              Secure Message Delivery
            </span>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

