# Implementation Plan: Before/After Slider Custom Drag

**Branch**: `004-fix-slider-drag-smooth` | **Date**: 2026-04-07 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/004-fix-slider-drag-smooth/spec.md`

## Summary

Replace `react-compare-image`'s internal drag system in `BeforeAfterSlider.jsx` with a fully
custom implementation that calls `getBoundingClientRect()` on every pointer/touch move event.
The new component wires `mousedown`/`touchstart` on the container div, attaches `mousemove`/
`touchmove` and `mouseup`/`touchend` to `window` during active drag, and tears them down on
release. This eliminates all cached-dimension bugs introduced by the library's `useLayoutEffect`
measurement. The `IntersectionObserver` deferred-mount pattern (threshold 0.5, one-shot) is
preserved intact.

## Technical Context

**Language/Version**: JavaScript/JSX — React 19, Vite 8  
**Primary Dependencies**: React 19, Tailwind CSS v4, Framer Motion (already installed; no new packages)  
**Storage**: N/A — no data persistence  
**Testing**: Manual (no automated test framework configured)  
**Target Platform**: Web SPA — modern browsers (Chrome, Firefox, Safari, Edge); mobile touch  
**Project Type**: Single-page web application (SPA)  
**Performance Goals**: 60 fps drag tracking; zero re-renders during mid-drag move events  
**Constraints**: No new npm packages; single-file change; all styles via Tailwind utilities; inline `style` limited to single CSS custom property on container element only  
**Scale/Scope**: Single component (`BeforeAfterSlider.jsx`); one interactive section on the home page

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| # | Principle | Gate Question | Status |
|---|-----------|---------------|--------|
| I | Component-Driven Architecture | Is the fix scoped to one existing component? Is drag logic ≤20 lines? | ✅ PASS |
| II | Tailwind-Only Styling | Are all static classes Tailwind utilities? Is inline `style` limited to one CSS var on the container? | ⚠️ EXCEPTION — see Complexity Tracking |
| III | Framer Motion for Interaction | Is drag implemented with Framer Motion APIs? | ⚠️ EXCEPTION — see Complexity Tracking |
| IV | Mobile-First & Accessibility | Does the component handle both mouse and touch? Are ARIA labels preserved? | ✅ PASS |
| V | Clean Data Separation | Are `LEFT_SRC`, `RIGHT_SRC`, `SLIDER_GOLD` constants preserved? | ✅ PASS |
| DEP | Dependencies gate | Are zero new npm packages introduced? | ✅ PASS |

*Post-Phase 1 re-check*: Exceptions documented in Complexity Tracking. No additional violations introduced by data-model or
quickstart design. ✅

## Project Structure

### Documentation (this feature)

```text
specs/004-fix-slider-drag-smooth/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
└── tasks.md             # Phase 2 output (/speckit.tasks command — NOT created by /speckit.plan)
```

No `contracts/` directory needed — this is a purely internal UI component with no external interface.

### Source Code (repository root)

```text
src/
└── components/
    └── home/
        └── BeforeAfterSlider.jsx   # Single file changed — library drag replaced with custom drag
```

**Structure Decision**: Single-file change. No new files in `src/`. No new components. No
extraction into a custom hook (drag logic is ~18 lines, below the 20-line threshold in Principle I).

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|--------------------------------------|
| Principle II — inline `style` on container | `style={{ '--split': sliderPosition }}` sets a single CSS custom property consumed by two child elements as `width: var(--split)` and `left: var(--split)`. Dynamic runtime percentages cannot be expressed as static Tailwind utility classes. | Arbitrary Tailwind values (`w-[var(--split)]`) require the variable to be resolvable at build time; Tailwind v4 JIT cannot emit a rule for a runtime-mutated custom property. Setting the CSS var once on the container is the minimal, scoped exception. |
| Principle III — native browser events instead of Framer Motion drag | FR-001 mandates `getBoundingClientRect()` on every move event; FR-011 mandates no third-party cached state. Framer Motion's `useDrag`/`drag` prop caches the drag origin in its own motion value state, which replicates the same class of bug this feature is fixing. | Using Framer Motion's `onDrag` callback with manual `getBoundingClientRect()` would still leave Framer Motion controlling the element's `transform`, creating a second source of position truth that would need to be suppressed (`dragElastic={0}`, `dragMomentum={false}`). Native `window` listeners are cleaner, contain all logic in one place, and directly satisfy every FR in the spec. |
