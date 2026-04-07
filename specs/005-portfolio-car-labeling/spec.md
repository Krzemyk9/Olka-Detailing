# Feature Specification: Portfolio Asset Naming and Realizacje Details

**Feature Branch**: `[005-portfolio-car-labeling]`  
**Created**: 2026-04-07  
**Status**: Draft  
**Input**: User description: "Name those files in public folder, then fill the blank spaces with the proper name of the car, and what is done on the car in realizacje and the photo of that car."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Browse trustworthy realizacje (Priority: P1)

As a visitor reviewing past work, I want each realizacja card to show the actual car photo together with the correct vehicle name and service performed, so I can quickly understand what Olka Detailing has done and judge the quality of work.

**Why this priority**: The realizacje section is a proof-of-quality page. If photos, car names, or service descriptions are missing or generic, the page loses credibility and conversion value.

**Independent Test**: Open the realizacje page and verify that every prepared portfolio entry displays a real photo, a vehicle name, and a matching description of the work performed without placeholder copy.

**Acceptance Scenarios**:

1. **Given** a realizacja has a confirmed vehicle photo and service description, **When** a visitor opens the realizacje page, **Then** the card shows that photo, the vehicle name, and the work completed on that vehicle.
2. **Given** multiple realizacje cards are displayed, **When** a visitor scans the section, **Then** each card can be distinguished by its photo and caption without ambiguity.

---

### User Story 2 - Maintain understandable asset names (Priority: P2)

As the site owner, I want the existing portfolio image files to use descriptive names tied to the visible car and its realization, so I can manage and reuse the gallery assets without guessing what each file contains.

**Why this priority**: Clear asset names reduce content mistakes and make future portfolio updates faster and less error-prone.

**Independent Test**: Review the selected portfolio assets and confirm their names clearly indicate the represented car or realization instead of generic imported filenames.

**Acceptance Scenarios**:

1. **Given** an image chosen for the realizacje section, **When** the asset is reviewed by the owner, **Then** its name clearly identifies the associated car or realization.
2. **Given** two different photos from the portfolio library, **When** the owner compares their names, **Then** the names are distinct enough to avoid selecting the wrong image for a realizacja.

---

### User Story 3 - Keep portfolio content internally consistent (Priority: P3)

As the business owner, I want every realizacja description to match the selected vehicle photo and the actual service performed, so the portfolio remains accurate and professional.

**Why this priority**: A polished portfolio requires consistency between visual proof and written claims. Mismatches would undermine trust.

**Independent Test**: Compare each completed realizacja card against its selected photo and confirm the shown vehicle and listed work refer to the same job.

**Acceptance Scenarios**:

1. **Given** a realizacja entry has a chosen photo, **When** the card is reviewed, **Then** the car name and work description match what is visible in that photo and the intended job record.

### Edge Cases

- If a vehicle cannot be identified with confidence to a specific model or trim, the content uses the most accurate confirmed name available rather than an unsupported guess.
- If more than one photo belongs to the same car, one image is chosen as the primary realizacja photo and the naming remains consistent across related assets.
- If an available photo does not clearly show the service result, that photo is not used as the primary realizacja image for that entry.
- If fewer confirmed photos exist than planned realizacje cards, only confirmed entries are completed and no incorrect vehicle or service labels are introduced to fill the gap.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The portfolio content MUST replace generic or blank realizacje presentation for confirmed entries with the actual selected photo of the relevant car.
- **FR-002**: Each completed realizacja entry MUST include the proper car name for the vehicle shown in its selected photo.
- **FR-003**: Each completed realizacja entry MUST include a description of the work performed on that specific car.
- **FR-004**: The selected photo, car name, and work description for a realizacja entry MUST refer to the same vehicle and the same job.
- **FR-005**: Portfolio image assets chosen for realizacje MUST use descriptive names that distinguish one car or realization from another.
- **FR-006**: Descriptive asset names MUST be consistent across the selected portfolio set so the owner can identify each image without opening it first.
- **FR-007**: When the exact model cannot be confirmed from the available material, the system content MUST use the highest-confidence confirmed vehicle description instead of a speculative label.
- **FR-008**: The realizacje section MUST preserve its existing category structure unless a card needs to be moved to a different category to reflect the actual service performed.

### Key Entities *(include if feature involves data)*

- **Portfolio Asset**: A photo used to represent a completed detailing job, identified by a descriptive name and associated with a specific vehicle.
- **Realizacja Entry**: A portfolio card that combines a selected photo, a vehicle name, a service description, and a portfolio category.
- **Service Description**: The customer-facing summary of what was done on the car, such as paint correction, ceramic coating, or interior detailing.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of realizacje entries included in this update display a real car photo instead of placeholder image copy.
- **SC-002**: 100% of updated realizacje entries include both a vehicle name and a service description.
- **SC-003**: A manual review of the updated portfolio finds 0 mismatches between the displayed photo, the named vehicle, and the described service.
- **SC-004**: A content reviewer can identify the intended car or realization from each renamed asset without opening the file in at least 90% of reviewed cases.

## Assumptions

- The current public image library contains enough confirmed vehicle photos to complete at least the selected realizacje entries covered by this feature.
- Vehicle naming will be based on what can be confidently identified from the existing images and current business knowledge, not on speculative model or trim guesses.
- The work performed on each car is already known by the business owner or can be derived from the existing planned portfolio descriptions.
- This feature covers the React-based realizacje experience and its supporting image assets; legacy static fallback pages are not the primary target for the content update.
