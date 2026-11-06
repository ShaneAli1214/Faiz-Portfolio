"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className,
  showLabel = false,
}) => {
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const hasDark = document.documentElement.classList.contains("dark");
    setIsDark(hasDark);

    const handleThemeChange = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    window.addEventListener("portfolio-theme-changed", handleThemeChange);
    return () => window.removeEventListener("portfolio-theme-changed", handleThemeChange);
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);

    if (nextDark) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("portfolio-theme-mode", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      localStorage.setItem("portfolio-theme-mode", "light");
    }

    window.dispatchEvent(new Event("portfolio-theme-changed"));
  };

  if (!mounted) {
    return (
      <button
        type="button"
        className={cn(
          "p-2 rounded-lg text-content-secondary border border-border-muted bg-surface/40 hover:bg-surface transition-colors",
          className
        )}
        aria-label="Toggle theme mode"
      >
        <span className="h-4 w-4 block" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        "flex items-center gap-2 p-2 rounded-lg text-content-secondary hover:text-content-primary border border-border-muted bg-surface/50 hover:bg-surface transition-all duration-200 hover:border-accent-emerald/40 group",
        className
      )}
      aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {isDark ? (
        <Sun className="h-4 w-4 text-accent-gold group-hover:rotate-45 transition-transform" />
      ) : (
        <Moon className="h-4 w-4 text-accent-emerald group-hover:-rotate-12 transition-transform" />
      )}
      {showLabel && (
        <span className="text-xs font-medium">
          {isDark ? "Light Mode" : "Dark Mode"}
        </span>
      )}
    </button>
  );
};
