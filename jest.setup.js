require("@testing-library/jest-dom");

// Provide required Sanity env values so modules that validate them can be
// imported in tests. These are public (NEXT_PUBLIC_*) identifiers.
process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||= "test-project";
process.env.NEXT_PUBLIC_SANITY_DATASET ||= "test-dataset";
