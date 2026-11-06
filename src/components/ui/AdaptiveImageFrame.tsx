"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Award, Sparkles, Atom } from "lucide-react";
import {
  PlacementImageSettings,
  ImageFrameStyle,
  ImageFitMode,
  ImageAspectRatio,
} from "@/types/portfolio";

interface AdaptiveImageFrameProps {
  settings?: PlacementImageSettings;
  fallbackUrl?: string;
  fullName: string;
  placement: "home" | "about";
  className?: string;
}

export const AdaptiveImageFrame: React.FC<AdaptiveImageFrameProps> = ({
  settings,
  fallbackUrl = "/uploads/WhatsApp_Image_2026-11-06_at_5_13_53_PM-1793976076109-wvmof.jpeg",
  fullName,
  placement,
  className = "",
}) => {
  const [imgError, setImgError] = useState(false);

  const activeUrl = settings?.url || fallbackUrl;
  const scale = settings?.scale ?? 1.0;
  const positionX = settings?.positionX ?? 50;
  const positionY = settings?.positionY ?? (settings?.fitMode === "cover" ? 20 : 50);
  const fitMode: ImageFitMode = settings?.fitMode || (placement === "home" ? "cover" : "contain");
  const frameStyle: ImageFrameStyle = settings?.frameStyle || (placement === "home" ? "auto" : "editorial");
  const aspectRatio: ImageAspectRatio = settings?.aspectRatio || "auto";
  const maxWidth = settings?.maxWidth || "standard";

  // Aspect ratio class mapping
  const aspectClass =
    aspectRatio === "portrait"
      ? "aspect-[3/4]"
      : aspectRatio === "tall"
      ? "aspect-[4/5]"
      : aspectRatio === "square"
      ? "aspect-square"
      : aspectRatio === "landscape"
      ? "aspect-[4/3]"
      : "aspect-[3/4]"; // Default to natural 3:4 portrait ratio

  // Max width class
  const maxWidthClass =
    maxWidth === "compact"
      ? "max-w-xs"
      : maxWidth === "wide"
      ? "max-w-md"
      : "max-w-sm";

  // Container styling depending on frame style
  const getFrameStyling = () => {
    switch (frameStyle) {
      case "minimal":
        return "border border-border-muted/80 bg-surface/90 shadow-lg rounded-3xl";
      case "glow":
        return "border border-accent-emerald/40 bg-surface/95 shadow-2xl shadow-accent-emerald/20 rounded-3xl";
      case "cutout":
        return "border-none bg-transparent shadow-none";
      case "editorial":
        return "border border-border-muted bg-gradient-to-br from-surface to-background-secondary rounded-3xl shadow-xl";
      case "auto":
      default:
        return "border border-border-muted/70 bg-gradient-to-b from-surface/90 via-background-secondary/90 to-surface/90 shadow-card-elevation rounded-3xl backdrop-blur-md";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`relative mx-auto w-full ${maxWidthClass} ${className}`}
    >
      {/* Background Lighting / Ambient Glow */}
      {frameStyle !== "minimal" && (
        <div
          className={`absolute -inset-3 rounded-3xl blur-3xl pointer-events-none opacity-60 transition-all ${
            frameStyle === "glow"
              ? "bg-gradient-to-tr from-accent-emerald/30 via-accent-gold/25 to-accent-emerald/20 animate-pulse-glow"
              : frameStyle === "cutout"
              ? "bg-gradient-to-t from-accent-emerald/25 via-transparent to-transparent"
              : "bg-gradient-to-tr from-accent-emerald/15 via-accent-gold/10 to-transparent"
          }`}
        />
      )}

      {/* Editorial Decorative Offset Frame (Editorial style only) */}
      {frameStyle === "editorial" && (
        <div className="absolute -inset-3 rounded-3xl border border-dashed border-accent-gold/30 -rotate-1 pointer-events-none" />
      )}

      {/* Main Adaptive Container */}
      <div
        className={`relative w-full ${aspectClass} overflow-hidden p-2.5 sm:p-3 flex flex-col items-center justify-center transition-all ${getFrameStyling()}`}
      >
        {/* Editorial Corner Brackets */}
        {frameStyle === "editorial" && (
          <>
            <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-accent-emerald z-10" />
            <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-accent-gold z-10" />
            <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-accent-gold z-10" />
            <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-accent-emerald z-10" />
          </>
        )}

        {/* Precision Rotating Outer Ring (for Home hero or Glow) */}
        {(frameStyle === "glow" || (placement === "home" && frameStyle === "auto")) && (
          <div className="absolute -inset-4 rounded-3xl border border-accent-emerald/20 border-dashed animate-spin-slow pointer-events-none" />
        )}

        {/* Inner Canvas */}
        {!imgError && activeUrl ? (
          <div className="relative w-full h-full rounded-2xl overflow-hidden flex items-center justify-center bg-background/40">
            {/* Subtle soft backdrop for contain mode */}
            {fitMode === "contain" && (
              <div className="absolute inset-0 bg-gradient-to-b from-background-secondary/60 via-surface/40 to-background-secondary/60 pointer-events-none" />
            )}

            {/* Soft gradient pedestal for cutout images */}
            {frameStyle === "cutout" && (
              <div className="absolute inset-0 bg-radial-gradient from-accent-emerald/10 via-transparent to-transparent pointer-events-none" />
            )}

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activeUrl}
              alt={fullName}
              style={{
                objectFit: fitMode,
                objectPosition: `${positionX}% ${positionY}%`,
                transform: `scale(${scale})`,
                transformOrigin: `${positionX}% ${positionY}%`,
                width: "100%",
                height: "100%",
                transition: "transform 0.15s ease-out, object-position 0.15s ease-out",
              }}
              className="relative select-none drop-shadow-md"
              onError={() => setImgError(true)}
            />
          </div>
        ) : (
          /* High-End Executive Monogram Fallback */
          <div className="flex flex-col items-center justify-center text-center p-6 w-full h-full rounded-2xl bg-gradient-to-b from-surface/90 to-background-secondary border border-border-muted/60 relative">
            <div className="relative mb-4 h-24 w-24 sm:h-28 sm:w-28 rounded-2xl bg-gradient-to-br from-accent-emerald/20 via-surface to-accent-gold/15 border border-accent-emerald/40 flex items-center justify-center text-accent-emerald shadow-emerald-subtle">
              <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-content-primary">
                MFW
              </span>
              <Atom className="absolute -bottom-2 -right-2 h-7 w-7 text-accent-gold bg-background-secondary rounded-full p-1 border border-accent-gold/40 animate-spin-slow" />
            </div>

            <p className="font-bold text-base sm:text-lg text-content-primary">
              {fullName}
            </p>
            <p className="text-xs text-accent-emerald-light font-mono mt-1">
              BE Chemical Engineering
            </p>
            <span className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold text-accent-gold bg-accent-gold/10 border border-accent-gold/25 shadow-sm">
              <Award className="h-3.5 w-3.5 text-accent-gold" />
              Rector&apos;s Gold Medalist
            </span>
          </div>
        )}

        {/* Floating Verified Badge (Positioned so it never covers the face or chest) */}
        {placement === "home" && frameStyle !== "cutout" && (
          <div className="absolute bottom-3 left-3 right-3 z-10 bg-background/90 backdrop-blur-md border border-border-muted/80 px-3 py-1.5 rounded-xl flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-accent-emerald" />
              <span className="text-[11px] font-semibold text-content-primary">
                Verified Candidate
              </span>
            </div>
            <span className="text-[10px] font-mono font-bold text-accent-gold-light bg-accent-gold/10 px-2 py-0.5 rounded">
              NUST 3.53 CGPA
            </span>
          </div>
        )}

        {placement === "about" && (
          <div className="absolute bottom-3 left-3 right-3 z-10 bg-background/90 backdrop-blur-md border border-border-muted/80 px-3 py-1.5 rounded-xl flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-accent-gold" />
              <span className="text-[11px] font-semibold text-content-primary">
                Gold Medalist
              </span>
            </div>
            <span className="text-[10px] font-mono text-accent-emerald-light bg-accent-emerald/10 px-2 py-0.5 rounded">
              SCME • NUST
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
};
