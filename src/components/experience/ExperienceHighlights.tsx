"use client";

import React from "react";
import { Building2, Milestone, ShoppingCart, Percent } from "lucide-react";
import { motion } from "framer-motion";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { FadeIn } from "@/components/animations/FadeIn";

export const ExperienceHighlights: React.FC = () => {
  const highlights = [
    {
      icon: <Building2 className="h-6 w-6 text-accent-emerald" />,
      metric: "11 Companies",
      title: "Group-Wide Sustainability",
      description: "Driving circular economy, ESG reporting, and responsible supply chain initiatives across 11 Packages Group enterprises.",
      accent: "emerald",
    },
    {
      icon: <Milestone className="h-6 w-6 text-accent-gold" />,
      metric: "3+ EPC Projects",
      title: "Plant Tie-In & Turnarounds",
      description: "Monitored critical-path Primavera P6 schedules, budget-versus-actual variance, and risk exposure at Descon Engineering.",
      accent: "gold",
    },
    {
      icon: <ShoppingCart className="h-6 w-6 text-accent-emerald" />,
      metric: "500+ Orders",
      title: "E-Commerce Fulfillment",
      description: "End-to-end commercial order processing, demand pattern analysis, and inventory optimization at Daveyol Store.",
      accent: "emerald",
    },
    {
      icon: <Percent className="h-6 w-6 text-accent-gold" />,
      metric: "10% Margin",
      title: "Consistent Profitability",
      description: "Maintained a consistent 10% net profit margin overseeing sales, distribution, and purchasing at Faiz Traders.",
      accent: "gold",
    },
  ];

  return (
    <section className="py-14 sm:py-16 border-b border-border-muted/60 bg-background-secondary/40 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-24 bg-accent-emerald/5 blur-3xl rounded-full pointer-events-none animate-pulse-glow" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[11px] font-mono uppercase tracking-widest text-accent-emerald font-semibold">
            Proven Performance
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-content-primary mt-1">
            Experience Highlights
          </h2>
          <p className="text-sm text-content-secondary mt-2">
            Measurable operational, engineering, and commercial achievements across heavy industry and commercial trade.
          </p>
        </FadeIn>

        <StaggerContainer
          staggerChildren={0.12}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {highlights.map((item, idx) => (
            <StaggerItem key={idx}>
              <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="rounded-xl bg-background-secondary/90 border border-border-muted p-6 flex flex-col justify-between transition-colors duration-300 hover:border-accent-emerald/40 hover:shadow-card-hover-glow h-full"
              >
                <div>
                  <div className="h-12 w-12 rounded-xl bg-surface border border-border-muted flex items-center justify-center mb-4 transition-transform duration-200 group-hover:scale-110">
                    {item.icon}
                  </div>
                  <span className="text-2xl sm:text-3xl font-extrabold font-mono text-content-primary block mb-1">
                    {item.metric}
                  </span>
                  <h3 className="text-base font-bold text-content-primary mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-content-secondary leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-border-muted/40 text-[11px] font-mono text-content-muted flex items-center justify-between">
                  <span>Verified Metric</span>
                  <span className={item.accent === "gold" ? "text-accent-gold" : "text-accent-emerald"}>
                    ● Active Impact
                  </span>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};
