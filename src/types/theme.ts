export interface ThemePalette {
  mainBackground: string;
  secondaryBackground: string;
  cardBackground: string;
  elevatedSurface: string;
  primaryColor: string;
  primaryHover: string;
  secondaryAccent: string;
  mainText: string;
  secondaryText: string;
  mutedText: string;
  border: string;
  inputBackground: string;
  sidebarBackground: string;
  headerBackground: string;
  focusRing: string;
}

export interface SemanticColors {
  success: string;
  warning: string;
  error: string;
  info: string;
}

export interface ThemeConfig {
  mode?: "dark" | "light";
  dark: ThemePalette;
  light: ThemePalette;
  semantics: SemanticColors;

  // Backward compatibility fields for direct access
  primaryColor?: string;
  secondaryColor?: string;
  accentEmeraldLight?: string;
  accentGoldLight?: string;
  backgroundColor?: string;
  cardBackground?: string;
  headingColor?: string;
  bodyTextColor?: string;
  borderColor?: string;
  buttonPrimaryBg?: string;
  buttonPrimaryText?: string;
}

export const defaultLightPalette: ThemePalette = {
  mainBackground: "#F4F6F9",
  secondaryBackground: "#E8EDF4",
  cardBackground: "#FFFFFF",
  elevatedSurface: "#DCE5F0",
  primaryColor: "#1769D2",
  primaryHover: "#1256B0",
  secondaryAccent: "#3B82C4",
  mainText: "#292F3A",
  secondaryText: "#687386",
  mutedText: "#8994A5",
  border: "#D6DEE9",
  inputBackground: "#FFFFFF",
  sidebarBackground: "#EDF1F6",
  headerBackground: "#FFFFFF",
  focusRing: "#1769D2",
};

export const defaultDarkPalette: ThemePalette = {
  mainBackground: "#11151C",
  secondaryBackground: "#1A202B",
  cardBackground: "#222B38",
  elevatedSurface: "#2B3544",
  primaryColor: "#3B91FF",
  primaryHover: "#65ACFF",
  secondaryAccent: "#8ABEFF",
  mainText: "#F2F5FA",
  secondaryText: "#AAB6C7",
  mutedText: "#7F8DA2",
  border: "#354153",
  inputBackground: "#222B38",
  sidebarBackground: "#171E29",
  headerBackground: "#1A202B",
  focusRing: "#3B91FF",
};

export const defaultSemantics: SemanticColors = {
  success: "#23875B",
  warning: "#D18A24",
  error: "#D94B4B",
  info: "#3284D6",
};

export const defaultTheme: ThemeConfig = {
  mode: "dark",
  dark: defaultDarkPalette,
  light: defaultLightPalette,
  semantics: defaultSemantics,

  // Legacy mappings for top-level access
  primaryColor: defaultDarkPalette.primaryColor,
  secondaryColor: defaultDarkPalette.secondaryAccent,
  accentEmeraldLight: defaultDarkPalette.primaryHover,
  accentGoldLight: defaultDarkPalette.secondaryAccent,
  backgroundColor: defaultDarkPalette.mainBackground,
  cardBackground: defaultDarkPalette.cardBackground,
  headingColor: defaultDarkPalette.mainText,
  bodyTextColor: defaultDarkPalette.secondaryText,
  borderColor: defaultDarkPalette.border,
  buttonPrimaryBg: defaultDarkPalette.primaryColor,
  buttonPrimaryText: defaultDarkPalette.mainBackground,
};
