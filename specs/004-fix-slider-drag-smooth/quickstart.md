# Quickstart: Implementing Custom Drag in BeforeAfterSlider

**Feature**: 004-fix-slider-drag-smooth  
**File to change**: `src/components/home/BeforeAfterSlider.jsx`  
**Phase**: 1 — Implementation guide

---

## Overview

Replace the `ReactCompareImage` component with a custom two-image reveal layout that uses native
browser event APIs. The component keeps its existing `IntersectionObserver` deferred-mount
pattern unchanged.

---

## Step 1 — Update imports

Remove the `react-compare-image` import and `useCallback`. The hook is no longer needed because
`handlePositionChange` is removed. Keep `useEffect`, `useRef`, `useState`.

```jsx
// Before
import { useCallback, useEffect, useRef, useState } from 'react'
import ReactCompareImage from 'react-compare-image'

// After
import { useEffect, useRef, useState } from 'react'
```

---

## Step 2 — Update state and refs

Remove `handlePositionChange`/`useCallback`. Add `sliderPosition` state and `isDragging` ref.

```jsx
const [isVisible, setIsVisible] = useState(false)
const [hasInteracted, setHasInteracted] = useState(false)
const [sliderPosition, setSliderPosition] = useState(0.5)
const containerRef = useRef(null)
const isDragging = useRef(false)
```

---

## Step 3 — Keep IntersectionObserver unchanged

The existing `useEffect` that observes `containerRef` with threshold 0.5 remains exactly as-is.
No changes needed here.

---

## Step 4 — Add drag event handlers (after the IntersectionObserver useEffect)

```jsx
useEffect(() => {
  const container = containerRef.current
  if (!container) return

  function getPosition(clientX) {
    const rect = container.getBoundingClientRect()
    return Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
  }

  function handleMove(e) {
    if (!isDragging.current) return
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    e.preventDefault()
    setSliderPosition(getPosition(clientX))
  }

  function handleEnd() {
    isDragging.current = false
    window.removeEventListener('mousemove', handleMove)
    window.removeEventListener('mouseup', handleEnd)
    window.removeEventListener('touchmove', handleMove)
    window.removeEventListener('touchend', handleEnd)
  }

  function handleStart(e) {
    isDragging.current = true
    if (!hasInteracted) setHasInteracted(true)
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    setSliderPosition(getPosition(clientX))
    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseup', handleEnd)
    window.addEventListener('touchmove', handleMove, { passive: false })
    window.addEventListener('touchend', handleEnd)
  }

  container.addEventListener('mousedown', handleStart)
  container.addEventListener('touchstart', handleStart, { passive: false })

  return () => {
    container.removeEventListener('mousedown', handleStart)
    container.removeEventListener('touchstart', handleStart)
    // Also clean up window listeners in case component unmounts during drag
    window.removeEventListener('mousemove', handleMove)
    window.removeEventListener('mouseup', handleEnd)
    window.removeEventListener('touchmove', handleMove)
    window.removeEventListener('touchend', handleEnd)
  }
}, [hasInteracted])
```

**Key notes**:
- `hasInteracted` is in the dependency array because `handleStart` closes over it. This causes the
  effect to re-run once (when `hasInteracted` flips to `true`), which is safe — it re-attaches the
  same listener. After that the effect never re-runs again.
- `e.preventDefault()` in `handleMove` prevents page scroll on mobile during horizontal swipe.
- `getPosition` calls `getBoundingClientRect()` on every event — satisfies FR-001.
- All window listeners are removed in cleanup — satisfies FR-004.

---

## Step 5 — Replace the JSX inside `{isVisible ? ... : ...}`

The `ReactCompareImage` block is replaced with a custom two-image layout. Only the `isVisible`
branch changes; the placeholder `<img>` (false branch) stays identical.

```jsx
{isVisible ? (
  <div className="relative w-full select-none overflow-hidden" style={{ aspectRatio: '16/9' }}>
    {/* Right image — always full width, sits underneath */}
    <img
      src={RIGHT_SRC}
      alt="Mercedes — stan po detailingu (oryg)"
      className="absolute inset-0 h-full w-full object-cover"
      draggable={false}
    />
    {/* Left image — clipped to sliderPosition% */}
    <div
      className="absolute inset-0 h-full overflow-hidden"
      style={{ width: `${sliderPosition * 100}%` }}
    >
      <img
        src={LEFT_SRC}
        alt="Mercedes — stan przed (GPR)"
        className="h-full w-full object-cover"
        style={{ width: containerRef.current?.offsetWidth ?? '100%' }}
        draggable={false}
      />
    </div>
    {/* Divider line */}
    <div
      className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-[#d4af37]"
      style={{ left: `${sliderPosition * 100}%` }}
      aria-hidden="true"
    />
    {/* Handle circle */}
    <div
      className="pointer-events-none absolute top-1/2 z-10 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#d4af37] bg-black/70 shadow-lg"
      style={{ left: `${sliderPosition * 100}%` }}
      aria-hidden="true"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M5 3L1 8l4 5M11 3l4 5-4 5" stroke="#d4af37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  </div>
) : (
  <img
    src={LEFT_SRC}
    alt="Mercedes — stan przed detailingiem"
    className="w-full h-auto"
  />
)}
```

**Notes on the left-image clip approach**:
- The clip wrapper `div` has `overflow-hidden` and `width: ${sliderPosition * 100}%`.
- The `<img>` inside must be rendered at its *natural* width (the container's full width), not the
  clip wrapper's reduced width — otherwise the left image compresses rather than clips. Setting
  `style={{ width: containerRef.current?.offsetWidth ?? '100%' }}` on the inner `<img>` achieves
  this. Alternatively, use `min-w-full` Tailwind class if the container width is available at CSS
  level (it usually is since the container is 100% of its parent).

---

## Step 6 — Update ARIA on the container div

Add `role="separator"` or `aria-valuenow` to communicate slider position to screen readers.
The existing `aria-label="Porównanie: przed i po detailingu"` on `containerRef` div stays.

```jsx
<div
  ref={containerRef}
  role="group"
  aria-label="Porównanie: przed i po detailingu. Przeciągnij, aby zmienić punkt podziału."
  className="relative select-none overflow-hidden rounded-2xl border border-white/10 shadow-[0_24px_80px_-28px_rgba(0,0,0,0.85)] [&_img]:pointer-events-none cursor-ew-resize"
>
```

Add `cursor-ew-resize` to signal draggability.

---

## Step 7 — Remove unused `SLIDER_GOLD` constant (optional)

`SLIDER_GOLD` was used as a prop value for `ReactCompareImage`. With the new custom layout, the
color is hardcoded directly in Tailwind class `border-[#d4af37]` and `bg-[#d4af37]`. Remove the
constant if no longer referenced — or keep it for the SVG stroke color.

---

## Validation Checklist

After implementation, verify each FR manually:

- [ ] **FR-001**: Drag position updates on every pixel of mouse movement (no jitter, no lag)
- [ ] **FR-002**: Drag starts anywhere inside the container, not just on the handle
- [ ] **FR-003**: Moving pointer outside the container during drag continues tracking
- [ ] **FR-004**: No console errors after repeating drag 10+ times (no listener leaks)
- [ ] **FR-005**: Dragging to the far left reaches 0% (left image fully hidden); right reaches 100%
- [ ] **FR-006**: Divider line and handle circle are visible at all positions
- [ ] **FR-007**: Left image clips correctly (does not compress); right image fills remainder
- [ ] **FR-008**: PRZED/PO labels visible at 0% and 100% split positions
- [ ] **FR-009**: Hint text disappears after first interaction
- [ ] **FR-010**: Slider does not render until container is 50%+ in viewport
- [ ] **FR-011**: No `react-compare-image` in the component's import list

---

## Common Pitfalls

| Pitfall | Fix |
|---------|-----|
| Left image compresses instead of clipping | Give the inner `<img>` a fixed pixel width equal to container width (via ref or `min-w-full`) |
| `aspectRatio` not matching actual image | Check actual image dimensions; use `aspect-video` (16/9) or let the right image drive height with `h-auto w-full` |
| Touch scroll and drag conflict | Ensure `{ passive: false }` on `touchmove` and `touchstart`; call `e.preventDefault()` in `handleMove` |
| Effect re-runs on every `sliderPosition` change | `sliderPosition` must NOT be in the `useEffect` dependency array; only `hasInteracted` belongs there |
| Listeners not cleaned up on unmount | The `useEffect` return function must remove all four window listeners |
