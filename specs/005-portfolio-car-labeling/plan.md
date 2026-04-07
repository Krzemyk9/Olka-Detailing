# Implementation Plan: Portfolio Asset Naming and Realizacje Details

**Branch**: `005-portfolio-car-labeling` | **Date**: 2026-04-07 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/005-portfolio-car-labeling/spec.md`

## Summary

Replace placeholder realizacje cards with confirmed portfolio images and complete content metadata.
The implementation will normalize selected portfolio assets in `public/` to descriptive names,
extend `GALLERY_ITEMS` with image and accessibility metadata, and update `Portfolio.jsx` to render
real cards that keep photo, vehicle name, category, and service description in sync.

## Technical Context

**Language/Version**: JavaScript/JSX - React 19, Vite 8  
**Primary Dependencies**: React 19, React Router DOM 7, Tailwind CSS v4, Framer Motion already installed; no new packages planned  
**Storage**: Static files in `public/` plus hardcoded portfolio data in `src/constants/galleryData.js`  
**Testing**: Manual verification via `npm run dev`; no automated test framework configured  
**Target Platform**: Web SPA for modern desktop and mobile browsers  
**Project Type**: Single-page frontend application  
**Performance Goals**: Portfolio page remains visually stable, loads local optimized images without placeholder gaps, and preserves smooth scrolling on mobile  
**Constraints**: No backend or CMS; no new npm packages; styling must remain Tailwind-only; production images must be WebP or AVIF per constitution; content must avoid speculative vehicle naming  
**Scale/Scope**: One route (`/realizacje`), one content constant file, selected assets in `public/`, and small supporting UI changes within the existing page component

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| # | Principle | Gate Question | Status |
|---|-----------|---------------|--------|
| I | Component-Driven Architecture | Does the feature extend the existing `Portfolio` page and existing constants instead of introducing unnecessary new components? | ✅ PASS |
| II | Tailwind-Only Styling | Can the realizacje image cards be implemented with Tailwind utilities only and without adding raw CSS? | ✅ PASS |
| III | Framer Motion for Interaction | Does the feature avoid introducing non-standard animation requirements and preserve the existing interaction stack? | ✅ PASS |
| IV | Mobile-First & Accessibility | Will each rendered portfolio image include meaningful alt text and maintain semantic card structure on small screens first? | ✅ PASS |
| V | Clean Data Separation | Will image paths, labels, categories, and service descriptions remain in `src/constants/galleryData.js` rather than being embedded inline in JSX? | ✅ PASS |
| IMG | Image constraint | Are selected portfolio assets normalized to WebP or AVIF and named descriptively before being used in production? | ✅ PASS |
| DEP | Dependencies gate | Are zero new npm dependencies required? | ✅ PASS |

*Post-Phase 1 re-check*: Design artifacts keep content in constants, keep implementation within existing page boundaries, and require no new dependencies or constitution exceptions. ✅

## Project Structure

### Documentation (this feature)

```text
specs/005-portfolio-car-labeling/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── portfolio-content-contract.md
└── tasks.md
```

### Source Code (repository root)

```text
public/
├── [selected portfolio assets renamed to descriptive filenames]
├── landrover.webp
├── mercedes-profil-gpt.webp
└── mercedes-profil-oryg.webp

src/
├── constants/
│   └── galleryData.js       # Portfolio metadata extended with image and alt fields
└── pages/
    └── Portfolio.jsx        # Placeholder card media replaced with actual rendered images
```

**Structure Decision**: Keep the feature inside the current single-page React app. Asset files stay in `public/` and are referenced by string path from `src/constants/galleryData.js`. The only source updates should be in the existing portfolio data file and page component unless implementation reveals a narrowly scoped shared helper is necessary.

## Complexity Tracking

No constitution violations or justified exceptions are expected for this feature.
