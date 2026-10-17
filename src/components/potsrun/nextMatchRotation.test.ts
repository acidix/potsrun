import {
  ROTATION_ORDER,
  findLocationByRotationIndex,
  getRotationIndex,
  normalizeLocationName,
} from "./nextMatchRotation";

describe("normalizeLocationName", () => {
  it("lowercases and strips whitespace and punctuation", () => {
    expect(normalizeLocationName("Bio Company!")).toBe("biocompany");
    expect(normalizeLocationName("  Weber Platz  ")).toBe("weberplatz");
  });

  it("returns an empty string for undefined", () => {
    expect(normalizeLocationName(undefined)).toBe("");
  });
});

describe("getRotationIndex", () => {
  it("maps the base week to index 0", () => {
    expect(getRotationIndex(12, 2025)).toBe(0);
  });

  it("advances one step per week and wraps after four weeks", () => {
    expect(getRotationIndex(13, 2025)).toBe(1);
    expect(getRotationIndex(14, 2025)).toBe(2);
    expect(getRotationIndex(15, 2025)).toBe(3);
    expect(getRotationIndex(16, 2025)).toBe(0);
  });

  it("handles weeks before the base week without going negative", () => {
    expect(getRotationIndex(11, 2025)).toBe(3);
    expect(getRotationIndex(8, 2025)).toBe(0);
  });

  it("accounts for year differences", () => {
    const thisYear = getRotationIndex(12, 2026);
    expect(thisYear).toBe(getRotationIndex(12 + 52, 2025));
    expect(thisYear).toBeGreaterThanOrEqual(0);
    expect(thisYear).toBeLessThan(ROTATION_ORDER.length);
  });
});

describe("findLocationByRotationIndex", () => {
  const locations = [
    { place: "BioCompany", lat: 52.4, lng: 13.0 },
    { place: "Meilenweit", lat: 52.39, lng: 13.06 },
    { place: "Weberplatz", lat: 52.4, lng: 13.05 },
    { place: "Dampfmaschinenhaus", lat: 52.41, lng: 13.06 },
  ];

  it("matches an exact location name", () => {
    expect(findLocationByRotationIndex(locations, 1)?.place).toBe("Meilenweit");
  });

  it("matches a normalized name", () => {
    const normalized = [{ place: "Weber Platz" }, { place: "Meilenweit" }];
    expect(findLocationByRotationIndex(normalized, 2)?.place).toBe(
      "Weber Platz"
    );
  });

  it("falls back to a partial match", () => {
    const partial = [{ place: "Weberplatz Treffpunkt" }];
    expect(findLocationByRotationIndex(partial, 2)?.place).toBe(
      "Weberplatz Treffpunkt"
    );
  });

  it("falls back to positional lookup then null", () => {
    const unknown = [{ place: "Alpha" }, { place: "Beta" }];
    expect(findLocationByRotationIndex(unknown, 0)?.place).toBe("Alpha");
    expect(findLocationByRotationIndex([], 0)).toBeNull();
  });
});
