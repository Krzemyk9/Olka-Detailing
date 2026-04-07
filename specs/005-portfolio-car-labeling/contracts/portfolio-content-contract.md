# Contract: Portfolio Content Record

**Feature**: 005-portfolio-car-labeling  
**Type**: Internal UI content contract for realizacje data

## Purpose

Define the shape each realizacja record must satisfy before it can be rendered as a completed
portfolio card on `/realizacje`.

## Record Shape

```js
{
  id: number,
  label: string,
  category: string,
  hint: string,
  image: string,
  imageAlt: string,
  assetStatus: 'confirmed'
}
```

## Field Requirements

| Field | Requirement |
|-------|-------------|
| `id` | Unique among all gallery items |
| `label` | Uses the confirmed vehicle display name shown to visitors |
| `category` | Matches the intended realizacje section grouping |
| `hint` | States the work performed on that car in customer-facing language |
| `image` | Uses a root-relative path to a descriptively named `public/` asset |
| `imageAlt` | Describes the visible vehicle and result in accessible Polish copy |
| `assetStatus` | Must be `confirmed` before the live image card is rendered |

## Rendering Guarantees

- A record that satisfies this contract can be rendered without fallback placeholder media.
- The displayed image, label, and hint must refer to the same job.
- Records that do not satisfy the contract must not silently masquerade as complete realizacje entries.

## Non-Goals

- This contract does not define backend storage or API payloads.
- This contract does not require multiple images per card for this feature scope.