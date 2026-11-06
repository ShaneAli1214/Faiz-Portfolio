import React from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ContactLinkProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
  isExternal?: boolean;
  className?: string;
}

export const ContactLink: React.FC<ContactLinkProps> = ({
  icon,
  label,
  value,
  href,
  isExternal = false,
  className,
}) => {
  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={cn(
        "group flex items-center justify-between p-4 sm:p-5 rounded-xl bg-background-secondary/80 border border-border-muted/70 transition-all duration-200 hover:border-accent-emerald/40 hover:bg-surface-hover hover:shadow-emerald-subtle",
        className
      )}
    >
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 rounded-lg bg-surface flex items-center justify-center text-accent-emerald border border-border-muted group-hover:border-accent-emerald/40 group-hover:scale-105 transition-all">
          {icon}
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-content-muted">
            {label}
          </p>
          <p className="text-sm sm:text-base font-semibold text-content-primary group-hover:text-accent-emerald-light transition-colors break-all">
            {value}
          </p>
        </div>
      </div>
      <div className="text-content-muted group-hover:text-accent-emerald transition-colors ml-2 flex-shrink-0">
        <ArrowUpRight className="h-4 w-4" />
      </div>
    </a>
  );
};

