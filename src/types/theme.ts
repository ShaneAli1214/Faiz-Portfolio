export interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  accentEmeraldLight: string;
  accentGoldLight: string;
  backgroundColor: string;
  cardBackground: string;
  headingColor: string;
  bodyTextColor: string;
  borderColor: string;
  buttonPrimaryBg?: string;
  buttonPrimaryText?: string;
}

export const defaultTheme: ThemeConfig = {
  primaryColor: "#10B981",
  secondaryColor: "#D4AF37",
  accentEmeraldLight: "#34D399",
  accentGoldLight: "#F3E5AB",
  backgroundColor: "#090D12",
  cardBackground: "#0F1720",
  headingColor: "#F8FAFC",
  bodyTextColor: "#94A3B8",
  borderColor: "rgba(255, 255, 255, 0.08)",
  buttonPrimaryBg: "#10B981",
  buttonPrimaryText: "#090D12",
};

