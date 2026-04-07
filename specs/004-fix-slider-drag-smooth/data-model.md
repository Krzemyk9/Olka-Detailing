# Data Model: Before/After Slider Custom Drag

**Feature**: 004-fix-slider-drag-smooth  
**Phase**: 1 — Design

---

## Component State

### `sliderPosition`

| Property | Value |
|----------|-------|
| Type | `number` |
| Range | `[0, 1]` — inclusive on both ends |
| Initial value | `0.5` (centred) |
| Storage | `React.useState` |
| Owner | `BeforeAfterSlider` |
| Purpose | Normalised horizontal split position. `0` = fully before (dirty car), `1` = fully after (clean car). Drives the visual clip width and divider line position. |
| Update trigger | Every `mousemove`/`touchmove` event during active drag; also on initial `mousedown`/`touchstart` so a single tap repositions the split. |
| Clamping | `Math.max(0, Math.min(1, rawValue))` before `setState` — ensures the value never leaves `[0, 1]`. |

---

### `isVisible`

| Property | Value |
|----------|-------|
| Type | `boolean` |
| Initial value | `false` |
| Storage | `React.useState` |
| Owner | `BeforeAfterSlider` |
| Purpose | Gates mount of the interactive slider. `false` → placeholder `<img>` shown. `true` → full slider rendered. Set once by `IntersectionObserver` when the container crosses the 0.5 threshold. Never reverts to `false`. |
| Update trigger | `IntersectionObserver` callback (threshold 0.5, one-shot: observer disconnects after first intersection). |

---

### `hasInteracted`

| Property | Value |
|----------|-------|
| Type | `boolean` |
| Initial value | `false` |
| Storage | `React.useState` |
| Owner | `BeforeAfterSlider` |
| Purpose | Controls visibility of the "Przesuń, aby oczyścić" hint text. Set to `true` on the first `mousedown`/`touchstart` event and never reverts. |
| Update trigger | `handleDragStart` (mousedown/touchstart handler) — called once; guarded with `if (!hasInteracted)` to avoid repeated setState calls. |

---

## Refs

### `containerRef`

| Property | Value |
|----------|-------|
| Type | `React.MutableRefObject<HTMLDivElement \| null>` |
| Attached to | The outer `div` wrapping both images (the element that defines the drag area). |
| Purpose | Provides access to the DOM node for `IntersectionObserver.observe()` and for `getBoundingClientRect()` inside the move handler to obtain fresh container bounds on every event. |

---

### `isDragging`

| Property | Value |
|----------|-------|
| Type | `React.MutableRefObject<boolean>` |
| Initial value | `false` |
| Storage | `React.useRef` — **not state** |
| Purpose | Boolean flag read inside the `window` move handler to decide whether to compute a new position. Set to `true` on `mousedown`/`touchstart`; set to `false` on `mouseup`/`touchend`. Using a ref prevents the re-renders that caused listener teardown in the feature-003 bug. |

---

## Derived Values (computed inline, not stored)

| Name | Computation | Used for |
|------|-------------|----------|
| `leftWidthPct` | `sliderPosition * 100` + `'%'` | Inline `style.width` on the left-image clip wrapper |
| `dividerLeftPct` | `sliderPosition * 100` + `'%'` | Inline `style.left` on the divider/handle element |
| `rawPos` | `(clientX - rect.left) / rect.width` | Intermediate move-handler value before clamping |

---

## Event Handler Summary

| Handler | Trigger | Attached to | Behaviour |
|---------|---------|-------------|-----------|
| `handleDragStart` | `mousedown`, `touchstart` | Container `div` (JSX prop) | Sets `isDragging.current = true`; sets `hasInteracted = true` (once); computes initial position; attaches `handleMove` + `handleDragEnd` to `window` |
| `handleMove` | `mousemove`, `touchmove` | `window` (imperative, during drag only) | Calls `containerRef.current.getBoundingClientRect()`; computes clamped position; calls `setSliderPosition`; calls `event.preventDefault()` (touchmove, `passive: false`) |
| `handleDragEnd` | `mouseup`, `touchend` | `window` (imperative, during drag only) | Sets `isDragging.current = false`; removes `handleMove` + `handleDragEnd` from `window` |

---

## State Transitions

```
[mounted, isVisible=false]
      │
      │  IntersectionObserver fires (threshold 0.5)
      ▼
[isVisible=true, sliderPosition=0.5, hasInteracted=false]
      │
      │  user mousedown/touchstart on container
      ▼
[isDragging=true, hasInteracted=true, window listeners attached]
      │
      │  user moves pointer/finger
      ▼
[sliderPosition updated on each event, 0 ≤ pos ≤ 1]
      │
      │  user releases mouse/finger
      ▼
[isDragging=false, window listeners removed]
      │
      └─ (cycle repeats for subsequent drags)
```

---

## Visual Layout Model

```
containerRef div  [relative, overflow-hidden, rounded-2xl]
├── right image   [absolute inset-0, w-full h-full object-cover]   ← always full-width, underneath
├── left image    [absolute inset-0, h-full object-cover]           ← clipped to sliderPosition%
│   └── style={{ width: leftWidthPct, overflow: 'hidden' }}
├── divider line  [absolute top-0 h-full w-0.5 bg-[#d4af37] -translate-x-1/2]
│   └── style={{ left: dividerLeftPct }}
├── handle circle [absolute top-1/2 -translate-x-1/2 -translate-y-1/2]
│   └── style={{ left: dividerLeftPct }}
├── PRZED label   [absolute bottom-3 left-3 z-10]
└── PO label      [absolute bottom-3 right-3 z-10]
```
