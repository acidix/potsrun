"use client"

import React from "react";
import Image from "next/image";
import moment from "moment";
import { urlFor } from "../../sanity/lib/client";

export default function NextMatch(Props) {
  const [nextEvent = null] = React.useState(Props.nextEvent);
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
    let endTime = new Date(nextEvent.date);
    let endTimeParse = Date.parse(endTime.toString()) / 1000;
    let now = new Date();
    let nowParse = Date.parse(now.toString()) / 1000;
    let timeLeft = endTimeParse - nowParse;
    let days = Math.floor(timeLeft / 86400);
    let hours = Number(Math.floor((timeLeft - days * 86400) / 3600));
    let minutes =  Number(Math.floor((timeLeft - days * 86400 - hours * 3600) / 60));
    let seconds = Number(Math.floor(
      timeLeft - days * 86400 - hours * 3600 - minutes * 60
    ));
    let hourstring, minutestring, secondstring = "";
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

  if (nextEvent !== null || nextEvent !== undefined) {
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
                        {(nextEvent !== null && 'place' in nextEvent) ? nextEvent.place : "Noch nicht klar"} - {(nextEvent !== null && 'date' in nextEvent) ? (moment(new Date(nextEvent.date))).format('DD.MM.YYYY') : "Noch nicht klar"}
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
                          {days} <span>{(days == "1") ? "Tag" : "Tage"}</span>
                        </div>
                        <div
                          id="hours"
                          className="align-items-center flex-column d-flex justify-content-center"
                        >
                          {hours} <span>{(hours == "1") ? "Stunde" : "Stunden"}</span>
                        </div>
                        <div
                          id="minutes"
                          className="align-items-center flex-column d-flex justify-content-center"
                        >
                          {minutes} <span>{(minutes == "1") ? "Minute" : "Minuten"}</span>
                        </div>
                        <div
                          id="seconds"
                          className="align-items-center flex-column d-flex justify-content-center"
                        >
                          {seconds} <span>{(seconds == "1") ? "Sekunde" : "Sekunden"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="shape1">
                  <Image
                    src="/images/football/footb-playing.png"
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
                style={{ backgroundImage: `url(${urlFor(nextEvent.image).width(945).height(350).url()})`}}
              >
                <Image
                  src={urlFor(nextEvent.image).width(945).height(350).url()}
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
};
