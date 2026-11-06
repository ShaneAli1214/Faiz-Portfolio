import React from "react";
import { initialPortfolioData } from "@/data/portfolioData";

export const JsonLd: React.FC = () => {
  const { profile, education } = initialPortfolioData;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://faizwaheed.com";

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.fullName,
    url: baseUrl,
    jobTitle: profile.professionalTitle,
    description: profile.bioSummary,
    email: profile.contact.email,
    telephone: profile.contact.phone,
    sameAs: [profile.contact.linkedin],
    alumniOf: {
      "@type": "EducationalOrganization",
      name: education[0]?.institution || "National University of Sciences and Technology (NUST)",
    },
    award: [
      "Rector's Gold Medalist (National University of Sciences and Technology)",
      "Dean's Honor List (2021–2025)",
    ],
    knowsAbout: [
      "Chemical Engineering",
      "Process Systems Engineering",
      "Circular Economy Frameworks",
      "Sustainability & ESG Compliance",
      "Responsible Supply Chain",
      "Primavera P6 Project Tracking",
      "SAP PS Module",
      "PROAACT Root Cause Analysis",
      "Business Operations",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${profile.fullName} | Professional Portfolio`,
    url: baseUrl,
    description: profile.tagline,
    author: {
      "@type": "Person",
      name: profile.fullName,
    },
    inLanguage: "en-US",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
};

