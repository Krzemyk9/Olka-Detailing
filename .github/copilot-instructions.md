# Olka Detailing — Project Guidelines

Premium car detailing business website (Gdynia, Poland). Polish-language content.

## Tech Stack

- **React 19** + **Vite 8** (ES modules, JSX — no TypeScript)
- **Tailwind CSS 4** via `@tailwindcss/vite` plugin — utility-first, no CSS modules
- **Framer Motion** for animations (`motion as Motion` alias convention)
- **React Router DOM 7** — BrowserRouter with layout wrapper
- **lucide-react** for icons, **react-compare-image** for before/after sliders
- No backend, no API calls, no state management library — all content is hardcoded

## Build & Dev

```sh
npm run dev      # Vite dev server with HMR
npm run build    # Production build → dist/
npm run lint     # ESLint
npm run preview  # Preview production build
```

No test framework is configured.

## Architecture

```
src/
├── App.jsx          # BrowserRouter + Header/Footer layout, 4 routes
├── main.jsx         # React DOM entry
├── index.css        # Tailwind import + @theme variables + keyframes
├── components/
│   ├── Header.jsx   # Sticky nav, phone CTA, booking button
│   ├── Footer.jsx   # Social links, nav, copyright
│   └── home/        # Home page section components
└── pages/           # Route-level components (Home, Pricing, Portfolio, Contact)
```

**Routes**: `/` → Home, `/cennik` → Pricing, `/realizacje` → Portfolio, `/kontakt` → Contact

## Conventions

- **Components**: PascalCase files and names. Always include `.jsx` extension in imports.
- **Constants**: UPPER_CASE (`PHONE_DISPLAY`, `LEFT_SRC`)
- **Framer Motion**: Import as `motion as Motion` — use `<Motion.div>` not `<motion.div>`
- **Accessibility**: Use semantic HTML (`<section>`, `<article>`, `<nav>`), ARIA attributes (`aria-label`, `aria-expanded`), and `focus-visible:outline` classes
- **Data**: Hardcoded arrays/objects in component files (no JSON configs or CMS)
- **Icons**: Import individually from `lucide-react` — e.g., `import { Star } from 'lucide-react'`

## Styling

- **Dark-only theme** — no light mode
- **Custom CSS variables** defined in `src/index.css` `@theme` block:
  - `--color-od-bg: #0a0a0a` (background)
  - `--color-od-text: #f5f5f5` (text)
  - `--color-od-gold: #d4af37` (primary accent)
  - `--color-od-cobalt: #0047ab` (secondary accent)
- **Font**: Montserrat (`--font-sans`)
- **Glass UI**: `backdrop-blur-md` + `bg-[#0a0a0a]/55` + border/shadow for depth
- Use Tailwind utilities in JSX — no custom CSS classes in React components
- Responsive via Tailwind breakpoints (`sm:`, `lg:`) and `clamp()` for fluid sizing

## Known Issues

- **Static HTML duplication**: `public/cennik.html` and `public/kontakt.html` duplicate React page content with BEM CSS. These are legacy fallbacks — new work should go into React components (`Pricing.jsx`, `Contact.jsx`).
- **Stub pages**: Pricing, Portfolio, and Contact pages are placeholder shells awaiting implementation.
- Footer links mix React routes (`/realizacje`) with static HTML paths (`/cennik.html`) — should be unified to React Router `<Link>` components.

## Copilot Behavior

You are a senior frontend developer working on a premium car detailing website.

### Core rules

- Always analyze existing code before making changes
- Prefer extending existing components instead of creating new ones
- Do not introduce new libraries or patterns unless necessary
- Keep changes minimal and safe
- Maintain visual consistency across all pages

### Workflow

When implementing features:

1. First explain what currently exists
2. Identify what is missing
3. Propose a short plan
4. Then implement changes step by step
5. Finally verify that nothing is broken

### UI & UX

- Design must feel premium, minimal, and high-end
- Use spacing, typography, and contrast instead of complexity
- Avoid clutter and unnecessary elements
- Mobile-first approach is required

### Code quality

- Keep components small and readable
- Avoid duplication
- Reuse patterns from existing files
- Use clear naming

### Important

- Do NOT rewrite entire files unless absolutely necessary
- Do NOT break existing layout or routing
- If unsure — check other files in the project

## Business Goal

This website is designed to convert visitors into customers.

Focus on:
- clear service presentation
- strong visual credibility
- easy contact and booking
- showcasing results (before/after, portfolio)

Avoid:
- unnecessary complexity
- experimental UI
- overengineering
