import React from "react";
import { cn } from "@/lib/utils";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
}

const maxWidthMap = {
  sm: "max-w-3xl",
  md: "max-w-4xl",
  lg: "max-w-5xl",
  xl: "max-w-6xl",
  "2xl": "max-w-7xl",
  full: "max-w-full",
};

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  className,
  maxWidth = "2xl",
}) => {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16",
        maxWidthMap[maxWidth],
        className
      )}
    >
      {children}
    </div>
  );
};

