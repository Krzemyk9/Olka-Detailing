# Research: Before/After Slider Custom Drag

**Feature**: 004-fix-slider-drag-smooth  
**Phase**: 0 — Unknowns resolved before implementation

---

## Decision 1 — Remove `react-compare-image` drag; keep library import until visual is replaced

**Decision**: Delete all `ReactCompareImage` usage from `BeforeAfterSlider.jsx` and replace with
a custom two-image layout plus native event listeners. The `react-compare-image` package remains
in `package.json` (not uninstalled) since the spec scope is limited to one component and the
project constitution notes it as part of the stack for before/after comparisons elsewhere.

**Rationale**: The library wires its own `window.mousemove` listener inside a `useEffect`
whose dependency array includes the `onSliderPositionChange` prop. Any time the parent
re-renders and passes a new function reference, the effect re-runs, removing and re-adding the
listener — breaking drag if the re-render races with a pointer-move event. The library also
calls `getBoundingClientRect()` once at mount inside `useLayoutEffect`, caching the result.
After the container scrolls or the page reflowes, the cached value causes position miscalculation.

**Alternatives considered**:
- Keep the library, stabilise all props with `useMemo`/`useCallback`, and wrap the component in
  `React.memo` to prevent re-renders → Rejected: already applied `useCallback` in feature 003;
  the library's internal `useLayoutEffect` measurement cache is still wrong after scroll. Does not
  satisfy FR-001.
- Use Framer Motion `drag` prop + `onDrag` callback with `getBoundingClientRect()` →  Rejected:
  Framer Motion moves the dragged element itself (via `transform`), creating a second position
  truth that must be suppressed with `dragMomentum={false}` + `dragElastic={0}`. Constitutes the
  same class of third-party cached-state bug (FR-011). Added complexity for no benefit.
- Use a `<input type="range">` element → Rejected: native range sliders cannot overlay two images
  in a reveal pattern; requires matching custom visual anyway.

---

## Decision 2 — `isDragging` stored as a `ref`, not state

**Decision**: Use `const isDragging = useRef(false)` to track whether a drag is in progress.

**Rationale**: `isDragging` is read inside event callbacks and written on `mousedown`/
`mouseup`. Making it state would trigger a React re-render on every drag start and drag end.
Re-renders during active drag have historically been the root cause of listener teardown bugs
(see feature 003 post-mortem). A ref is mutated synchronously without scheduling a render.
The value only needs to *gate* listener activation — it is never rendered into the DOM.

**Alternatives considered**:
- `useState(false)` → Rejected: causes one re-render on `mousedown` and another on `mouseup`,
  opening a window where React reconciliation can interrupt the event listener chain.

---

## Decision 3 — `sliderPosition` stored as state (number [0, 1])

**Decision**: Use `const [sliderPosition, setSliderPosition] = useState(0.5)` to drive the
visual split.

**Rationale**: The split percentage must cause a DOM update (clip width and divider position
change on every move event) — this is exactly the use case for React state. React batches
synchronous state updates during event handlers in React 18+/19, so calling `setSliderPosition`
inside a `window` event callback is safe and will not cause excessive re-renders beyond one per
animation frame.

**Alternatives considered**:
- Manipulate DOM directly via `ref.current.style.setProperty(...)` → Rejected: bypasses React's
  reconciliation, mixing imperative DOM mutation with declarative JSX; harder to read and maintain.
- `useMotionValue` from Framer Motion → Rejected: see Decision 1 (Framer Motion drag path);
  adds Framer Motion dependency to a pattern that needs none.

---

## Decision 4 — `window` listeners attached only during active drag; removed immediately on end

**Decision**: In the `mousedown`/`touchstart` handler: set `isDragging.current = true`, then
`window.addEventListener('mousemove', handleMove, { passive: false })` and
`window.addEventListener('mouseup', handleEnd)`. In `handleEnd`: set `isDragging.current = false`,
call `window.removeEventListener` for both `handleMove` and `handleEnd`, and a matching
`touchend` handler.

**Rationale**: Attaching move/end listeners to `window` (not to the container) satisfies FR-003:
tracking continues even when the pointer leaves the image boundaries. Removing them immediately
on release satisfies FR-004 (no memory leaks, no phantom tracking). Handlers are created inside
a `useEffect` cleanup or inside `useCallback` to guarantee the same function reference is passed
to both `add` and `remove`.

**Alternatives considered**:
- Permanently attached `window.onmousemove` guarded by `isDragging.current` check → Rejected:
  fires on every mouse movement even when not dragging; non-zero CPU cost and poor practice.
- `onMouseMove` on container → Rejected: tracking stops the moment pointer exits the container;
  violates FR-003.

---

## Decision 5 — `{ passive: false }` on `touchmove` to allow `preventDefault()`

**Decision**: Register the `touchmove` listener as `{ passive: false }` and call
`event.preventDefault()` inside `handleMove` when a drag is active.

**Rationale**: On mobile, the browser's default `touchmove` behaviour is to scroll the page.
Without `preventDefault()`, horizontal drags on the slider also scroll the viewport, making the
interaction awkward and inconsistent. `{ passive: false }` is required by modern browsers before
`preventDefault()` can be called in a `touchmove` listener; otherwise the call is ignored with a
console warning.

**Alternatives considered**:
- CSS `touch-action: none` / `touch-action: pan-y` on the container → Noted as a viable
  secondary guard, but CSS `touch-action` only controls the *browser's* gesture handling — it
  does not prevent `touchmove` events from firing or allow JS-level control. Setting it on the
  container div in addition to `preventDefault()` provides belt-and-suspenders protection.
- Ignore scroll interference → Rejected: violates SC-004 (drag works on mobile after scrolling
  to the section).

---

## Decision 6 — CSS custom property `--split` set via single `style` prop on container; children read via inline `style` for dynamic layout

**Decision**: The container element receives `style={{ '--split': sliderPosition }}`. The left-
image clipper and the divider line read this value. However, since `var(--split)` is a unitless
number (0–1 range), child elements apply it as `style={{ width: `${sliderPosition * 100}%` }}`
directly — a single inline `style={{ width }}` call per `sliderPosition` update.

**Rationale**: Static Tailwind classes cannot express runtime-computed percentage widths.
Tailwind v4 JIT generates class names at build time; a class like `w-[63.7%]` is never in the
stylesheet. A CSS custom property on the container is the idiomatic minimal exception (one `style`
attr total), consistent with the spirit of Principle II which targets proliferating inline styles
across many visual properties.

**Alternatives considered**:
- Tailwind arbitrary values: `w-[var(--split)]` → Rejected: only works if the custom property
  has a unit attached (e.g. `%`). A unitless `0.5` does not produce `50%` in CSS.
- CSS Grid / `fr` units → Rejected: cannot dynamically recalculate fr ratios from JS without
  `style` props anyway; no advantage.
