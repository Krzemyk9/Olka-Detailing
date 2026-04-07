# Quickstart: Portfolio Asset Naming and Realizacje Details

## Goal

Prepare and verify the realizacje page so it shows confirmed car photos with accurate labels and
service descriptions, backed by descriptive portfolio asset names.

## Implementation Steps

1. Review the current portfolio assets in `public/` and select only the photos that can be matched to a confirmed car and service.
2. Rename and, if needed, normalize the selected production images to descriptive WebP or AVIF filenames.
3. Extend `src/constants/galleryData.js` so each completed realizacja entry includes its image path, alt text, and any confirmation metadata required by implementation.
4. Update `src/pages/Portfolio.jsx` to render the real image card media instead of the placeholder image block.
5. Verify the category grouping still renders correctly and no mislabeled entries remain.

## Manual Verification

1. Run `npm run dev`.
2. Open `/realizacje`.
3. Confirm each updated card shows a real image, a correct car name, and a matching service description.
4. Confirm the page remains readable on mobile width and desktop width.
5. Confirm the browser network panel requests the renamed production asset paths successfully.
6. Confirm no placeholder "Zdjęcie wkrótce" cards remain for entries that were marked complete in this feature.

## Rollback Check

If a photo cannot be confidently matched to a car and service, remove that entry from the completed
set rather than publishing uncertain content.