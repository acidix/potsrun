import React from "react";
import { render, screen } from "@testing-library/react";
import NextMatch from "./NextMatch";
import { sanityFetch } from "../../sanity/lib/client";
import {
  allClubEventLocationsQuery,
  nextClubEventQuery,
} from "../../sanity/lib/queries";

jest.mock("../../sanity/lib/client", () => {
  const chain = {
    width: () => chain,
    height: () => chain,
    url: () => "https://example.com/image.jpg",
  };
  return { sanityFetch: jest.fn(), urlFor: () => chain };
});

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={(props.alt as string) ?? ""} />;
  },
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    children,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a {...props}>{children}</a>
  ),
}));

const mockSanityFetch = sanityFetch as jest.Mock;

const LOCATIONS = [
  { place: "BioCompany" },
  { place: "Meilenweit" },
  { place: "Weberplatz" },
  { place: "Dampfmaschinenhaus" },
];

function mockData(events: unknown[] = [], locations = LOCATIONS) {
  mockSanityFetch.mockImplementation(({ query }: { query: string }) => {
    if (query === nextClubEventQuery) return Promise.resolve(events);
    if (query === allClubEventLocationsQuery) return Promise.resolve(locations);
    return Promise.resolve([]);
  });
}

describe("NextMatch", () => {
  beforeEach(() => {
    mockSanityFetch.mockReset();
  });

  it("shows the upcoming Sanity event when one is scheduled", async () => {
    const future = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString();
    mockData([{ place: "Testplatz", date: future, lat: 52.4, lng: 13.0 }]);

    render(<NextMatch />);

    expect(await screen.findByText(/Testplatz/)).toBeInTheDocument();
  });

  it("falls back to the rotation when there are no events", async () => {
    mockData([]);

    render(<NextMatch />);

    expect(
      await screen.findByText("Nächster Donnerstagslauf")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /BioCompany|Meilenweit|Weberplatz|Dampfmaschinenhaus/
      )
    ).toBeInTheDocument();
  });

  it("announces that no date is known when data is empty", async () => {
    mockData([], []);

    render(<NextMatch />);

    expect(
      await screen.findByText("Der nächste Termin wird bald bekannt gegeben.")
    ).toBeInTheDocument();
  });
});
