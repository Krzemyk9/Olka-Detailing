# Tasks: Before/After Slider Custom Drag Implementation

**Input**: Design documents from `/specs/004-fix-slider-drag-smooth/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, quickstart.md ✅

---

## Phase 1: Setup

**Purpose**: Verify working branch and starting state

- [X] T001 Confirm branch `004-fix-slider-drag-smooth` is active and `BeforeAfterSlider.jsx` builds cleanly

---

## Phase 2: User Story 1 — Smooth Continuous Drag on Desktop (Priority: P1) 🎯 MVP

**Goal**: Replace `react-compare-image` drag with custom native event implementation using `getBoundingClientRect()` on every move event. Desktop mouse drag works continuously without freezing.

**Independent Test**: Load home page, scroll to comparison section, hold mouse on container, drag slowly left to right — split follows cursor with no freezing for the full distance.

### Implementation for User Story 1

- [X] T002 [US1] Remove `ReactCompareImage` block and `react-compare-image` import from `src/components/home/BeforeAfterSlider.jsx`
- [X] T003 [US1] Remove `useCallback` import and `handlePositionChange` hook (no longer needed)
- [X] T004 [US1] Add `sliderPosition` state (initial `0.5`) and `isDragging` ref (`false`) to component
- [X] T005 [US1] Add drag `useEffect`: wire `mousedown` on container → attach `mousemove` + `mouseup` on `window` → call `getBoundingClientRect()` on every `mousemove`, compute clamped position, call `setSliderPosition`; remove listeners on `mouseup` and on cleanup
- [X] T006 [US1] Replace `ReactCompareImage` JSX with custom two-image reveal layout: right image full-width absolute, left image clip div (`overflow-hidden`, `width: ${sliderPosition*100}%`), gold divider line, handle circle with chevron SVG
- [X] T007 [US1] Add `cursor-ew-resize` to container div; preserve existing `aria-label`, `select-none`, `rounded-2xl`, `border`, `shadow` classes

**Checkpoint**: Desktop mouse drag works continuously from edge to edge with no freezing.

---

## Phase 3: User Story 2 — Smooth Continuous Drag on Touch (Priority: P2)

**Goal**: Touch/swipe events handled identically to mouse events. Horizontal swipe does not also scroll the page.

**Independent Test**: On touch device or DevTools touch emulation, swipe horizontally across the slider — split follows finger continuously.

### Implementation for User Story 2

- [X] T008 [US2] Extend drag `useEffect` to also wire `touchstart` on container → attach `touchmove` (`{ passive: false }`) + `touchend` on `window`; extract `clientX` from `e.touches[0].clientX` for touch events; call `e.preventDefault()` in move handler to block page scroll
- [X] T009 [US2] Ensure `touchstart` on container is also `{ passive: false }` so `preventDefault()` is available if needed

**Checkpoint**: Touch swipe on mobile/emulation tracks finger without page scrolling.

---

## Phase 4: User Story 3 — Accurate Position at All Scroll Depths (Priority: P3)

**Goal**: `getBoundingClientRect()` called fresh on every event; no stale cached measurements. Click at leftmost 10% lands near 10% split.

**Independent Test**: Scroll to slider from top of page, click at far-left edge of image — split moves to ~0–10%, not ~50%.

### Implementation for User Story 3

- [X] T010 [P] [US3] Verify `getBoundingClientRect()` is called inside the move handler (not at effect setup time) — already ensured by T005/T008 implementation structure
- [X] T011 [US3] Ensure initial click/tap on `mousedown`/`touchstart` also calls `getPosition(clientX)` and updates `sliderPosition` immediately (single tap repositions without drag)

**Checkpoint**: Single tap at container left edge → split ≤15%. Single tap at right edge → split ≥85%.

---

## Phase 5: Polish & Validation

**Purpose**: Visual consistency, accessibility, lint/build verification

- [X] T012 [P] Verify PRZED/PO labels remain visible at 0% and 100% split (check z-index against clip div)
- [X] T013 [P] Verify hint text "Przesuń, aby oczyścić" disappears after first `mousedown`/`touchstart`
- [X] T014 Verify `IntersectionObserver` deferred mount still works — placeholder `<img>` shows before container is 50% in viewport
- [X] T015 [P] Remove unused `sectionRef` if still present in component
- [X] T016 Run `npm run lint` — zero errors
- [X] T017 Run `npm run build` — zero errors

---

## Completion Criteria

All tasks marked [X]. All FRs verified:
- FR-001 `getBoundingClientRect()` on every move ✓ (T005/T008)  
- FR-002 drag starts anywhere in container ✓ (T005/T008)  
- FR-003 window listeners during drag ✓ (T005/T008)  
- FR-004 listeners removed on end + cleanup ✓ (T005/T008)  
- FR-005 clamped [0,1] ✓ (T005)  
- FR-006 divider + handle visible ✓ (T006)  
- FR-007 left clips, right fills ✓ (T006)  
- FR-008 PRZED/PO labels ✓ (T012)  
- FR-009 hint disappears ✓ (T013)  
- FR-010 IntersectionObserver preserved ✓ (T014)  
- FR-011 no third-party drag ✓ (T002/T003)
