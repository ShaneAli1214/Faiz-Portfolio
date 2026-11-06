"use client";

import React from "react";
import { AdaptiveImageFrame } from "@/components/ui/AdaptiveImageFrame";
import { PlacementImageSettings } from "@/types/portfolio";

interface HeroHeadshotProps {
  photoUrl?: string;
  fullName: string;
  settings?: PlacementImageSettings;
  placement?: "home" | "about";
}

export const HeroHeadshot: React.FC<HeroHeadshotProps> = ({
  photoUrl,
  fullName,
  settings,
  placement = "home",
}) => {
  return (
    <AdaptiveImageFrame
      fullName={fullName}
      fallbackUrl={photoUrl}
      settings={settings}
      placement={placement}
    />
  );
};
