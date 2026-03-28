# CONTEXT.md — HELM Academy

> Last updated: 2026-03-27
> Generated from actual file contents. Do not write anything not found in the source files.

---

## What This Project Is

**HELM Academy** is a premium educational platform built for **petroleum engineering professionals and students**, primarily targeting the Algeria and MENA region. It offers courses, a digital library, job/company listings, and a community forum — all tied together through role-based dashboards for students, instructors, and companies.

Tagline (from metadata): *"Engineer Your Future in Energy"*

---

## Actual Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3.4 + custom design tokens |
| Animation | Framer Motion 12 |
| Icons | Lucide React |
| Charts | Recharts |
| Theme | next-themes (dark mode by default, `defaultTheme="dark"`, `enableSystem={false}`) |
| Utilities | clsx, tailwind-merge |
| Fonts | Playfair Display (display), Plus Jakarta Sans (body), JetBrains Mono (mono), Cairo (Arabic) — all via `next/font/google` |
| Images | Next.js `<Image>`, remote patterns: `images.unsplash.com`, `i.pravatar.cc` |
| Package manager | npm |

---

## Folder Structure

```
HELM/
├── app/
│   ├── layout.tsx                   # Root layout: fonts, ThemeProvider, GlobalShell
│   ├── globals.css                  # Global styles
│   ├── not-found.tsx                # 404 page
│   ├── error.tsx                    # Error boundary
│   ├── fonts/                       # Local font assets (if any)
│   ├── ui-showcase/                 # Internal UI component showcase
│   │
│   ├── (main)/                      # Public-facing route group
│   │   ├── layout.tsx               # Wraps public pages with Navbar + Footer
│   │   ├── page.tsx                 # Landing / home page
│   │   ├── explore/                 # Course exploration/search
│   │   ├── library/                 # Public library page
│   │   ├── companies/               # Company listings
│   │   ├── community/               # Community / forum page
│   │   └── about/                   # About page
│   │
│   ├── (dashboard)/                 # Auth-required route group
│   │   ├── layout.tsx               # Sidebar + TopBar shell (role-aware)
│   │   └── dashboard/
│   │       ├── page.tsx             # Redirect / role detection
│   │       ├── student/             # Student dashboard
│   │       │   ├── page.tsx         # Student overview
│   │       │   ├── courses/         # My courses
│   │       │   ├── certificates/    # Certificates
│   │       │   ├── library/         # Saved library
│   │       │   ├── applications/    # Job applications
│   │       │   └── profile/         # Student profile
│   │       ├── instructor/          # Instructor dashboard
│   │       │   ├── page.tsx         # Instructor overview
│   │       │   ├── RevenueChart.tsx # Inline chart component
│   │       │   ├── courses/         # Manage courses
│   │       │   ├── upload/          # Upload new course
│   │       │   ├── analytics/       # Analytics & stats
│   │       │   └── students/        # Student roster
│   │       └── company/             # Company dashboard
│   │           ├── page.tsx         # Company overview
│   │           ├── jobs/            # Job listings management
│   │           ├── applicants/      # View applicants
│   │           ├── talent/          # Talent search
│   │           └── subscription/    # Subscription management
│   │
│   └── auth/                        # Standalone auth pages (no Navbar/Footer)
│       ├── login/
│       ├── register/
│       └── forgot-password/
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx               # Main public navbar
│   │   └── Footer.tsx               # Public footer
│   ├── sections/                    # Landing page sections
│   │   ├── Hero.tsx
│   │   ├── CourseCarousel.tsx
│   │   ├── Programs.tsx
│   │   ├── Features.tsx
│   │   ├── LibraryPreview.tsx
│   │   ├── CompaniesMarquee.tsx
│   │   ├── CommunityPreview.tsx
│   │   └── FinalCTA.tsx
│   ├── ui/                          # Reusable UI primitives
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── modal.tsx
│   │   ├── badge.tsx
│   │   ├── Skeleton.tsx
│   │   ├── Toast.tsx
│   │   ├── SearchModal.tsx
│   │   ├── ScrollToTop.tsx
│   │   ├── AuthInputs.tsx
│   │   └── RoleCard.tsx
│   └── shared/                      # App-wide shared wrappers
│       ├── theme-provider.tsx        # next-themes ThemeProvider
│       └── GlobalShell.tsx          # Global shell wrapper
│
├── data/                            # Static mock data (no backend yet)
│   ├── courses.ts
│   ├── jobs.ts
│   ├── library.ts
│   └── mock-data.ts
│
├── lib/
│   ├── design-system.ts             # JS-exported design tokens (colors, fonts, shadows, motion presets)
│   └── utils.ts                     # Utility helpers (likely cn() from clsx + twMerge)
│
├── types/
│   └── index.ts                     # All TypeScript interfaces for the project
│
├── public/                          # Static assets
├── tailwind.config.ts               # Extended Tailwind config with design tokens
├── next.config.mjs                  # Next.js config (image remote patterns)
├── tsconfig.json                    # TypeScript config
└── package.json
```

---

## TypeScript Domain Types (from `types/index.ts`)

| Type / Interface | Purpose |
|---|---|
| `User`, `UserProfile` | Auth user with roles: `student`, `instructor`, `admin`, `company` |
| `PetroleumDomain` | Union of 10 domains: drilling, reservoir, production, hse, lng, petroleum-economics, geoscience, completions, pipelines, refining |
| `CourseLevel` | `beginner`, `intermediate`, `advanced`, `expert` |
| `Course`, `Module`, `Lesson`, `Resource` | Full course content hierarchy |
| `Instructor` | Instructor profile |
| `Book` | Library item (pdf / epub / hardcover) |
| `Certificate` | Course certificate with credentialId + verificationUrl |
| `Job`, `Company` | Job board and company profiles |
| `Enrollment` | Progress tracking (0–100) |
| `Review` | Course reviews |
| `Category` | Course categories |
| `ForumPost` | Community forum posts |
| `NavItem` | Navigation item shape |
| `ApiResponse<T>` | Generic paginated API response shape |

Multi-language support is baked into the types: `language: "en" | "ar" | "fr"` and Arabic title/description fields (`titleAr`, `descriptionAr`).

---

## Design System

Defined in both `tailwind.config.ts` and `lib/design-system.ts`.

**Color Palette:**
- `primary` — Gold (`#D4A017` / `#F5C518`) — main brand color
- `navy` — Deep navy (`#0A1628` → `#060E1A`) — backgrounds
- `accent` — Teal (`#2DD4BF`)
- `surface`, `danger` (red), `success` (green)

**Typography:**
- `font-display` → Playfair Display (serif, headings)
- `font-body` → Plus Jakarta Sans (sans, default)
- `font-mono` → JetBrains Mono
- `font-arabic` → Cairo (Arabic content)

**Custom shadows:** `gold-sm`, `gold-md`, `gold-lg`, `gold-xl`, `gold-glow`, `card`, `card-hover`

**Animations:** `fade-in`, `fade-up`, `slide-in-left`, `slide-in-right`, `scale-in`, `shimmer`, `float`, `gold-glow`

**Framer Motion presets** (in `lib/design-system.ts`): `fadeIn`, `fadeUp`, `fadeDown`, `slideLeft`, `slideRight`, `scaleIn`, `staggerContainer`, `staggerItem`

---

## Dashboard — Role Detection

The dashboard layout (`app/(dashboard)/layout.tsx`) detects the user role by reading the URL path:
- `/dashboard/instructor/**` → role: `instructor`
- `/dashboard/company/**` → role: `company`
- anything else → role: `student`

> **No real auth system exists yet.** Role is determined purely from the URL. Authentication context / session management is not implemented.

---

## Features: Built vs. Planned

### ✅ Built (UI implemented)

**Public Pages:**
- Landing page with: Hero, CourseCarousel, Programs, Features, LibraryPreview, CompaniesMarquee, CommunityPreview, FinalCTA sections
- Explore (course listing) page
- Library page
- Companies page
- Community page
- About page
- 404 and Error boundary pages

**Auth Pages (UI only):**
- Login, Register, Forgot Password

**Student Dashboard:**
- Overview, My Courses, Certificates, Library, Applications, Profile

**Instructor Dashboard:**
- Overview, My Courses, Upload Course, Analytics (with RevenueChart), Students

**Company Dashboard:**
- Overview, Job Listings, Applicants, Talent Search, Subscription

**Shared UI:**
- Navbar (public), Footer, role-based sidebar + topbar, SearchModal, Toast, Skeleton, ScrollToTop, Modal, Button, Badge, Card, Input, Select

**Data layer:**
- Static mock data files for courses, jobs, library, and general mock-data

### 🔲 Planned / Not Yet Built (inferred from types and structure)

- Real authentication (login/register logic, JWT or session) # TODO: verify
- Backend / API integration (all data is currently static mocks)
- Course player / lesson viewer
- Certificate generation and verification URL
- Payment / subscription processing for companies
- Community forum (post creation, replies, likes)
- Admin dashboard (`role: "admin"` exists in types but no route exists)
- Multilingual UI (i18n routing; types support `"en" | "ar" | "fr"` but no i18n library is installed)
- Real search functionality (SearchModal UI exists but backend search is not connected)

---

## Rules for AI Working on This Project

1. **Do not invent stack decisions.** The stack is Next.js 14 App Router + TypeScript + Tailwind CSS + Framer Motion. Do not add libraries unless explicitly asked.

2. **Use the existing design tokens.** All colors, shadows, fonts, and animations are defined in `tailwind.config.ts` and `lib/design-system.ts`. Never use raw hex values in new components — use the token names (e.g., `bg-navy-900`, `text-primary`, `shadow-gold-md`).

3. **Follow the route group structure.** Public pages → `app/(main)/`. Dashboard pages → `app/(dashboard)/dashboard/`. Auth pages → `app/auth/`. Do not place components in the wrong group.

4. **Use existing types from `types/index.ts`.** Do not redefine types that already exist. If a new type is needed, add it to `types/index.ts`.

5. **Use mock data from `data/`.** There is no backend. All data comes from `data/courses.ts`, `data/jobs.ts`, `data/library.ts`, `data/mock-data.ts`.

6. **Component placement rules:**
   - Layout wrappers → `components/layout/`
   - Landing page sections → `components/sections/`
   - Reusable primitives → `components/ui/`
   - App-wide shared wrappers → `components/shared/`

7. **Theme is dark by default.** `defaultTheme="dark"` and `enableSystem={false}` in the ThemeProvider. Do not assume light mode is default.

8. **The dashboard is role-aware but has no real auth.** Role is inferred from the URL path. Do not implement session-based logic unless explicitly asked.

9. **Framer Motion is available and should be used for animations.** Use the presets from `lib/design-system.ts` (`motionPresets`) for consistency.

10. **External images are allowed only from `images.unsplash.com` and `i.pravatar.cc`.** These are the only configured remote patterns in `next.config.mjs`. Do not use other external image sources without updating the config.

11. **Mark anything unverified with `# TODO: verify`.** Do not make assumptions about unimplemented features.

12. **Arabic/multilingual content is planned.** Types include `titleAr`, `descriptionAr`, `language` fields. Do not remove these fields. Do not implement i18n routing unless asked.
