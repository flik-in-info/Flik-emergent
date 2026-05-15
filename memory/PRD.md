# Flik Explore — Product Requirements Document

## Original Problem Statement
Build a premium landing page for **Flik Explore**, a real-time architecture visualization platform for real estate. Conversion-optimized, $20k+ agency-quality design with glass-morphism, depth, clear CTAs, color psychology, smooth animations. Incorporate user-uploaded images for hero background and logo.

## User Personas
- **Real-estate developers** evaluating presales / visualization platforms
- **Sales teams & brokerages** seeking live inventory tools
- **Architects & designers** wanting to communicate vision pre-build

## Core Requirements
1. Premium dark-themed landing page (Hero, Platform, Visualization, Intelligence, Technology, Teams, Metrics, Difference, Closing CTA, Footer)
2. Custom hero image + logo integration
3. Glass-morphism, gradient overlays, emerald accent palette
4. Responsive across mobile / tablet / desktop
5. Lead capture (Request Demo) wired to a backend persistent store

## What's Implemented

### 2026-02 — Landing Page (previous session)
- Componentized React + Tailwind landing page
- Header / Hero / Platform / Visualization / Intelligence / Technology / Teams / Metrics / Difference / ClosingCTA / Footer
- Custom logo (`flik999.png`) integrated in Header & Footer
- Custom hero background image with darkening gradient overlay
- Mock data in `/app/frontend/src/data/mock.js`

### 2026-05-15 — Lead Capture (this session)
- **Backend** (`/app/backend/server.py`):
  - `POST /api/leads` — validates name/email (Pydantic `EmailStr`), stores `{id, name, email, company, project, message, source, created_at}` in MongoDB `leads` collection
  - `GET /api/leads` — returns latest leads (no `_id` leak)
- **Frontend**:
  - `LeadFormDialog.jsx` — shadcn `Dialog` with name/email/company/project/message fields, loading state, success state, `sonner` toast feedback
  - `context/DemoDialogContext.jsx` — global provider so any CTA can open the dialog
  - All **"Request Demo" / "Explore the Platform" / "Watch Live Demo" / "Contact Sales"** CTAs (Header desktop+mobile, Hero, ClosingCTA) wired to open the dialog with `source` tagging
  - `<Toaster theme="dark" />` mounted at app root
- Verified end-to-end via screenshot tool: dialog opens → submit → success state → MongoDB persists with correct `source`

### 2026-05-15 — Experience Sections & Contact Form (this session)
- **Experience section** (`ExperienceSection.jsx`) — two clickable cards:
  - **Virtual Walkthrough** → AI Guided Panoramic Tour (Coohom panorama URL)
  - **Modular Explorer** → Interactive 3D Model (Coohom modelo URL)
  - Cards open `ExperienceModal.jsx` — fullscreen iframe overlay
  - Closes via ✕ button, Escape key, or clicking outside (Radix Dialog defaults)
  - Iframe `src` swaps to `about:blank` on close to release stream
- **Contact section** (`ContactSection.jsx`) — full enquiry form:
  - Fields: Full Name (required), Phone, Email (required), Interest (select), Message
  - Submit composes a pre-filled `mailto:Contact@flik.in` with subject/body and triggers user's email client
  - Success state shown after submit with "Send another enquiry" reset
- Nav updated: `Capabilities` → `Experience`; `Contact` now anchors to the new contact section; ClosingCTA's anchor renamed to `#get-started`
- Verified end-to-end: both modals open/close cleanly, contact form generates correct mailto URL, success/reset flow works

### 2026-05-15 — Code Quality Pass (this session)
- Replaced all `key={index}` with stable content-based keys (title/label/line) across all section components
- Extracted magic numbers `847` / `12` → `HERO_LIVE_UNITS` / `HERO_LIVE_TOWERS`
- Added Python return-type hints to all FastAPI routes
- Split oversized components: `LeadFormDialog` (187 → 86 lines via `lead-form/LeadFormField`, `LeadFormBody`, `LeadFormSuccess`), `Footer` (104 → 60 lines via `FooterLinkColumn`)
- Added missing `useCallback` deps in `DemoDialogContext`

## Architecture
```
/app
├── backend
│   └── server.py            # FastAPI: /api/leads (POST, GET), /api/status (legacy)
└── frontend/src
    ├── App.js                # DemoDialogProvider + Toaster wrap routes
    ├── context/DemoDialogContext.jsx
    ├── components/
    │   ├── LeadFormDialog.jsx
    │   ├── Header.jsx        # header-request-demo, mobile-request-demo
    │   ├── HeroSection.jsx   # hero-primary-cta, hero-secondary-cta
    │   ├── ClosingCTA.jsx    # closing-primary-cta, closing-secondary-cta
    │   └── … (PlatformSection, VisualizationSection, …)
    └── data/mock.js
```

## DB Schema
- `leads`: `{ id (uuid), name, email, company?, project?, message?, source, created_at (ISO str) }`

## Backlog / Roadmap

### P1
- Admin view for leads (simple `/admin/leads` route with auth)
- Email notification to sales team on new lead (Resend / SendGrid integration)
- Auto-reply email to the lead

### P2
- Analytics: track CTA click events
- Calendly-style demo scheduler
- Multi-language support (EN / ES / AR)
- SEO: meta tags, sitemap, OG images
- Animated section reveals on scroll

## Health Check
- Broken: None
- Mocked content: Landing copy & metrics still come from `mock.js` (static)
- Real backend integration: Lead capture (`/api/leads`) — live, tested
