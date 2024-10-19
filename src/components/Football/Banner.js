"use client";

import React from "react";
import Image from 'next/image'

const Banner = () => {
  return (
    <>
      <div
        id="home"
        className="main-banner"
        style={{
          backgroundImage: `url(/images/potsrun_team1.jpg)`,
        }}
      >
        <div className="d-table">
          <div className="d-table-cell">
            <div className="container-fluid">
              <Image
                className="banner-image"
                src="/images/potsrun.png"
                alt="image"
                data-aos="fade-up"
                data-aos-duration="1000"
                width={1200}
                height={1200}
              />
              <div className="main-banner-content">
                <span
                  className="sub-title"
                  data-aos="fade-left"
                  data-aos-duration="1000"
                  data-aos-delay="100"
                >
                  Let&apos;s run
                </span>
                <h1
                  data-aos="fade-left"
                  data-aos-duration="1000"
                  data-aos-delay="200"
                >
                  together
                </h1>
              </div>
            </div>
          </div>
        </div>

        <div className="banner-footer-content">
          <div className="container-fluid">
            <div className="row align-items-center">

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
