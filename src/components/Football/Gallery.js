"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import Image from "next/image";

const Gallery = () => {
  return (
    <>
      <section id="gallery" className="gallery-area pt-100 pb-70">
        <div className="container">
          <div className="section-title">
            <h2>Photo Gallery</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
              ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas
              accumsan lacus vel facilisis.
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
            className="gallery-slides"
          >
            <SwiperSlide>
              <div className="single-gallery-item">
                <Image
                  src="/images/football/gallery/footb-gallery1.jpg"
                  alt="image"
                  width={750}
                  height={1000}
                />
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="single-gallery-item">
                <Image
                  src="/images/football/gallery/footb-gallery2.jpg"
                  alt="image"
                  width={750}
                  height={1000}
                />
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="single-gallery-item">
                <Image
                  src="/images/football/gallery/footb-gallery3.jpg"
                  alt="image"
                  width={750}
                  height={1000}
                />
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="single-gallery-item">
                <Image
                  src="/images/football/gallery/footb-gallery4.jpg"
                  alt="image"
                  width={750}
                  height={1000}
                />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>

        <div className="gallery-shape1">
          <Image
            src="/images/football/footb-player2.png"
            alt="image"
            width={600}
            height={623}
          />
        </div>
      </section>
    </>
  );
};

export default Gallery;
