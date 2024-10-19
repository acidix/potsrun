"use client";

import React, { useState } from "react";
import FsLightbox from "fslightbox-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

const MatcheHighlights = () => {
  const [toggler, setToggler] = useState(false);

  return (
    <>
      <FsLightbox
        toggler={toggler}
        sources={[
          "https://www.youtube.com/embed/MmhxO0MFhVM?si=tDpSu94c_XdAwEZe",
        ]}
      />

      <div id="highlights">
        <Swiper
          navigation={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: true,
            pauseOnMouseEnter: true,
          }}
          modules={[Autoplay, Navigation]}
          className="matches-highlights-slides"
        >
          <SwiperSlide>
            <div 
              className="single-matches-highlights-item"
              style={{
                backgroundImage: `url(/images/football/matches-highlights/highlight1.jpg)`,
              }}
            >
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-lg-6 col-md-6">
                    <div className="content">
                      <h3>Matches Highlights</h3>
                      <span>Champions League - 20 April, 2020</span>
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6">
                    <div className="highlights-video">
                      <div
                        className="video-btn"
                        onClick={() => setToggler(!toggler)}
                      >
                        <span>Play Video</span>
                        <i className="flaticon-play-button"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div 
              className="single-matches-highlights-item"
              style={{
                backgroundImage: `url(/images/football/matches-highlights/highlight2.jpg)`,
              }}
            >
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-lg-6 col-md-6">
                    <div className="content">
                      <h3>Matches Highlights</h3>
                      <span>Premier League - 19 April, 2020</span>
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6">
                    <div className="highlights-video">
                      <div
                        className="video-btn"
                        onClick={() => setToggler(!toggler)}
                      >
                        <span>Play Video</span>
                        <i className="flaticon-play-button"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div 
              className="single-matches-highlights-item"
              style={{
                backgroundImage: `url(/images/football/matches-highlights/highlight3.jpg)`,
              }}
            >
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-lg-6 col-md-6">
                    <div className="content">
                      <h3>Matches Highlights</h3>
                      <span>Champions League - 18 April, 2020</span>
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6">
                    <div className="highlights-video">
                      <div
                        className="video-btn"
                        onClick={() => setToggler(!toggler)}
                      >
                        <span>Play Video</span>
                        <i className="flaticon-play-button"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div 
              className="single-matches-highlights-item"
              style={{
                backgroundImage: `url(/images/football/matches-highlights/highlight4.jpg)`,
              }}
            >
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-lg-6 col-md-6">
                    <div className="content">
                      <h3>Matches Highlights</h3>
                      <span>Premier League - 17 April, 2020</span>
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6">
                    <div className="highlights-video">
                      <div
                        className="video-btn"
                        onClick={() => setToggler(!toggler)}
                      >
                        <span>Play Video</span>
                        <i className="flaticon-play-button"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};

export default MatcheHighlights;
