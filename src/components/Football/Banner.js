"use client";

import React from "react";

const Banner = () => {
  return (
    <>
      <div id="home" className="main-banner">
        <video
          className="banner-video"
          autoPlay
          playsInline
          muted
          loop
        >
          <source src="/videos/hero.webm" type="video/webm" />
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>

        <div className="banner-overlay">
          <img
            src="/images/potsrun-hero-logo.png"
            alt="PotsRun hero overlay"
          />
        </div>

        <div className="d-table">
          <div className="d-table-cell">
            <div className="container-fluid">
              <div className="main-banner-content"></div>
            </div>
          </div>
        </div>

        <div className="banner-footer-content">
          <div className="container-fluid">
            <div className="row align-items-center"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
