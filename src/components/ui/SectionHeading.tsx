import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  accent?: "emerald" | "gold";
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  subtitle,
  align = "left",
  accent = "emerald",
  className,
}) => {
  const alignClass = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto",
  }[align];

  const badgeColor =
    accent === "gold"
      ? "text-accent-gold-light border-accent-gold/30 bg-accent-gold/10"
      : "text-accent-emerald-light border-accent-emerald/30 bg-accent-emerald/10";

  return (
    <div className={cn("flex flex-col mb-10 md:mb-14", alignClass, className)}>
      {badge && (
        <span
          className={cn(
            "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider mb-3 border",
            badgeColor
          )}
        >
          {badge}
        </span>
      )}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-content-primary">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-base sm:text-lg text-content-secondary max-w-3xl leading-relaxed">
          {subtitle}
        </p>
      )}
      <div
        className={cn(
          "h-1 w-12 rounded-full mt-4",
          accent === "gold" ? "bg-accent-gold" : "bg-accent-emerald"
        )}
      />
    </div>
  );
};

