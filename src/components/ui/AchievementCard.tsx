import React from "react";
import { Award } from "lucide-react";
import { cn } from "@/lib/utils";

interface AchievementCardProps {
  title: string;
  institution: string;
  year?: string;
  description: string;
  badge?: string;
  className?: string;
}

export const AchievementCard: React.FC<AchievementCardProps> = ({
  title,
  institution,
  year,
  description,
  badge = "Honor & Award",
  className,
}) => {
  return (
    <div
      className={cn(
        "group relative rounded-xl bg-background-secondary/70 border border-border-muted/70 p-6 sm:p-7 transition-all duration-300 hover:border-accent-gold/40 hover:shadow-card-elevation hover:-translate-y-1",
        className
      )}
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="h-10 w-10 rounded-lg bg-accent-gold/10 border border-accent-gold/30 flex items-center justify-center text-accent-gold group-hover:scale-105 transition-transform">
          <Award className="h-5 w-5" />
        </div>
        {badge && (
          <span className="text-[11px] font-semibold uppercase tracking-wider text-accent-gold-light bg-accent-gold/10 border border-accent-gold/20 px-2.5 py-0.5 rounded-full">
            {badge}
          </span>
        )}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
        <h3 className="text-lg font-bold text-content-primary group-hover:text-accent-gold transition-colors">
          {title}
        </h3>
        {year && (
          <span className="text-xs font-mono text-content-muted">{year}</span>
        )}
      </div>

      <p className="text-sm font-medium text-accent-emerald-light mb-3">
        {institution}
      </p>

      <p className="text-sm text-content-secondary leading-relaxed">
        {description}
      </p>
    </div>
  );
};

