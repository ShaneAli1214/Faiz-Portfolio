import React from "react";
import { cn } from "@/lib/utils";

interface ProfessionalCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  accentBorder?: "none" | "emerald" | "gold";
  padding?: "none" | "sm" | "md" | "lg";
}

const paddingMap = {
  none: "p-0",
  sm: "p-4 sm:p-5",
  md: "p-6 sm:p-7",
  lg: "p-8 sm:p-10",
};

export const ProfessionalCard: React.FC<ProfessionalCardProps> = ({
  children,
  className,
  hoverEffect = true,
  accentBorder = "none",
  padding = "md",
}) => {
  const accentBorderClass = {
    none: "border-border-muted/60",
    emerald: "border-accent-emerald/30 hover:border-accent-emerald/60",
    gold: "border-accent-gold/30 hover:border-accent-gold/60",
  }[accentBorder];

  return (
    <div
      className={cn(
        "rounded-xl bg-background-secondary/80 backdrop-blur-md border transition-all duration-300 relative overflow-hidden",
        paddingMap[padding],
        accentBorderClass,
        hoverEffect && "hover:shadow-card-elevation hover:-translate-y-1 hover:border-accent-emerald/30",
        className
      )}
    >
      {children}
    </div>
  );
};

