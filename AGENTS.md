# AGENTS.md — Persistent Developer & AI Instructions

**Project**: Muhammad Faiz Waheed – Professional Portfolio  
**Target Audience**: International recruiters, engineering enterprises, sustainability & ESG executives, hiring managers, and academic collaborators.

---

## 1. Core Technology Decisions & Stack
- **Framework**: Next.js 14 (App Router). Do not migrate to another framework.
- **Language**: TypeScript with strict mode enabled. All props and data models must have explicit types.
- **Styling**: Tailwind CSS with designated theme tokens (`tailwind.config.ts`).
- **Icons**: `lucide-react`. Maintain consistency in icon stroke and sizing.
- **Package Manager**: npm. Do not switch package managers.

---

## 2. Global Design System Rules
- **Theme**: Premium Dark Emerald.
- **Color Tokens**:
  - Background Base: `#090D12` (deep charcoal navy)
  - Secondary/Cards: `#0F1720` / `#0D151D`
  - Subtle Borders: `rgba(255, 255, 255, 0.08)` or `#1E2D3B`
  - Primary Accent: Emerald Green (`#10B981`, `#34D399`)
  - Secondary Accent: Muted Gold (`#D4AF37`, `#F3E5AB`)
  - Text Primary: `#F8FAFC`
  - Text Secondary: `#94A3B8`
- **Prohibitions**:
  - Do NOT use harsh neon glows or excessive multi-color gradients.
  - Do NOT use generic AI template styling.
  - Do NOT introduce disruptive animations or auto-playing media.
  - Keep all interactions subtle, smooth (200-300ms easing), and executive-grade.

---

## 3. Component Reuse Requirements
Always reuse established foundational components located in `src/components/`:
- `Navbar` & `MobileNav`: Global navigation menu.
- `Footer`: Global footer with verified contacts.
- `PageContainer`: Root wrapper for all pages (`src/components/layout/PageContainer.tsx`).
- `SectionHeading`: Title, badge, and subtitle headers (`src/components/ui/SectionHeading.tsx`).
- `PrimaryButton` & `SecondaryButton`: Action buttons and navigation links.
- `ProfessionalCard`: Base card surface with emerald/gold border accents.
- `TimelineItem`: For experience, career milestones, and chronological items.
- `AchievementCard`: For awards, honors, and distinctions.
- `ProjectCard`: For technical case studies and engineering projects.
- `ContactLink`: Standardized verified contact links.

Do not recreate one-off buttons or headers when an established component exists.

---

## 4. Professional Information & Data Accuracy (Strict Rule)
- Primary source of truth: `reference/M.Faiz.Resume.pdf` and verified data in `src/data/portfolioData.ts`.
- **Verified Facts**:
  - Name: Muhammad Faiz Waheed
  - Degree: BE Chemical Engineering
  - University: National University of Sciences and Technology (NUST)
  - CGPA: 3.53
  - Honors: Rector's Gold Medalist, Dean's List
  - Verified Experience Organizations:
    - Packages Group
    - Descon Engineering Limited
    - Daveyol Store
    - Faiz Traders
    - Attock Oil Refinery
  - Verified Skills:
    - Microsoft Office
    - Power BI (Basic)
    - SAP PS Module (Basic)
    - PROAACT
    - Primavera P6 project tracking
  - Professional Interests: Circular Economy, Sustainability, Responsible Supply Chain, Risk & Compliance, Business Operations.
  - Contact Details:
    - Email: `faizwaheed9@gmail.com`
    - Phone: `+92 324 5007850`
    - LinkedIn: `https://www.linkedin.com/in/M.FaizWaheed`
- **Strict Non-Invention Policy**:
  - Do NOT invent fictitious projects not corroborated by the CV.
  - Do NOT create fabricated certifications, client testimonials, or corporate endorsements.
  - Do NOT inflate proficiency levels or synthesize unverified performance statistics.

---

## 5. Routing Structure
- `/` – Home
- `/about` – About Me
- `/experience` – Professional Experience
- `/projects` – Projects and Case Studies
- `/education` – Education
- `/skills` – Technical and Professional Skills
- `/achievements` – Awards and Certifications
- `/leadership` – Leadership and Community
- `/contact` – Contact
- `/admin` – Protected Admin Dashboard

---

## 6. Execution Discipline
- **One Page at a Time**: Build strictly the single page requested in each instruction. Do not implement future pages in advance.
- **Scope Discipline**: Do not modify unrelated files. Maintain documentation integrity.
- **Packaging Rule**: At every delivery step, create a single downloadable `.zip` archive containing the complete up-to-date project with working relative navigation links.
- **Verification**: Always run `npm run typecheck` and `npm run build` before claiming completion.

