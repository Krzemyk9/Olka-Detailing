# Data Model: Portfolio Asset Naming and Realizacje Details

**Feature**: 005-portfolio-car-labeling  
**Phase**: 1 - Design

---

## Entity: Portfolio Asset

Represents a production image file stored in `public/` and selected for the realizacje section.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `fileName` | string | Yes | Descriptive production filename, e.g. `range-rover-interior-detailing.webp` |
| `publicPath` | string | Yes | Root-relative URL used by the frontend, e.g. `/range-rover-interior-detailing.webp` |
| `format` | enum | Yes | `webp` or `avif` |
| `vehicleDisplayName` | string | Yes | Highest-confidence name for the vehicle shown in the image |
| `serviceSummary` | string | Yes | Human-readable summary of the work shown or associated with the realization |
| `altText` | string | Yes | Accessibility text describing the car and visible result |
| `isConfirmed` | boolean | Yes | Indicates whether the asset has been verified as safe to publish with the assigned vehicle and service description |

### Validation Rules

- `fileName` must be unique within the selected portfolio asset set.
- `publicPath` must match `fileName` and begin with `/`.
- `format` must satisfy the constitution's production image constraint.
- `vehicleDisplayName` must not rely on speculative trim details.
- `isConfirmed` must be `true` before the asset is displayed in realizacje.

---

## Entity: Realizacja Entry

Represents a single card rendered on the realizacje page.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | number | Yes | Stable unique identifier for React rendering |
| `label` | string | Yes | Display name of the vehicle |
| `category` | string | Yes | Service grouping shown as section heading |
| `hint` | string | Yes | Short service description shown under the vehicle name |
| `image` | string | Yes | Root-relative public path for the primary realizacja photo |
| `imageAlt` | string | Yes | Accessible description for the rendered image |
| `assetStatus` | enum | Yes | `confirmed` or `unconfirmed`; only confirmed entries should render a real photo |

### Validation Rules

- `label`, `hint`, `image`, and `imageAlt` must all describe the same car and job.
- `category` must match one of the service groupings intentionally supported on the page.
- Entries marked `unconfirmed` must not be displayed as completed realizacje cards with live images.

---

## Relationship Model

- One `Portfolio Asset` can serve as the primary image for one `Realizacja Entry` in this feature scope.
- One `Realizacja Entry` must reference exactly one confirmed primary `Portfolio Asset` to be considered complete.
- Multiple assets may exist for the same vehicle, but this feature selects a single primary asset per rendered entry.

---

## State Transitions

```text
[asset discovered in public/]
        |
        | identify vehicle + confirm service + rename/normalize file
        v
[asset confirmed]
        |
        | attach publicPath + altText to realizacja entry
        v
[entry render-ready]
        |
        | page loads /realizacje
        v
[entry displayed with image, label, and hint]
```

---

## Derived UI Rules

- `Portfolio.jsx` should treat `image` presence plus `assetStatus === 'confirmed'` as the condition for rendering a live image card.
- `imageAlt` should be required whenever `image` is present.
- Entries that remain unconfirmed should either be omitted from the completed set or retain a clearly intentional non-final state until content is verified.