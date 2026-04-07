# Feature Specification: Before/After Slider Custom Drag Implementation

**Feature Branch**: `004-fix-slider-drag-smooth`
**Created**: 2026-04-07
**Status**: Draft
**Input**: User description: "Fix the before/after slider, it should be moving smoothly with cursor movement (dragging), correctly calculate positions using getBoundingClientRect() inside the move handler."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Smooth Continuous Drag on Desktop (Priority: P1)

A visitor on desktop holds the mouse button down on the slider bar and drags left or right. The before/after split follows the cursor continuously and smoothly for the entire duration of the drag — it does not stop, freeze, or lose tracking mid-drag.

**Why this priority**: Continuous drag is the core interaction. Every previous bug report has been about drag breaking mid-motion. This is the single most important behaviour to get right.

**Independent Test**: Load the home page, scroll to the comparison section, hold the mouse button on the handle and drag slowly from one side to the other. The split must follow the cursor with no freezing, no jumping, and no loss of tracking for the full distance.

**Acceptance Scenarios**:

1. **Given** the slider is mounted and visible, **When** the visitor holds the mouse button and drags left or right, **Then** the before/after split follows the cursor position continuously until mouse release.
2. **Given** the visitor drags quickly and the pointer exits the image container, **When** the mouse continues moving outside the container, **Then** the split continues tracking until the mouse button is released.
3. **Given** the visitor releases the mouse button at any position, **When** the button is released, **Then** drag tracking ends and the split remains at the last pointer position.

---

### User Story 2 - Smooth Continuous Drag on Mobile / Touch (Priority: P2)

A visitor on a mobile touchscreen holds a finger on the slider and swipes horizontally. The split follows the finger continuously without losing tracking mid-swipe.

**Why this priority**: The site is mobile-first. Touch drag must be as reliable as mouse drag.

**Independent Test**: On a real mobile device or touch-emulation, press and swipe horizontally across the slider. The reveal must follow the finger without stopping.

**Acceptance Scenarios**:

1. **Given** the slider is mounted and visible on a touch device, **When** the visitor places a finger on the container and swipes, **Then** the split tracks the touch position continuously.
2. **Given** a swipe starts on the handle and the finger moves off it during the swipe, **When** the finger continues moving, **Then** tracking continues until the finger lifts.

---

### User Story 3 - Accurate Position Calculation at All Scroll Depths (Priority: P3)

The split percentage calculated from pointer position must be accurate regardless of page scroll depth, container position on the page, or whether the slider entered the viewport recently.

**Why this priority**: Previous bugs were caused by stale container measurements. Accurate real-time measurement on every drag event eliminates this class of bug permanently.

**Independent Test**: Scroll to the slider from the top of the page with no DevTools open. Click at the leftmost 10% of the image — the split must land near 10%, not near 50% or off by a large margin.

**Acceptance Scenarios**:

1. **Given** the slider has just entered the viewport after scrolling, **When** the visitor clicks at the far-left edge of the image, **Then** the split moves to approximately 0–10% of the image width.
2. **Given** the visitor drags from left to right across the entire image width, **When** the drag completes, **Then** the split covers the full 0–100% range proportionally.

---

### Edge Cases

- What happens when the pointer or finger leaves the container during drag? Drag tracking must continue until release — the move handler is on `window`, not the container.
- What happens when both mouse and touch events fire simultaneously (hybrid devices)? Only one drag session is active at a time; the first input wins until released.
- What happens when the user clicks or taps without dragging? The split moves to the click/tap position immediately.
- What happens on very narrow mobile screens where the container is small? `getBoundingClientRect()` returns the actual rendered dimensions — accuracy is maintained regardless of container size.
- What happens if the visitor releases the mouse/touch outside the browser window? `mouseup`/`touchend` on `window` fires correctly in all modern browsers.
- What happens on the first load before images are fully decoded? The container width is available from CSS layout immediately — position calculation does not depend on image load state.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The slider split position MUST update in real time during drag — the move handler MUST call `getBoundingClientRect()` on the container on every `mousemove` and `touchmove` event to obtain fresh, accurate container bounds.
- **FR-002**: Drag MUST start on `mousedown` or `touchstart` anywhere in the image container and remain active until `mouseup` or `touchend` is received on `window`.
- **FR-003**: The `mousemove` and `touchmove` listeners during drag MUST be attached to `window` (not the container) so that tracking continues even when the pointer leaves the container boundary.
- **FR-004**: After drag ends (`mouseup`/`touchend`), the `window` move and end listeners MUST be removed immediately to prevent memory leaks and phantom tracking.
- **FR-005**: The calculated split position MUST be clamped to the range [0, 1] — it must never produce a position outside the valid image bounds.
- **FR-006**: A visible vertical divider line and draggable handle MUST be rendered at the current split position.
- **FR-007**: The left-side image (before / dirty car) MUST be clipped to reveal only the portion left of the split. The right-side image (after / clean car) MUST fill the remainder.
- **FR-008**: The "PRZED" and "PO" labels in the bottom-left and bottom-right corners of the image container MUST be present and visible at all split positions.
- **FR-009**: The "Przesuń, aby oczyścić" hint text MUST be visible before the first interaction and MUST disappear after the first drag or click/tap event.
- **FR-010**: The component MUST preserve the existing `IntersectionObserver`-based deferred mount: the interactive slider MUST NOT be rendered until the container has entered the viewport, and a placeholder image MUST be shown while waiting.
- **FR-011**: The drag implementation MUST NOT depend on any third-party library's internal event handling or cached dimension state — all position calculations MUST use values obtained at event time.

### Key Entities

- **SliderPosition**: A number in the range [0, 1] representing the normalised horizontal split position. 0 = fully before (dirty car), 1 = fully after (clean car). Owned by local component state, updated on every pointer/touch move event.
- **DragState**: A boolean indicating whether a drag is currently in progress. Used to gate the `window` move listener and prevent phantom tracking after release.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A slow deliberate left-to-right drag from edge to edge moves the split continuously from 0% to 100% with no freezing or loss of tracking at any point.
- **SC-002**: Clicking or tapping at the leftmost 10% of the container positions the split within ±5% of the tap position.
- **SC-003**: Dragging quickly — fast enough for the pointer to leave the image container — continues tracking until mouse/touch release.
- **SC-004**: On both desktop (mouse) and a mobile touch device, drag works correctly after scrolling to the section from the top of the page with no DevTools open.
- **SC-005**: No browser console errors appear during drag, on release, or after multiple repeated drag interactions.
- **SC-006**: The PRZED/PO labels remain visible and in correct position at all split percentages including 0% and 100%.

## Assumptions

- The two comparison images (`/mercedes-profil-gpt.webp` and `/mercedes-profil-oryg.webp`) remain unchanged.
- The fix is scoped entirely to `src/components/home/BeforeAfterSlider.jsx`.
- No new npm packages are required — the custom drag uses only native browser APIs (`getBoundingClientRect`, `addEventListener`, `removeEventListener`).
- `react-compare-image` may be removed from this component if a fully custom implementation is cleaner; the library is not a hard requirement for this feature.
- The existing dark theme, Tailwind CSS classes, section layout, heading text, and subtext remain unchanged.
- `IntersectionObserver` is available in all targeted browsers (no polyfill needed).
- The three superseded slider spec folders (`001-before-after-slider-ux`, `002-fix-slider-drag`, `003-fix-slider-deferred-mount`) are deleted. `004-fix-slider-drag-smooth` is the sole authoritative slider specification.

## Clarifications

### Session 2026-04-07

- Q: What should happen to the previous three slider spec folders (001, 002, 003) now that 004 is the authoritative implementation? → A: Delete all three permanently — 004 is the only slider spec that matters.

