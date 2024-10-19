"use client";

import React from "react";
import moment from "moment";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import Image from "next/image";

const UpcomingMatches = (props) => {
  let eventsList = [];

  if ('events' in props && props.events.length > 0) {
    props.events.forEach(function (event, i) {
      eventsList.push(
        <SwiperSlide key={i}>
          <div className="single-upcoming-matches-item">
            <div className="date">
              <span>{(moment(new Date(event.date))).format('DD.MM.YYYY')}</span>
            </div>
            <h3>{event.title}</h3>
            <span className="sub-title">{event.distance} km</span>
          </div>
        </SwiperSlide>
      )
    });
  }

  return (
    <>
      <section id="matches" className="upcoming-matches-area pt-100 pb-70">
        <div className="container">
          <div className="section-title">
            <h2>Kommende Wettkämpfe</h2>
            <p>
              Wir starten bei vielen regionalen und überregionalen Events als Potsrun Team. Hier findest du eine Übersicht über die nächsten Wettkämpfe.
            </p>
          </div>

          <Swiper
            spaceBetween={30}
            navigation={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: true,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
            }}
            modules={[Autoplay, Navigation]}
            className="upcoming-matches-slides"
          >

            {eventsList}

          </Swiper>
        </div>

        <div className="upcoming-matches-shape1">
          <Image
            src="/images/football/footb-player1.png"
            alt="image"
            width={735}
            height={663}
          />
        </div>
      </section>
    </>
  );
};

export default UpcomingMatches;
