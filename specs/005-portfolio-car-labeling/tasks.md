# Tasks: Portfolio Asset Naming and Realizacje Details

**Input**: Design documents from `/specs/005-portfolio-car-labeling/`  
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/ ✅, quickstart.md ✅

**Tests**: Manual verification only. The feature spec and plan do not request TDD or automated test coverage.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Confirm the current source of truth for portfolio assets and realizacje content before implementation starts.

- [X] T001 Review the current portfolio asset inventory in public/ together with the realizacje data in src/constants/galleryData.js and the card rendering in src/pages/Portfolio.jsx

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish the shared realizacje record shape required by all user stories.

**⚠️ CRITICAL**: No user story work should start until this phase is complete.

- [X] T002 Introduce the shared `image`, `imageAlt`, and `assetStatus` fields across the realizacje records in src/constants/galleryData.js

**Checkpoint**: The gallery data structure can now distinguish confirmed portfolio entries from unpublished placeholders.

---

## Phase 3: User Story 1 - Browse trustworthy realizacje (Priority: P1) 🎯 MVP

**Goal**: Visitors can see confirmed car photos together with the correct vehicle name and service description on `/realizacje`.

**Independent Test**: Run the app, open `/realizacje`, and confirm each completed entry shows a real image plus matching car and service copy instead of placeholder media.

### Implementation for User Story 1

- [X] T003 [US1] Populate the confirmed realizacje entries with live image paths, vehicle names, service descriptions, and `assetStatus: 'confirmed'` in src/constants/galleryData.js
- [X] T004 [US1] Replace the placeholder media box with rendered portfolio images using `item.image` and `item.imageAlt` in src/pages/Portfolio.jsx
- [X] T005 [US1] Keep an intentional non-final state for any unconfirmed entries so src/pages/Portfolio.jsx never shows incorrect photos or misleading copy

**Checkpoint**: User Story 1 is complete when the realizacje page shows trustworthy, image-backed cards for every confirmed entry.

---

## Phase 4: User Story 2 - Maintain understandable asset names (Priority: P2)

**Goal**: The selected public portfolio assets use descriptive filenames that the owner can recognize without opening them.

**Independent Test**: Review the selected image files in public/ and confirm their filenames identify the represented car or realization more clearly than the imported Instagram-style names.

### Implementation for User Story 2

- [ ] T006 [P] [US2] Rename or normalize the generic Mercedes-focused source assets in public/569765294_122150391458878299_4901990793934185919_n.png, public/587553114_122157714638878299_3488121233590070926_n.png, and public/589395498_122157714626878299_8523493689834055853_n.png to descriptive production filenames in public/
- [ ] T007 [P] [US2] Rename or normalize the generic Land Rover-focused source assets in public/589728316_122158716674878299_2846900258488985297_n.png, public/590727309_122158716746878299_8058658858297182303_n.png, and public/591814757_122158716758878299_8800126011738263523_n.png to descriptive production filenames in public/
- [ ] T008 [US2] Decide whether public/(1) Instagram.png belongs in the realizacje set, then either rename it descriptively for production use in public/ or exclude it from the selected portfolio assets in src/constants/galleryData.js
- [ ] T009 [US2] Replace any temporary or generic portfolio asset references with the final descriptive public paths in src/constants/galleryData.js

**Checkpoint**: User Story 2 is complete when the selected realizacje images use human-readable production filenames and the data file points only to those final paths.

---

## Phase 5: User Story 3 - Keep portfolio content internally consistent (Priority: P3)

**Goal**: Every published realizacja card keeps its photo, visible car name, service description, alt text, and category aligned.

**Independent Test**: Compare each completed card on `/realizacje` against its chosen image and confirm the photo, label, hint, and category all describe the same job without speculative naming.

### Implementation for User Story 3

- [ ] T010 [US3] Reconcile every published `label`, `hint`, and `category` against the chosen realizacja image in src/constants/galleryData.js
- [ ] T011 [US3] Tighten the accessible image descriptions and any supporting card copy so src/constants/galleryData.js and src/pages/Portfolio.jsx avoid speculative model or trim claims
- [ ] T012 [US3] Remove from the completed set, or keep intentionally unpublished, any entry in src/constants/galleryData.js that cannot be matched confidently to a photo and service pair

**Checkpoint**: User Story 3 is complete when a manual review finds no mismatch between any displayed photo, car name, service description, alt text, or category.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Validate the finished content and ensure the route still builds cleanly.

- [ ] T013 Run the manual realizacje verification checklist in specs/005-portfolio-car-labeling/quickstart.md
- [X] T014 Run the lint validation defined in package.json
- [X] T015 Run the production build validation defined in package.json

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Starts immediately.
- **Foundational (Phase 2)**: Depends on Phase 1 and blocks all user story implementation.
- **User Story 1 (Phase 3)**: Starts after Phase 2 and delivers the MVP.
- **User Story 2 (Phase 4)**: Starts after Phase 2; its asset renaming work can proceed after or alongside MVP card wiring, but T009 must land before final validation.
- **User Story 3 (Phase 5)**: Starts after the relevant US1 and US2 content updates are in place because it validates and corrects the final published pairings.
- **Polish (Phase 6)**: Starts after all desired user stories are complete.

### User Story Dependencies

- **US1 (P1)**: Depends only on the shared realizacje schema from Phase 2.
- **US2 (P2)**: Depends on the same shared schema from Phase 2 and updates the supporting asset library used by realizacje.
- **US3 (P3)**: Depends on the published content produced by US1 and the final filenames from US2 so it can reconcile the finished card set.

### Parallel Opportunities

- T006 and T007 can run in parallel because they target different groups of source image files in public/.
- After Phase 2, one person can work in src/pages/Portfolio.jsx while another prepares renamed assets in public/.
- Validation tasks T014 and T015 should be run after implementation is complete, but they are independent checks once the code is stable.

---

## Parallel Example: User Story 2

```bash
# Rename the two asset groups in parallel once the confirmed image list is known:
Task: "Rename or normalize the generic Mercedes-focused source assets in public/569765294_122150391458878299_4901990793934185919_n.png, public/587553114_122157714638878299_3488121233590070926_n.png, and public/589395498_122157714626878299_8523493689834055853_n.png to descriptive production filenames in public/"
Task: "Rename or normalize the generic Land Rover-focused source assets in public/589728316_122158716674878299_2846900258488985297_n.png, public/590727309_122158716746878299_8058658858297182303_n.png, and public/591814757_122158716758878299_8800126011738263523_n.png to descriptive production filenames in public/"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1.
2. Complete Phase 2.
3. Complete Phase 3.
4. Validate `/realizacje` manually before expanding scope.

### Incremental Delivery

1. Ship the image-backed realizacje cards in US1.
2. Normalize and clean up the underlying public asset names in US2.
3. Reconcile all labels, alt text, and categories in US3.
4. Finish with lint, build, and quickstart validation.

### Parallel Team Strategy

1. One person prepares the gallery data and page rendering in src/constants/galleryData.js and src/pages/Portfolio.jsx.
2. Another person normalizes and renames the selected portfolio assets in public/.
3. Final review aligns all cards against the confirmed photo set before validation.

---

## Notes

- All tasks follow the required checklist format with IDs, optional `[P]` markers, story labels for user-story phases, and file paths.
- No automated test tasks are included because the feature documentation requests manual validation only.
- Suggested MVP scope: Phase 3 / User Story 1.