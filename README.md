# Muhammad Faiz Waheed – Professional Portfolio

Engineering Sustainable Solutions. Driving Business Impact.

A modern, multi-page professional portfolio engineered for **Muhammad Faiz Waheed**, Chemical Engineer (NUST Rector's Gold Medalist, CGPA 3.53) specializing in Sustainability, Circular Economy, Responsible Supply Chain, Risk & Compliance, and Business Operations.

---

## 🛠 Technology Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server & Client Components)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Type Safety)
- **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com/) with Custom Design System
- **Icons**: [Lucide React](https://lucide.dev/)
- **Theme**: Premium Dark Emerald (Deep Charcoal Navy, Emerald Green primary, Muted Gold secondary)
- **Package Manager**: npm

---

## 📁 Project Structure

```text
Portfolio/
├── public/                 # Static assets, icons, and profile images
│   └── images/             # Professional imagery
├── reference/              # Master reference files (CV, certificates)
│   └── M.Faiz.Resume.pdf   # Source of verified professional information
├── src/
│   ├── app/                # Next.js App Router (Routing Architecture)
│   │   ├── layout.tsx      # Global Root Layout (Navbar, Footer, Fonts)
│   │   ├── page.tsx        # / – Home Page
│   │   ├── about/          # /about – About Me
│   │   ├── experience/     # /experience – Professional Experience
│   │   ├── projects/       # /projects – Projects & Case Studies
│   │   ├── education/      # /education – Education & Academic Honors
│   │   ├── skills/         # /skills – Technical & Professional Skills
│   │   ├── achievements/   # /achievements – Awards & Honors
│   │   ├── leadership/     # /leadership – Leadership & Community
│   │   ├── contact/        # /contact – Verified Contact Channels
│   │   └── admin/          # /admin – Protected Admin Dashboard
│   ├── components/
│   │   ├── layout/         # Layout components (Navbar, MobileNav, Footer, PageContainer)
│   │   └── ui/             # Reusable Design System components (Buttons, Cards, Headings, etc.)
│   ├── data/               # Centralized typed portfolio data (Strictly verified)
│   ├── lib/                # Utility functions and portfolio service layer
│   ├── styles/             # Global CSS and Tailwind configuration
│   └── types/              # Comprehensive TypeScript interfaces
├── AGENTS.md               # Persistent AI Agent & Developer Directives
├── PROJECT_PLAN.md         # Phased architecture & implementation roadmap
├── README.md               # Project documentation
├── tailwind.config.ts      # Tailwind design tokens & theme configuration
└── tsconfig.json           # TypeScript configuration
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.x or newer, tested on Node v25.2.1)
- npm (v10.x or newer)

### Installation
```bash
npm install
```

### Development Server
Run the local development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Quality & Type Checks
Run TypeScript type-checking without emitting output:
```bash
npm run typecheck
```

### Production Build
Create an optimized production build:
```bash
npm run build
```

Run the production server:
```bash
npm start
```

