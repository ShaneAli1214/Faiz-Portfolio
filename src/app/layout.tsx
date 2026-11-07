import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { ThemeService } from "@/lib/theme-service";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://faizwaheed.com";

export const viewport: Viewport = {
  themeColor: "#090D12",
  colorScheme: "dark",
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

  return (
    <html lang="en" suppressHydrationWarning className={`dark ${inter.variable}`}>
      <head>
        <JsonLd />
        <style
          id="dynamic-theme-vars"
          dangerouslySetInnerHTML={{
            __html: `
              :root {
                --background-primary: ${currentTheme.backgroundColor};
                --background-secondary: ${currentTheme.cardBackground};
                --card-background: ${currentTheme.cardBackground};
                --accent-emerald: ${currentTheme.primaryColor};
                --accent-emerald-light: ${currentTheme.accentEmeraldLight || "#34D399"};
                --accent-gold: ${currentTheme.secondaryColor};
                --accent-gold-light: ${currentTheme.accentGoldLight || "#F3E5AB"};
                --text-primary: ${currentTheme.headingColor};
                --text-secondary: ${currentTheme.bodyTextColor};
                --border-subtle: ${currentTheme.borderColor};
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
