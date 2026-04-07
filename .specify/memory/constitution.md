<!--
SYNC IMPACT REPORT
==================
Version change: 1.0.0 → 1.1.0
Bump type: MINOR — expanded Governance section with formal amendment procedure, versioning policy,
and compliance review expectations; refined all five principles with explicit, testable rules and
concrete library/API conventions.

Modified principles:
  - I. Component-Driven Architecture: added reuse-first mandate, export pattern requirement,
    20-line hook extraction rule
  - II. Tailwind-Only Styling: added dark-only theme constraint, @theme variable mandate,
    class readability guideline, clsx recommendation
  - III. Framer Motion for Interaction: added `motion as Motion` alias requirement,
    prefers-reduced-motion compliance rule
  - IV. Mobile-First & Accessibility: added focus-visible outline requirement,
    semantic HTML specification
  - V. Clean Data Separation: added UPPER_CASE constant naming convention,
    react-compare-image mandate for portfolio

Added sections:
  - Governance: amendment procedure, versioning policy (MAJOR/MINOR/PATCH), compliance review

Removed sections:
  - None

Templates requiring updates:
  ✅ .specify/templates/plan-template.md — Constitution Check section reviewed; gates are derived
     dynamically from this constitution. No changes needed.
  ✅ .specify/templates/spec-template.md — Scope and requirements sections align with updated
     principles. No changes needed.
  ✅ .specify/templates/tasks-template.md — Task categorization aligns with updated workflow.
     No changes needed.

Deferred TODOs:
  - None; all placeholders resolved.
-->

# 📜 Olka Detailing — Project Constitution

## 🧠 Core Principles

### I. Component-Driven Architecture

Every new feature MUST be broken down into small, reusable components. Before creating any new
component, existing components in `/src/components/ui/` and `/src/components/home/` MUST be
checked first — reuse is preferred over creation. All components MUST use the
`export default function Name()` pattern. Business logic or hooks exceeding 20 lines MUST be
extracted into a custom hook or helper function, keeping JSX clean.

### II. Tailwind-Only Styling

Raw CSS, CSS Modules, and inline `style` props are FORBIDDEN. All visual styling MUST use Tailwind
CSS utility classes. Brand colors, typography, and spacing MUST reference the custom theme variables
defined in `src/index.css` under the `@theme` block (`--color-od-bg`, `--color-od-gold`,
`--color-od-cobalt`, `--color-od-text`, `--font-sans`). The project is dark-only — introducing
light-mode variants or separate light themes is not permitted. Tailwind class strings in JSX MUST
remain readable; complex groupings SHOULD use `clsx` or template literals rather than a single
unwieldy string.

### III. Framer Motion for Interaction

All user-facing motion — scroll reveals, hover effects, drag interactions, and page transitions —
MUST be implemented using Framer Motion. The library MUST be imported with the project alias
convention: `import { motion as Motion } from 'framer-motion'`. Usage in JSX is always
`<Motion.div>`, never `<motion.div>`. Animations MUST be optimized for mobile devices and MUST
respect the `prefers-reduced-motion` media query.

### IV. Mobile-First & Accessibility

All layouts MUST be designed starting from the mobile viewport and progressively enhanced via
Tailwind breakpoints (`sm:`, `md:`, `lg:`). Fluid sizing SHOULD use `clamp()` where appropriate.
Every interactive element (button, link, input, slider) MUST include appropriate ARIA attributes
(`aria-label`, `role`, `aria-expanded`) or be backed by equivalent semantic HTML. Focusable
elements MUST apply `focus-visible:outline` (or equivalent Tailwind class). Semantic HTML elements
(`<section>`, `<article>`, `<nav>`, `<header>`, `<footer>`) MUST be preferred over generic `<div>`
containers wherever meaningful structure exists.

### V. Clean Data Separation

Content arrays and configuration objects — FAQ items, service card definitions, pricing tables,
portfolio images, marquee brand logos, review data — MUST NOT be hardcoded inline within large JSX
renders. Data MUST be extracted to named constants at the top of the component file or to a
dedicated data/constants file. Constants MUST follow UPPER_CASE naming convention (e.g.,
`PHONE_DISPLAY`, `SERVICE_CARDS`, `LEFT_SRC`, `FAQ_ITEMS`). Before/After portfolio comparisons
MUST be implemented using `react-compare-image`.

## 🛠️ Technical Constraints

- **Stack**: Vite + React 19, JavaScript/JSX only (TypeScript is not used), Tailwind CSS v4 via
  `@tailwindcss/vite` plugin, `lucide-react` for icons, `framer-motion` for animation,
  `react-router-dom` v7 for routing, `react-compare-image` for before/after sliders.
- **Routing**: All routes MUST be defined in `App.jsx`. The four canonical routes are `/` (Home),
  `/cennik` (Pricing), `/realizacje` (Portfolio), `/kontakt` (Contact). Navigation between pages
  MUST use React Router `<Link>` components, not `<a href>` tags or static HTML paths.
- **Dependencies**: New npm packages MUST be specified in the feature `spec.md` with justification
  before installation. No new libraries without explicit approval.
- **Images**: Production images MUST be in WebP or AVIF format and appropriately sized per
  breakpoint. Unoptimized images are not acceptable.
- **Performance**: Components MUST NOT cause unnecessary re-renders. Memoization (`useMemo`,
  `useCallback`, `React.memo`) is required where re-render cost is measurable.
- **No Backend**: There is no API, database, or server-side logic. All content is hardcoded in the
  React source. No fetch calls, no state management libraries.

## 🔄 Development Workflow

1. **Specification**: Every task begins with a spec file under `/specs/`.
2. **Clarification**: Clarifying questions MUST be asked and answered before writing any code.
3. **Implementation**: All code MUST comply with the principles and constraints above.
4. **Review**: Generated code MUST be reviewed for UX quality, accessibility compliance, and
   adherence to this constitution before being considered complete.

## ⚖️ Governance

This constitution is the highest authority in the project and supersedes any AI suggestion, library
default, or external convention that conflicts with its principles.

**Amendment Procedure**: Propose the change with rationale (in a spec or inline note), update this
file accordingly, increment the version following the versioning policy below, and set
`Last Amended` to the date of the change. Amendments take effect immediately upon file update.

**Versioning Policy**:
- MAJOR: Removal or fundamental redefinition of an existing principle.
- MINOR: Addition of a new principle, new section, or materially expanded guidance.
- PATCH: Wording clarifications, typo fixes, and non-semantic refinements.

**Compliance Review**: Every implementation task MUST be verified against this constitution before
being marked complete. Any deliberate deviation MUST be explicitly justified and documented in the
task description or pull request.

---

**Version**: 1.1.0 | **Ratified**: 2026-04-05 | **Last Amended**: 2026-04-05