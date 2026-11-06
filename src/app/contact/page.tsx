import React from "react";
import type { Metadata } from "next";
import { PortfolioService } from "@/lib/portfolio-service";
import { PageContainer } from "@/components/layout/PageContainer";
import { FadeIn } from "@/components/animations/FadeIn";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactCards } from "@/components/contact/ContactCards";
import { ProfessionalAvailability } from "@/components/contact/ProfessionalAvailability";
import { ContactForm } from "@/components/contact/ContactForm";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import {
  Mail,
  Phone,
  Linkedin,
  Database,
  Briefcase,
  FileText,
  Sparkles,
} from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact & Inquiries | Muhammad Faiz Waheed",
  description:
    "Get in touch with Muhammad Faiz Waheed (BE Chemical Engineering, NUST Rector's Gold Medalist). Verified contact channels: faizwaheed9@gmail.com, +92 324 5007850, and LinkedIn.",
  keywords: [
    "Contact Muhammad Faiz Waheed",
    "Chemical Engineer Pakistan Contact",
    "Sustainability Consultant Inquiries",
    "Recruiter Contact",
    "faizwaheed9@gmail.com",
    "NUST Gold Medalist Contact",
  ],
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  const contactInfo = PortfolioService.getContactInfo();

  return (
    <PageContainer>
      <div className="space-y-12 sm:space-y-16 py-4 sm:py-8">
        {/* 1. Contact Hero */}
        <ContactHero />

        {/* 2. Two-Column Layout: Direct Details + Availability & Inquiry Form */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column (5 Cols): Contact Channels & Professional Availability */}
          <div className="lg:col-span-5 space-y-6">
            <FadeIn direction="up">
              <ContactCards contact={contactInfo} />
            </FadeIn>

            <FadeIn direction="up" delay={0.1}>
              <ProfessionalAvailability />
            </FadeIn>
          </div>

          {/* Right Column (7 Cols): Verified Contact Form */}
          <div className="lg:col-span-7">
            <FadeIn direction="left" delay={0.15}>
              <ContactForm />
            </FadeIn>
          </div>
        </section>

        {/* 3. Future Admin Panel CMS Indicator */}
        <FadeIn direction="up">
          <div className="rounded-xl bg-background-secondary/40 border border-dashed border-border-muted/70 p-6 sm:p-7 text-xs text-content-secondary space-y-2">
            <div className="flex items-center gap-2 text-accent-emerald-light font-mono font-semibold">
              <Database className="h-4 w-4 text-accent-emerald" />
              <span>Admin CMS Architecture • Contact & Communications Registry</span>
            </div>
            <p className="leading-relaxed">
              Contact channels (email, phone, LinkedIn), intro copy, and availability text are managed through
              <code className="text-accent-emerald-light bg-black/30 px-1.5 py-0.5 rounded">src/data/portfolioData.ts</code>.
              In the upcoming password-protected Admin Panel, authorized administrators can update contact info,
              manage availability parameters, and review incoming visitor inquiries stored securely in
              <code className="text-accent-emerald-light bg-black/30 px-1.5 py-0.5 rounded">src/data/inquiries.json</code>.
            </p>
          </div>
        </FadeIn>

        {/* 4. Quick Navigation Footer Strip */}
        <FadeIn direction="up">
          <div className="rounded-2xl bg-gradient-to-r from-background-secondary via-[#0C151C] to-background-secondary border border-border-muted/80 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="h-10 w-10 rounded-xl bg-accent-emerald/10 border border-accent-emerald/30 flex items-center justify-center text-accent-emerald flex-shrink-0">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-content-primary">
                  Review Complete Portfolio Materials
                </h4>
                <p className="text-xs text-content-secondary">
                  Explore verified work experience, technical projects, and academic honors.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <SecondaryButton href="/experience" size="sm" className="gap-1.5">
                <Briefcase className="h-3.5 w-3.5 text-accent-emerald" />
                <span>Experience</span>
              </SecondaryButton>
              <SecondaryButton href="/projects" size="sm" className="gap-1.5">
                <FileText className="h-3.5 w-3.5 text-accent-gold" />
                <span>Projects</span>
              </SecondaryButton>
            </div>
          </div>
        </FadeIn>
      </div>
    </PageContainer>
  );
}
