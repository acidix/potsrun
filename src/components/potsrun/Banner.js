"use client";

import React from "react";
import Image from "next/image";

const Banner = () => {
  return (
    <>
      <div id="home" className="main-banner">
        <video className="banner-video" autoPlay playsInline muted loop>
          <source src="/videos/hero.webm" type="video/webm" />
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>

        <div className="banner-overlay">
          <Image
            src="/images/potsrun-hero-logo.png"
            alt="PotsRun hero overlay"
            width={1200}
            height={344}
            priority
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
