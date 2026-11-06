# PROJECT_PLAN.md — Master Architecture & Phased Roadmap

**Project**: Muhammad Faiz Waheed – Professional Portfolio  
**Lead Architect**: Antigravity Technical Lead & Senior Full-Stack Engineer  
**Status**: Phase 0 (Technical Foundation & Routing Setup) Complete

---

## 1. Overall Website Architecture

The portfolio is structured as a high-performance, SEO-optimized, multi-page application utilizing **Next.js 14 App Router** with **TypeScript** and **Tailwind CSS**.

### Key Architectural Pillars:
1. **Separation of Concerns**:
   - Content and verified domain data are isolated in `src/data/portfolioData.ts` and managed via `src/lib/portfolio-service.ts`.
   - UI presentation layers (`src/components/ui/` and `src/components/layout/`) are decoupled from business data.
   - Types are centralized in `src/types/portfolio.ts`.
2. **Visual Consistency (Theme: Premium Dark Emerald)**:
   - Charcoal/navy baseline (`#090D12` / `#0F1720`) paired with Emerald Green (`#10B981`) and Muted Gold (`#D4AF37`) accents.
3. **Responsive & Accessible**:
   - Mobile-first responsive layouts with dedicated `MobileNav` drawer.
   - High-contrast typography conforming to WCAG 2.1 standards.
4. **Extensible for Admin CMS**:
   - Local state is structured to permit a seamless swap to SQLite/Prisma/PostgreSQL or an API route backend in later phases without redesigning frontend components.

---

## 2. Phased Development Roadmap

| Phase | Description | Deliverables | Status |
| :--- | :--- | :--- | :--- |
| **Phase 0** | **Technical Foundation & Routing Setup** | Next.js setup, Tailwind theme tokens, TypeScript interfaces, 12 shared components, 10 registered route stubs, CV data extraction, verified documentation. | **COMPLETE** |
| **Phase 1** | **Home Page (Landing)** | Hero section with verified identity, value proposition, 5 animated metrics (11 Group Companies, 3+ EPC, 500+ Orders, 5+ Workshops, PKR 30k Fundraising), About preview, Experience preview, 3 Featured Projects with engineering SVGs, Academic Excellence spotlight, and Closing CTA. | **COMPLETE** |
| **Phase 2A** | **About Me (`/about`)** | About hero with portrait, professional biography, career journey timeline (7 verified milestones 2017-2026), 8 areas of professional interest, 6 professional values, career direction manifesto, and dual CTA. | **COMPLETE** |
| **Phase 2B** | **Professional Experience (`/experience`)** | Detailed experience page with 5 verified positions (latest first), expandable responsibility cards, text-based branding badges, 4 key experience highlights, skills-applied associations, and functional resume download. | **COMPLETE** |
| **Phase 3** | **Projects & Case Studies (`/projects`)** | Projects page with hero vector schematic, featured Rector's Gold Medal capstone spotlight (with clean placeholder compliance), responsive 4-category filter gallery, dynamic project details layout (`/projects/[id]`), and admin-ready data schema. | **COMPLETE** |
| **Phase 4** | **Education & Skills (`/education` & `/skills`)** | Dedicated Education page (NUST BE Chemical Engineering, CGPA 3.53, Rector's Gold Medalist, Dean's List, core engineering foundation) + Dedicated Skills page (CV-listed tools: MS Office, Power BI Basic, SAP PS Module Basic, PROAACT, Primavera P6, Professional capabilities, Harvard & McKinsey executive learning in progress, strict non-inflated levels, and Admin CMS compatibility). | **COMPLETE** |
| **Phase 5** | **Achievements & Leadership (`/achievements` & `/leadership`)** | Dedicated Achievements page (Rector's Gold Medalist, Dean's List 2021–2025, Harvard Aspire & McKinsey Forward in progress) + Dedicated Leadership & Community page (AIChE NUST Chapter Director, Event Planner across 2.5+ years, 5+ Workshops, PKR 30k Thar clean water pump fundraising, 40 Qurans, madrasa classroom tables, and Admin CMS compatibility). | **COMPLETE** |
| **Phase 6** | **Contact & Inquiries (`/contact` & `/api/contact`)** | Dedicated Contact page (verified email with mailto, phone with tel, LinkedIn in new tab), Professional Availability matrix, server-side validated contact form with anti-spam honeypot, dual Netlify & Next.js API compatibility, persistent message storage in `src/data/inquiries.json`, and Admin CMS integration. | **COMPLETE** |
| **Phase 8** | **SEO, Performance & Accessibility** | Full SEO suite (tailored titles, meta descriptions, canonical URLs, Person & WebSite JSON-LD schemas, dynamic `sitemap.xml`, `robots.txt` disallowing `/admin`, SVG branding favicon, asset caching headers, keyboard navigation with visible focus indicators, skip-to-content link, and reduced-motion support). | **COMPLETE** |
| **Phase 9** | **Protected Admin Dashboard (`/admin`)** | Password-protected admin authentication, content editing forms for profile, experience, skills, projects, achievements, and leadership records, incoming inquiry management, plus export/sync. | *Pending User Approval* |

---

## 3. Component Architecture

```text
src/components/
├── layout/
│   ├── Navbar.tsx             # Sticky responsive top navigation with brand identity & CTAs
│   ├── MobileNav.tsx          # Drawer navigation overlay for mobile viewports
│   ├── Footer.tsx             # Global verified contact footer & site links
│   └── PageContainer.tsx      # Standardized width & padding wrapper
└── ui/
    ├── SectionHeading.tsx     # Standard section title with badge & accent bar
    ├── PrimaryButton.tsx      # Emerald/gold primary button with Link/button polymorphism
    ├── SecondaryButton.tsx    # Outline/ghost secondary action button
    ├── ProfessionalCard.tsx   # Glassmorphic card surface with hover elevation
    ├── TimelineItem.tsx       # Chronological node with vertical stem & status indicators
    ├── AchievementCard.tsx    # Academic & honor card with gold accents
    ├── ProjectCard.tsx        # Technical case study card with tag system
    └── ContactLink.tsx        # Standardized verified contact row
```

---

## 4. Future Backend & Admin Dashboard Integration Plan

When Phase 10 is reached:
1. **Authentication Layer**: Simple, secure JWT / session-based password authentication using Next.js Route Handlers (`src/app/api/auth/route.ts`).
2. **Persistence Storage**:
   - Transition `src/data/portfolioData.ts` to either a JSON-backed file store, SQLite (via Prisma/Drizzle), or headless CMS connector through `PortfolioService`.
3. **Admin UI**:
   - Tabbed dashboard allowing live editing of:
     - Profile details (Bio, Tagline, Phone, Email, Photo)
     - Experiences (Add, Edit, Reorder, Delete)
     - Projects (Add, Edit, Reorder, Delete)
     - Skills & Competencies
     - Honors & Awards
4. **Export / Backup**: Single-click export of updated portfolio configuration.

