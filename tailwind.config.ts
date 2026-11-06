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
          DEFAULT: "var(--background-primary, #090D12)",
          secondary: "var(--background-secondary, #0F1720)",
          tertiary: "var(--background-tertiary, #15222E)",
          card: "var(--card-background, #0D151D)",
        },
        surface: {
          DEFAULT: "var(--card-background, #0F1720)",
          hover: "var(--background-tertiary, #15222E)",
          active: "#1C2D3D",
        },
        border: {
          subtle: "var(--border-subtle, rgba(255, 255, 255, 0.08))",
          muted: "var(--border-muted, #1E2D3B)",
          emerald: "rgba(16, 185, 129, 0.28)",
          gold: "rgba(212, 175, 55, 0.32)",
        },
        accent: {
          emerald: {
            DEFAULT: "var(--accent-emerald, #10B981)",
            light: "var(--accent-emerald-light, #34D399)",
            dark: "#059669",
            deep: "#064E3B",
            muted: "rgba(16, 185, 129, 0.12)",
          },
          gold: {
            DEFAULT: "var(--accent-gold, #D4AF37)",
            light: "var(--accent-gold-light, #F3E5AB)",
            dark: "#A38020",
            muted: "rgba(212, 175, 55, 0.12)",
          },
        },
        content: {
          primary: "var(--text-primary, #F8FAFC)",
          secondary: "var(--text-secondary, #94A3B8)",
          muted: "#64748B",
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
        "emerald-subtle": "0 0 25px -3px rgba(16, 185, 129, 0.25)",
        "gold-subtle": "0 0 25px -3px rgba(212, 175, 55, 0.25)",
        "card-elevation": "0 10px 30px -10px rgba(0, 0, 0, 0.6)",
        "card-hover-glow": "0 14px 40px -10px rgba(16, 185, 129, 0.2)",
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
