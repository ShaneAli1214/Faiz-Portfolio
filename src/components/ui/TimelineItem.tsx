import React from "react";
import { cn } from "@/lib/utils";

interface TimelineItemProps {
  title: string;
  organization: string;
  period?: string;
  location?: string;
  descriptionPoints: string[];
  tags?: string[];
  isCurrent?: boolean;
  isLast?: boolean;
  className?: string;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({
  title,
  organization,
  period,
  location,
  descriptionPoints,
  tags = [],
  isCurrent = false,
  isLast = false,
  className,
}) => {
  return (
    <div className={cn("relative pl-8 sm:pl-10 pb-10", isLast && "pb-0", className)}>
      {/* Vertical Timeline Stem */}
      {!isLast && (
        <span
          className="absolute left-[11px] sm:left-[15px] top-6 -bottom-0 w-[2px] bg-gradient-to-b from-accent-emerald/40 via-border-muted to-transparent"
          aria-hidden="true"
        />
      )}

      {/* Timeline Node Icon */}
      <span
        className={cn(
          "absolute left-0 sm:left-1 top-1.5 h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all duration-200",
          isCurrent
            ? "border-accent-emerald bg-background text-accent-emerald shadow-emerald-subtle"
            : "border-border-muted bg-background-secondary text-content-muted"
        )}
        aria-hidden="true"
      >
        <span
          className={cn(
            "h-2 w-2 rounded-full",
            isCurrent ? "bg-accent-emerald animate-pulse" : "bg-border-muted"
          )}
        />
      </span>

      {/* Timeline Content */}
      <div className="bg-background-secondary/60 border border-border-muted/50 rounded-xl p-5 sm:p-6 transition-all hover:border-accent-emerald/30">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 mb-2">
          <h3 className="text-lg sm:text-xl font-bold text-content-primary">
            {title}
          </h3>
          {period && (
            <span className="inline-flex items-center text-xs font-medium text-accent-emerald-light bg-accent-emerald/10 border border-accent-emerald/20 px-2.5 py-1 rounded-md w-fit">
              {period}
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-content-secondary font-medium mb-4">
          <span className="text-accent-gold">{organization}</span>
          {location && (
            <>
              <span className="text-content-muted">•</span>
              <span className="text-content-muted">{location}</span>
            </>
          )}
        </div>

        {descriptionPoints.length > 0 && (
          <ul className="space-y-2 mb-4">
            {descriptionPoints.map((point, index) => (
              <li key={index} className="text-sm text-content-secondary flex items-start gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-emerald mt-2 flex-shrink-0" />
                <span className="leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        )}

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2 border-t border-border-muted/30">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-xs font-mono text-content-muted bg-surface/80 border border-border-muted/60 px-2.5 py-0.5 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

