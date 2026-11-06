import React from "react";
import Link from "next/link";
import { ArrowUpRight, FolderGit2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  title: string;
  category: string;
  summary: string;
  technologies?: string[];
  outcomes?: string[];
  linkHref?: string;
  className?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  category,
  summary,
  technologies = [],
  outcomes = [],
  linkHref,
  className,
}) => {
  const CardContent = (
    <div
      className={cn(
        "group relative flex flex-col justify-between rounded-xl bg-background-secondary/80 border border-border-muted/70 p-6 sm:p-7 transition-all duration-300 hover:border-accent-emerald/40 hover:shadow-card-elevation hover:-translate-y-1 h-full",
        className
      )}
    >
      <div>
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-accent-emerald/10 text-accent-emerald border border-accent-emerald/20">
              <FolderGit2 className="h-4 w-4" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-accent-emerald-light">
              {category}
            </span>
          </div>
          {linkHref && (
            <span className="text-content-muted group-hover:text-accent-emerald transition-colors">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          )}
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-content-primary mb-2.5 group-hover:text-accent-emerald-light transition-colors">
          {title}
        </h3>

        <p className="text-sm text-content-secondary leading-relaxed mb-4">
          {summary}
        </p>

        {outcomes.length > 0 && (
          <ul className="mb-4 space-y-1.5 border-t border-border-muted/40 pt-3">
            {outcomes.map((item, idx) => (
              <li key={idx} className="text-xs text-content-muted flex items-start gap-2">
                <span className="text-accent-gold font-bold">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {technologies.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border-muted/40 mt-auto">
          {technologies.map((tech, idx) => (
            <span
              key={idx}
              className="text-[11px] font-mono font-medium text-content-secondary bg-surface px-2 py-0.5 rounded border border-border-muted/50"
            >
              {tech}
            </span>
          ))}
        </div>
      )}
    </div>
  );

  if (linkHref) {
    return (
      <Link href={linkHref} className="block h-full focus:outline-none">
        {CardContent}
      </Link>
    );
  }

  return CardContent;
};

