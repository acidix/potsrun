"use client";

import React from "react";
import Image from "next/image";
import moment from "moment-timezone";
import { sanityFetch, urlFor } from "../../sanity/lib/client";
import Link from "next/link";
import {
  allClubEventLocationsQuery,
  nextClubEventQuery,
} from "../../sanity/lib/queries";

const BERLIN_TIMEZONE = "Europe/Berlin";

// Explicit rotation order - this defines the 4-week cycle
// The order in this array determines the rotation sequence
// Index 0 = week 12, 16, 20... (BioCompany)
// Index 1 = week 13, 17, 21... (Meilenweit)
// Index 2 = week 14, 18, 22... (Weberplatz)
// Index 3 = week 15, 19, 23... (Dampfmaschinenhaus)
const ROTATION_ORDER = [
  "BioCompany",
  "Meilenweit",
  "Weberplatz",
  "Dampfmaschinenhaus",
];

// Base week that starts the rotation (CW12 should be index 0)
const ROTATION_BASE_WEEK = 12;

// Normalize location name for comparison
function normalizeLocationName(name: string | undefined): string {
  if (!name) return "";
  return name
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9]/g, "");
}

// Get rotation index (0-3) for a given ISO week number
function getRotationIndex(weekNumber: number, year?: number): number {
  const baseYear = 2025;
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

// Match location name against rotation order
function findLocationByRotationIndex(locations: any[], rotationIndex: number): any {
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

// Get next Thursday at 19:00 Berlin time
function getNextThursdayBerlin(): moment.Moment {
  const now = moment().tz(BERLIN_TIMEZONE);
  const nextThursday = now.clone().day(4).hour(19).minute(0).second(0);

  if (nextThursday.isBefore(now)) {
    nextThursday.add(7, "days");
  }

  return nextThursday;
}

export default function NextMatch() {
  const [nextEvent, setNextEvent] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchNextEvent() {
      try {
        // First, try to get an upcoming event from Sanity
        const upcomingEvent = await sanityFetch({
          query: nextClubEventQuery,
        });

        if (upcomingEvent) {
          setNextEvent(upcomingEvent);
          setLoading(false);
          return;
        }

        // No upcoming event in Sanity, use fallback rotation
        const locations = await sanityFetch({
          query: allClubEventLocationsQuery,
        });

        if (locations.length === 0) {
          setNextEvent(null);
          setLoading(false);
          return;
        }

        const nextThursday = getNextThursdayBerlin();
        const weekNumber = nextThursday.isoWeek();
        const year = nextThursday.year();
        const rotationIndex = getRotationIndex(weekNumber, year);
        const fallback = findLocationByRotationIndex(locations, rotationIndex);

        if (!fallback) {
          setNextEvent(null);
          setLoading(false);
          return;
        }

        setNextEvent({
          date: nextThursday.toISOString(),
          ...fallback,
        });
      } catch (error) {
        console.error("Error fetching next event:", error);
        setNextEvent(null);
      } finally {
        setLoading(false);
      }
    }

    fetchNextEvent();
  }, []);

  const [days, setDays] = React.useState("");
  const [hours, setHours] = React.useState("");
  const [minutes, setMinutes] = React.useState("");
  const [seconds, setSeconds] = React.useState("");

  const commingSoonTime = React.useCallback(() => {
    if (!nextEvent?.date) {
      setDays("0");
      setHours("00");
      setMinutes("00");
      setSeconds("00");
      return;
    }

    const endTime = moment(nextEvent.date);
    const now = moment();
    const timeLeft = endTime.diff(now, "seconds");

    if (timeLeft <= 0) {
      setDays("0");
      setHours("00");
      setMinutes("00");
      setSeconds("00");
      return;
    }

    const calculatedDays = Math.floor(timeLeft / 86400);
    const calculatedHours = Math.floor((timeLeft % 86400) / 3600);
    const calculatedMinutes = Math.floor((timeLeft % 3600) / 60);
    const calculatedSeconds = timeLeft % 60;

    setDays(String(calculatedDays));
    setHours(calculatedHours.toString().padStart(2, "0"));
    setMinutes(calculatedMinutes.toString().padStart(2, "0"));
    setSeconds(calculatedSeconds.toString().padStart(2, "0"));
  }, [nextEvent]);

  React.useEffect(() => {
    commingSoonTime();
    const interval = setInterval(() => {
      commingSoonTime();
    }, 1000);

    return () => clearInterval(interval);
  }, [commingSoonTime]);

  if (loading) {
    return (
      <section className="next-match-area">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="next-match-content">
                <div className="content">
                  <h2>Lade nächsten Lauf...</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (nextEvent === null || nextEvent === undefined) {
    return (
      <section className="next-match-area">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="next-match-content">
                <div className="content">
                  <h2>Der nächste Termin wird bald bekannt gegeben.</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="next-match-area">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6 col-md-12">
              <div className="next-match-content">
                <div className="content">
                  <div className="row align-items-center">
                    <div className="col-lg-5 col-md-5">
                      <h2>Nächster Donnerstagslauf</h2>
                      <span className="sub-title">
                        {nextEvent !== null && "place" in nextEvent
                          ? nextEvent.place
                          : "Noch nicht klar"}{" "}
                        -{" "}
                        {nextEvent !== null && "date" in nextEvent
                          ? moment(nextEvent.date).format("DD.MM.YYYY")
                          : "Noch nicht klar"}
                      </span>
                    </div>

                    <div className="col-lg-7 col-md-7">
                      <div
                        id="timer"
                        className="flex-wrap d-flex justify-content-center"
                      >
                        <div
                          id="days"
                          className="align-items-center flex-column d-flex justify-content-center"
                        >
                          {days} <span>{days == "1" ? "Tag" : "Tage"}</span>
                        </div>
                        <div
                          id="hours"
                          className="align-items-center flex-column d-flex justify-content-center"
                        >
                          {hours}{" "}
                          <span>{hours == "1" ? "Stunde" : "Stunden"}</span>
                        </div>
                        <div
                          id="minutes"
                          className="align-items-center flex-column d-flex justify-content-center"
                        >
                          {minutes}{" "}
                          <span>{minutes == "1" ? "Minute" : "Minuten"}</span>
                        </div>
                        <div
                          id="seconds"
                          className="align-items-center flex-column d-flex justify-content-center"
                        >
                          {seconds}{" "}
                          <span>
                            {seconds == "1" ? "Sekunde" : "Sekunden"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <Link
                      className="read-more-btn next-match-link"
                      href={`https://www.google.com/maps/place/${nextEvent?.lat || 0},${nextEvent?.lng || 0}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i
                        className="bx bx-map"
                        style={{ marginRight: "5px" }}
                      ></i>{" "}
                      Zum Treffpunkt
                    </Link>
                    <span
                      className="sub-title"
                      style={{ marginTop: "10px", display: "block" }}
                    >
                      Die Teilnahme ist kostenfrei.
                    </span>
                  </div>
                </div>

                <div className="shape1">
                  <Image
                    src="/images/potsrun/footb-playing.png"
                    alt="image"
                    width={854}
                    height={319}
                  />
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-md-12">
              <div
                className="next-match-image"
                style={{
                  backgroundImage:
                    (nextEvent?.image &&
                      `url(${urlFor(nextEvent.image).width(945).height(350).url()})`) ||
                    "url()",
                }}
              >
                <Image
                  src={
                    (nextEvent?.image &&
                      urlFor(nextEvent.image).width(945).height(350).url()) ||
                    ""
                  }
                  alt="image"
                  width={945}
                  height={350}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
