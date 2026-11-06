import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "var(--background-primary, #11151C)",
          secondary: "var(--background-secondary, #1A202B)",
          tertiary: "var(--background-tertiary, #2B3544)",
          card: "var(--card-background, #222B38)",
          elevated: "var(--elevated-surface, #2B3544)",
        },
        surface: {
          DEFAULT: "var(--card-background, #222B38)",
          hover: "var(--background-tertiary, #2B3544)",
          elevated: "var(--elevated-surface, #2B3544)",
          active: "var(--border-muted, #354153)",
        },
        border: {
          subtle: "var(--border-subtle, #354153)",
          muted: "var(--border-muted, #354153)",
          emerald: "rgba(59, 145, 255, 0.35)",
          gold: "rgba(138, 190, 255, 0.4)",
          blue: "rgba(59, 145, 255, 0.4)",
        },
        accent: {
          emerald: {
            DEFAULT: "var(--accent-emerald, #3B91FF)",
            light: "var(--accent-emerald-light, #65ACFF)",
            dark: "var(--accent-emerald-dark, #1769D2)",
            deep: "#1256B0",
            muted: "rgba(59, 145, 255, 0.12)",
          },
          gold: {
            DEFAULT: "var(--accent-gold, #8ABEFF)",
            light: "var(--accent-gold-light, #B0D3FF)",
            dark: "var(--accent-gold-dark, #3B82C4)",
            muted: "rgba(138, 190, 255, 0.12)",
          },
          blue: {
            DEFAULT: "var(--primary-color, #3B91FF)",
            hover: "var(--primary-hover, #65ACFF)",
            light: "#8ABEFF",
            dark: "#1769D2",
          },
        },
        content: {
          primary: "var(--text-primary, #F2F5FA)",
          secondary: "var(--text-secondary, #AAB6C7)",
          muted: "var(--text-muted, #7F8DA2)",
        },
        semantic: {
          success: "var(--color-success, #23875B)",
          warning: "var(--color-warning, #D18A24)",
          error: "var(--color-error, #D94B4B)",
          info: "var(--color-info, #3284D6)",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      boxShadow: {
        "emerald-subtle": "0 0 25px -3px rgba(59, 145, 255, 0.28)",
        "gold-subtle": "0 0 25px -3px rgba(138, 190, 255, 0.28)",
        "card-elevation": "0 10px 30px -10px rgba(0, 0, 0, 0.5)",
        "card-hover-glow": "0 14px 40px -10px rgba(59, 145, 255, 0.22)",
      },
      keyframes: {
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.3", transform: "scale(1)" },
          "50%": { opacity: "0.7", transform: "scale(1.05)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "spin-slow": "spin-slow 25s linear infinite",
        float: "float 4s ease-in-out infinite",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        "fade-in-up": "fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
    },
  },
  plugins: [],
};

export default config;
