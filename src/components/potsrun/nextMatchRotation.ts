// Rotation logic for the Thursday club run locations.
//
// The 4-week cycle is defined by ROTATION_ORDER. This module is intentionally
// free of React and network dependencies so it can be unit-tested in isolation.

// Explicit rotation order - this defines the 4-week cycle.
// Index 0 = week 12, 16, 20... (BioCompany)
// Index 1 = week 13, 17, 21... (Meilenweit)
// Index 2 = week 14, 18, 22... (Weberplatz)
// Index 3 = week 15, 19, 23... (Dampfmaschinenhaus)
export const ROTATION_ORDER = [
  "BioCompany",
  "Meilenweit",
  "Weberplatz",
  "Dampfmaschinenhaus",
];

// Base week that starts the rotation (CW12 should be index 0).
export const ROTATION_BASE_WEEK = 12;

// Earliest year used as the rotation anchor.
export const ROTATION_BASE_YEAR = 2025;

// Normalize a location name for comparison.
export function normalizeLocationName(name: string | undefined): string {
  if (!name) return "";
  return name
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9]/g, "");
}

// Get the rotation index (0-3) for a given ISO week number.
export function getRotationIndex(weekNumber: number, year?: number): number {
  const baseYear = ROTATION_BASE_YEAR;
  const baseWeek = ROTATION_BASE_WEEK;

  let weeksDiff = 0;
  if (year !== undefined && year !== baseYear) {
    const yearsDiff = year - baseYear;
    weeksDiff += yearsDiff * 52;
  }
  weeksDiff += weekNumber - baseWeek;

  const offset = ((weeksDiff % 4) + 4) % 4;
  return offset;
}

// Match a location name against the rotation order.
export function findLocationByRotationIndex<T extends { place?: string }>(
  locations: T[],
  rotationIndex: number
): T | null {
  const expectedName = ROTATION_ORDER[rotationIndex];
  const normalizedExpected = normalizeLocationName(expectedName);

  let match = locations.find((loc) => loc.place === expectedName);

  if (!match) {
    match = locations.find(
      (loc) => normalizeLocationName(loc.place) === normalizedExpected
    );
  }

  if (!match) {
    match = locations.find((loc) => {
      const normalizedLoc = normalizeLocationName(loc.place);
      return (
        normalizedLoc.includes(normalizedExpected) ||
        normalizedExpected.includes(normalizedLoc)
      );
    });
  }

  return match ?? locations[rotationIndex] ?? null;
}
