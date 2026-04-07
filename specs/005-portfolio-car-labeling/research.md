# Research: Portfolio Asset Naming and Realizacje Details

**Feature**: 005-portfolio-car-labeling  
**Phase**: 0 - Unknowns resolved before implementation

---

## Decision 1 - Keep portfolio asset references in `public/` and point to them by URL strings

**Decision**: Selected realizacje images will remain in `public/` and be referenced from
`src/constants/galleryData.js` using root-relative URL strings such as `/range-rover-interior-detailing.webp`.

**Rationale**: The repo already uses `public/` asset URLs directly for site imagery. This matches
the current Vite setup, avoids introducing import churn in the constants layer, and keeps content
updates simple for a small static marketing site.

**Alternatives considered**:
- Import every image into the constants file from `src/assets/` -> Rejected: adds extra code
  ceremony without improving a small static content workflow.
- Keep generic imported filenames and only map them in data -> Rejected: fails the feature goal
  of making the asset library understandable to the owner.

---

## Decision 2 - Normalize chosen portfolio images to descriptive production filenames

**Decision**: Portfolio images used in realizacje will follow descriptive, human-readable file
names that identify the car or realization, and production-ready images will use WebP or AVIF.

**Rationale**: The constitution explicitly requires optimized production image formats and the
spec requires asset names that can be recognized without opening the file. Naming the files around
the visible car and job keeps content management accurate and reduces the chance of the wrong image
being attached to a card.

**Alternatives considered**:
- Leave existing Instagram-export PNG names in place -> Rejected: unreadable names make future
  maintenance error-prone and conflict with the feature requirement.
- Rename files descriptively but keep PNG for production -> Rejected: conflicts with the image
  optimization rule in the constitution.

---

## Decision 3 - Extend `GALLERY_ITEMS` with media metadata instead of creating a second mapping

**Decision**: Each realizacja entry in `GALLERY_ITEMS` should carry its own media fields, including
image path and alt text, alongside the existing `label`, `category`, and `hint` properties.

**Rationale**: The current portfolio page already renders directly from `GALLERY_ITEMS`. Keeping
all card metadata in a single record preserves clean data separation and avoids joining two arrays
or scattering content across multiple files.

**Alternatives considered**:
- Keep captions in `GALLERY_ITEMS` and create a separate `IMAGE_MAP` object -> Rejected: creates
  unnecessary duplication and makes consistency checks harder.
- Hardcode image markup directly in `Portfolio.jsx` -> Rejected: violates the repo's data
  separation rule and complicates future content edits.

---

## Decision 4 - Only publish confirmed vehicle and service pairings

**Decision**: Realizacje cards will only be completed for assets where the visible car and the
service description can be matched with high confidence; uncertain items should use the most
accurate confirmed name available or be excluded from the prepared set.

**Rationale**: The spec prioritizes accuracy over filling every slot. A premium portfolio loses
credibility faster from a mislabeled car or service than from having fewer showcased entries.

**Alternatives considered**:
- Guess model/trim names from partial visuals -> Rejected: introduces avoidable accuracy risk.
- Keep all current entries and attach the nearest-looking photo -> Rejected: fails the internal
  consistency requirement.

---

## Decision 5 - Preserve current category grouping and upgrade the existing card layout

**Decision**: The current category-based grouping in `Portfolio.jsx` remains intact, while each
card is upgraded from a placeholder media box to an actual image block with descriptive copy.

**Rationale**: The page structure already communicates service categories and only lacks real media.
Keeping the grouping minimizes code churn and delivers the business value with the smallest change.

**Alternatives considered**:
- Redesign the entire realizacje page layout -> Rejected: beyond scope for a content-completion
  feature.
- Flatten all entries into one masonry gallery -> Rejected: removes the service grouping already
  present in the current page.