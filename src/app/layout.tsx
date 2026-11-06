import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { ThemeService } from "@/lib/theme-service";
import { defaultDarkPalette, defaultLightPalette, defaultSemantics } from "@/types/theme";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://faizwaheed.com";

export const viewport: Viewport = {
  themeColor: "#11151C",
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Muhammad Faiz Waheed | Chemical Engineer | Sustainability & Business Operations",
    template: "%s | Muhammad Faiz Waheed",
  },
  description:
    "Professional portfolio of Muhammad Faiz Waheed – Chemical Engineer (NUST Rector's Gold Medalist, CGPA 3.53) specializing in Sustainability, Circular Economy, Responsible Supply Chain, and Project Tracking.",
  keywords: [
    "Muhammad Faiz Waheed",
    "Chemical Engineer",
    "Sustainability Professional",
    "Circular Economy",
    "Responsible Supply Chain",
    "Business Operations",
    "NUST Gold Medalist",
    "Primavera P6",
    "ESG",
    "Packages Group",
    "Descon Engineering",
  ],
  authors: [{ name: "Muhammad Faiz Waheed", url: baseUrl }],
  creator: "Muhammad Faiz Waheed",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Muhammad Faiz Waheed | Chemical Engineer & Sustainability Professional",
    description: "Engineering Sustainable Solutions. Driving Business Impact. Rector's Gold Medalist (NUST, CGPA 3.53).",
    url: baseUrl,
    siteName: "Muhammad Faiz Waheed Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Faiz Waheed | Chemical Engineer & Sustainability Professional",
    description: "Engineering Sustainable Solutions. Driving Business Impact.",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentTheme = ThemeService.getTheme();
  const dark = currentTheme.dark || defaultDarkPalette;
  const light = currentTheme.light || defaultLightPalette;
  const semantics = currentTheme.semantics || defaultSemantics;

  return (
    <html lang="en" suppressHydrationWarning className={`dark ${inter.variable}`}>
      <head>
        <JsonLd />
        <script
          id="theme-initializer"
          dangerouslySetInnerHTML={{
            __html: `(function() {
              try {
                var savedMode = localStorage.getItem('portfolio-theme-mode');
                if (savedMode === 'light') {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.classList.add('light');
                } else {
                  document.documentElement.classList.add('dark');
                  document.documentElement.classList.remove('light');
                }
              } catch (e) {}
            })();`,
          }}
        />
        <style
          id="dynamic-theme-vars"
          dangerouslySetInnerHTML={{
            __html: `
              :root {
                --background-primary: ${light.mainBackground};
                --background-secondary: ${light.secondaryBackground};
                --background-tertiary: ${light.elevatedSurface};
                --card-background: ${light.cardBackground};
                --elevated-surface: ${light.elevatedSurface};
                --primary-color: ${light.primaryColor};
                --primary-hover: ${light.primaryHover};
                --secondary-accent: ${light.secondaryAccent};
                --accent-emerald: ${light.primaryColor};
                --accent-emerald-light: ${light.secondaryAccent};
                --accent-emerald-dark: ${light.primaryHover};
                --accent-gold: ${light.secondaryAccent};
                --accent-gold-light: ${light.secondaryAccent};
                --accent-gold-dark: ${light.primaryHover};
                --text-primary: ${light.mainText};
                --text-secondary: ${light.secondaryText};
                --text-muted: ${light.mutedText};
                --border-subtle: ${light.border};
                --border-muted: ${light.border};
                --input-background: ${light.inputBackground};
                --sidebar-background: ${light.sidebarBackground};
                --header-background: ${light.headerBackground};
                --focus-ring: ${light.focusRing};
                --color-success: ${semantics.success};
                --color-warning: ${semantics.warning};
                --color-error: ${semantics.error};
                --color-info: ${semantics.info};
              }
              html.dark, :root.dark {
                --background-primary: ${dark.mainBackground};
                --background-secondary: ${dark.secondaryBackground};
                --background-tertiary: ${dark.elevatedSurface};
                --card-background: ${dark.cardBackground};
                --elevated-surface: ${dark.elevatedSurface};
                --primary-color: ${dark.primaryColor};
                --primary-hover: ${dark.primaryHover};
                --secondary-accent: ${dark.secondaryAccent};
                --accent-emerald: ${dark.primaryColor};
                --accent-emerald-light: ${dark.primaryHover};
                --accent-emerald-dark: ${dark.primaryColor};
                --accent-gold: ${dark.secondaryAccent};
                --accent-gold-light: ${dark.secondaryAccent};
                --accent-gold-dark: ${dark.primaryColor};
                --text-primary: ${dark.mainText};
                --text-secondary: ${dark.secondaryText};
                --text-muted: ${dark.mutedText};
                --border-subtle: ${dark.border};
                --border-muted: ${dark.border};
                --input-background: ${dark.inputBackground};
                --sidebar-background: ${dark.sidebarBackground};
                --header-background: ${dark.headerBackground};
                --focus-ring: ${dark.focusRing};
                --color-success: ${semantics.success};
                --color-warning: ${semantics.warning};
                --color-error: ${semantics.error};
                --color-info: ${semantics.info};
              }
            `,
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="bg-background text-content-primary min-h-screen flex flex-col font-sans selection:bg-accent-emerald selection:text-background antialiased"
      >
        {/* Accessible Skip Link for Keyboard Navigation */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-accent-emerald focus:text-background focus:font-bold focus:rounded-lg focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-accent-gold"
        >
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content" tabIndex={-1} className="flex-1 w-full focus:outline-none">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
