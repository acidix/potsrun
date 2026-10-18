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
import {
  findLocationByRotationIndex,
  getRotationIndex,
} from "./nextMatchRotation";

const BERLIN_TIMEZONE = "Europe/Berlin";

// Get next Thursday at 19:00 Berlin time
function getNextThursdayBerlin(): moment.Moment {
  const now = moment().tz(BERLIN_TIMEZONE);
  const nextThursday = now.clone().day(4).hour(19).minute(0).second(0);

  if (nextThursday.isBefore(now)) {
    nextThursday.add(7, "days");
  }

  return nextThursday;
}

// Format the remaining time until `targetDate` as padded countdown parts.
function getCountdown(targetDate: string | undefined, nowMs: number) {
  const timeLeft = targetDate
    ? moment(targetDate).diff(moment(nowMs), "seconds")
    : 0;

  if (!targetDate || timeLeft <= 0) {
    return { days: "0", hours: "00", minutes: "00", seconds: "00" };
  }

  return {
    days: String(Math.floor(timeLeft / 86400)),
    hours: Math.floor((timeLeft % 86400) / 3600)
      .toString()
      .padStart(2, "0"),
    minutes: Math.floor((timeLeft % 3600) / 60)
      .toString()
      .padStart(2, "0"),
    seconds: (timeLeft % 60).toString().padStart(2, "0"),
  };
}

export default function NextMatch() {
  const [nextEvent, setNextEvent] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchNextEvent() {
      try {
        // Fetch up to 2 upcoming events so we can inspect the first and handle skip
        const upcomingEvents: any[] = await sanityFetch({
          query: nextClubEventQuery,
        });

        // Compute fallback Thursday regardless — needed for same-day comparison
        const locations = await sanityFetch({
          query: allClubEventLocationsQuery,
        });

        const nextThursday = getNextThursdayBerlin();
        const weekNumber = nextThursday.isoWeek();
        const year = nextThursday.year();

        const getFallbackForThursday = (thursday: moment.Moment) => {
          if (locations.length === 0) return null;
          const wn = thursday.isoWeek();
          const yr = thursday.year();
          const rotationIndex = getRotationIndex(wn, yr);
          return findLocationByRotationIndex(locations, rotationIndex);
        };

        if (upcomingEvents && upcomingEvents.length > 0) {
          const firstEvent = upcomingEvents[0];

          // If the event is marked as skipped, advance one week
          if (firstEvent.skipEvent === true) {
            const nextWeekThursday = nextThursday.clone().add(7, "days");
            const fallback = getFallbackForThursday(nextWeekThursday);
            if (!fallback) {
              setNextEvent(null);
              setLoading(false);
              return;
            }
            setNextEvent({
              date: nextWeekThursday.toISOString(),
              ...fallback,
            });
            setLoading(false);
            return;
          }

          // Check if the Sanity event is before the scheduled Thursday
          // (e.g. someone entered a Monday event — don't skip the Thursday)
          const sanityDate = moment(firstEvent.date).tz(BERLIN_TIMEZONE);
          const isBeforeScheduledThursday = sanityDate.isBefore(nextThursday, "day");

          if (isBeforeScheduledThursday) {
            // Ignore the Sanity event and fall through to the rotation fallback below
          } else {
            // Same day as Thursday or a future different date — use Sanity event as-is
            setNextEvent(firstEvent);
            setLoading(false);
            return;
          }
        }

        // No upcoming Sanity events — use fallback rotation
        if (locations.length === 0) {
          setNextEvent(null);
          setLoading(false);
          return;
        }

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

  const [now, setNow] = React.useState(() => Date.now());

  React.useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const { days, hours, minutes, seconds } = getCountdown(
    nextEvent?.date,
    now,
  );

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
