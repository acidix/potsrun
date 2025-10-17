"use client";

import React from "react";
import Image from "next/image";
import moment from "moment";
import { urlFor } from "../../sanity/lib/client";
import Link from "next/link";

export default function NextMatch(Props) {
  let [nextEvent, setNextEvent] = React.useState(Props.nextEvent);
  const [days, setDays] = React.useState("");
  const [hours, setHours] = React.useState("");
  const [minutes, setMinutes] = React.useState("");
  const [seconds, setSeconds] = React.useState("");

  React.useEffect(() => {
    const interval = setInterval(() => {
      commingSoonTime();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const commingSoonTime = () => {
    let endTime = new Date(nextEvent?.date || undefined);
    let endTimeParse = Date.parse(endTime.toString()) / 1000;
    let now = new Date();
    let nowParse = Date.parse(now.toString()) / 1000;
    let timeLeft = endTimeParse - nowParse;
    let days = Math.floor(timeLeft / 86400);
    let hours = Number(Math.floor((timeLeft - days * 86400) / 3600));
    let minutes = Number(
      Math.floor((timeLeft - days * 86400 - hours * 3600) / 60),
    );
    let seconds = Number(
      Math.floor(timeLeft - days * 86400 - hours * 3600 - minutes * 60),
    );
    let hourstring,
      minutestring,
      secondstring = "";
    if (hours < 10) {
      hourstring = "0" + hours;
    } else {
      hourstring = String(hours);
    }
    if (minutes < 10) {
      minutestring = "0" + minutes;
    } else {
      minutestring = String(minutes);
    }
    if (seconds < 10) {
      secondstring = "0" + seconds;
    } else {
      secondstring = String(seconds);
    }
    setDays(String(days));
    setHours(hourstring);
    setMinutes(minutestring);
    setSeconds(secondstring);
  };

  if (nextEvent == null) {
    const today = new Date();
    const nextThursday = new Date(today);
    nextThursday.setDate(today.getDate() + ((4 - today.getDay() + 7) % 7));
    nextThursday.setHours(19, 0, 0, 0);

    // get the week number in the year of nextThursday
    const weekNumber = moment(nextThursday).isoWeek();
    let location = "";
    if (weekNumber % 4 === 0) {
      nextEvent = {
        date: nextThursday.toISOString(),
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
      };
    } else if (weekNumber % 4 === 1) {
      nextEvent = {
        date: nextThursday.toISOString(),
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
      };
    } else if (weekNumber % 4 === 2) {
      nextEvent = {
        date: nextThursday.toISOString(),
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
      };
    } else if (weekNumber % 4 === 3) {
      nextEvent = {
        date: nextThursday.toISOString(),
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
      };
    }
  }
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
