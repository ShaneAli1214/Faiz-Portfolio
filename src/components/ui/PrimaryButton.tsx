import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonBaseProps {
  children: React.ReactNode;
  variant?: "emerald" | "gold";
  size?: "sm" | "md" | "lg";
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

interface ButtonAsButtonProps
  extends ButtonBaseProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  href?: undefined;
}

interface ButtonAsLinkProps extends ButtonBaseProps {
  href: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
}

export type PrimaryButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  variant = "emerald",
  size = "md",
  className,
  icon,
  iconPosition = "right",
  ...props
}) => {
  const sizeClasses = {
    sm: "px-3.5 py-1.5 text-xs font-medium",
    md: "px-5 py-2.5 text-sm font-semibold",
    lg: "px-6 py-3.5 text-base font-semibold",
  }[size];

  const variantClasses = {
    emerald:
      "bg-accent-emerald hover:bg-accent-emerald-dark text-background font-semibold shadow-emerald-subtle hover:shadow-lg transition-all duration-200 border border-accent-emerald/40",
    gold:
      "bg-accent-gold hover:bg-accent-gold-dark text-background font-semibold shadow-gold-subtle hover:shadow-lg transition-all duration-200 border border-accent-gold/40",
  }[variant];

  const baseClasses = cn(
    "inline-flex items-center justify-center rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-accent-emerald active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer gap-2",
    sizeClasses,
    variantClasses,
    className
  );

  if ("href" in props && props.href) {
    const { href, target, rel, onClick } = props;
    return (
      <Link href={href} target={target} rel={rel} onClick={onClick} className={baseClasses}>
        {icon && iconPosition === "left" && <span>{icon}</span>}
        <span>{children}</span>
        {icon && iconPosition === "right" && <span>{icon}</span>}
      </Link>
    );
  }

  const { type = "button", disabled, onClick } = props as ButtonAsButtonProps;
  return (
    <button type={type} disabled={disabled} onClick={onClick} className={baseClasses}>
      {icon && iconPosition === "left" && <span>{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === "right" && <span>{icon}</span>}
    </button>
  );
};
