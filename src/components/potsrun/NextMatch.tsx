"use client";

import React from "react";
import Image from "next/image";
import moment from "moment";
import { urlFor } from "../../sanity/lib/client";
import Link from "next/link";

export default function NextMatch(Props) {
  const nextEvent = React.useMemo(() => {
    if (Props.nextEvent) {
      return Props.nextEvent;
    }

    const today = new Date();
    const nextThursday = new Date(today);
    nextThursday.setDate(today.getDate() + ((4 - today.getDay() + 7) % 7));
    nextThursday.setHours(19, 0, 0, 0);

    const weekNumber = moment(nextThursday).isoWeek();
    const fallbackLocations = [
      {
        place: "Bio Company (Humboldtbrücke)",
        image: {
          _type: "image",
          asset: {
            _ref: "image-2144f1c2769b33240c5f29f0c3677b3b36511665-1500x1000-jpg",
            _type: "reference",
          },
        },
        lng: 13.070731,
        lat: 52.40277,
      },
      {
        place: "Babelsberg (Weberplatz)",
        image: {
          _type: "image",
          asset: {
            _ref: "image-78707eefa56d252d2a45d85a904ca61742948b21-1024x734-webp",
            _type: "reference",
          },
        },
        lng: 13.095297,
        lat: 52.394214,
      },
      {
        place: "Meilenweit (Laufladen)",
        image: {
          _type: "image",
          asset: {
            _ref: "image-afd217caeb6196afa88b5e46dce383eb70ad5137-300x168-jpg",
            _type: "reference",
          },
        },
        lng: 13.052276,
        lat: 52.401491,
      },
      {
        place: "Dampfmaschinenhaus",
        image: {
          _type: "image",
          asset: {
            _ref: "image-0cd4c8556e92531fec03c5426e6628aaf31314a1-768x442-jpg",
            _type: "reference",
          },
        },
        lng: 13.123456,
        lat: 52.423456,
      },
    ];

    const fallback =
      fallbackLocations[weekNumber % fallbackLocations.length] ?? null;

    if (!fallback) {
      return null;
    }

    return {
      date: nextThursday.toISOString(),
      ...fallback,
    };
  }, [Props.nextEvent]);

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

    const endTime = new Date(nextEvent.date);
    const endTimeParse = Date.parse(endTime.toString()) / 1000;
    const now = new Date();
    const nowParse = Date.parse(now.toString()) / 1000;
    const timeLeft = endTimeParse - nowParse;

    const calculatedDays = Math.max(0, Math.floor(timeLeft / 86400));
    const calculatedHours = Math.max(
      0,
      Math.floor((timeLeft - calculatedDays * 86400) / 3600),
    );
    const calculatedMinutes = Math.max(
      0,
      Math.floor(
        (timeLeft - calculatedDays * 86400 - calculatedHours * 3600) / 60,
      ),
    );
    const calculatedSeconds = Math.max(
      0,
      Math.floor(
        timeLeft -
          calculatedDays * 86400 -
          calculatedHours * 3600 -
          calculatedMinutes * 60,
      ),
    );

    const hourstring = calculatedHours.toString().padStart(2, "0");
    const minutestring = calculatedMinutes.toString().padStart(2, "0");
    const secondstring = calculatedSeconds.toString().padStart(2, "0");

    setDays(String(calculatedDays));
    setHours(hourstring);
    setMinutes(minutestring);
    setSeconds(secondstring);
  }, [nextEvent]);

  React.useEffect(() => {
    commingSoonTime();
    const interval = setInterval(() => {
      commingSoonTime();
    }, 1000);

    return () => clearInterval(interval);
  }, [commingSoonTime]);

  if (nextEvent !== null && nextEvent !== undefined) {
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
                            ? moment(new Date(nextEvent.date)).format(
                                "DD.MM.YYYY",
                              )
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
                        className="read-more-btn"
                        href={`https://www.google.com/maps/place/${nextEvent?.lat || 0},${nextEvent?.lng || 0}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Zum Treffpunkt
                      </Link>
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

  return null;
}
