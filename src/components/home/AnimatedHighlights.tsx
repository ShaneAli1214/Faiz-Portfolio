"use client";

import React from "react";
import { HighlightMetric } from "@/types/portfolio";
import { Building2, Milestone, ShoppingCart, Wrench, HeartHandshake } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/animations/AnimatedCounter";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { FadeIn } from "@/components/animations/FadeIn";

interface AnimatedHighlightsProps {
  highlights: HighlightMetric[];
}

const iconMap: Record<string, React.ReactNode> = {
  "hl-companies": <Building2 className="h-5 w-5 text-accent-emerald" />,
  "hl-epc": <Milestone className="h-5 w-5 text-accent-gold" />,
  "hl-orders": <ShoppingCart className="h-5 w-5 text-accent-emerald" />,
  "hl-workshops": <Wrench className="h-5 w-5 text-accent-gold" />,
  "hl-fundraising": <HeartHandshake className="h-5 w-5 text-accent-emerald" />,
};

export const AnimatedHighlights: React.FC<AnimatedHighlightsProps> = ({
  highlights,
}) => {
  return (
    <section className="py-12 sm:py-16 border-y border-border-muted/60 bg-background-secondary/40 relative overflow-hidden">
      {/* Animated Subtle Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-32 bg-accent-emerald/5 blur-3xl rounded-full pointer-events-none animate-pulse-glow" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <FadeIn className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[11px] font-mono uppercase tracking-widest text-accent-emerald font-semibold">
            Track Record &amp; Impact
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-content-primary mt-1">
            Professional Highlights
          </h2>
          <p className="text-sm text-content-secondary mt-2">
            Demonstrated multi-disciplinary performance across industrial operations, project execution, and commercial management.
          </p>
        </FadeIn>

        <StaggerContainer
          staggerChildren={0.12}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6"
        >
          {highlights.map((item) => (
            <StaggerItem key={item.id}>
              <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="group relative rounded-xl bg-background-secondary/90 border border-border-muted p-5 sm:p-6 transition-all duration-300 hover:border-accent-emerald/40 hover:shadow-card-hover-glow flex flex-col justify-between h-full"
              >
                <div>
                  <div className="h-10 w-10 rounded-lg bg-surface border border-border-muted/80 flex items-center justify-center mb-4 group-hover:border-accent-emerald/40 group-hover:scale-110 transition-transform duration-200">
                    {iconMap[item.id] || (
                      <Building2 className="h-5 w-5 text-accent-emerald" />
                    )}
                  </div>

                  <div className="text-2xl sm:text-3xl font-extrabold text-content-primary tracking-tight font-mono group-hover:text-accent-emerald-light transition-colors">
                    <AnimatedCounter
                      target={item.numericTarget}
                      prefix={item.prefix}
                      suffix={item.suffix}
                    />
                  </div>

                  <div className="text-sm font-semibold text-content-primary mt-1.5">
                    {item.label}
                  </div>
                </div>

                <p className="text-xs text-content-muted mt-3 leading-relaxed border-t border-border-muted/40 pt-2.5">
                  {item.context}
                </p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};
