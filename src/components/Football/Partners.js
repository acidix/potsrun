"use client";

import React from "react";
import Image from "next/image";

const Partners = () => {
  return (
    <>
      <section id="partners" className="partners-area bg-161616 pt-100 pb-70">
        <div className="container">
          <div className="section-title">
            <h2>Unsere Partner</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
              ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas
              accumsan lacus vel facilisis.
            </p>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-3 col-sm-4 col-md-4 col-6">
              <div className="single-partners-box">
                <Image
                  src="/images/football/partner/footb-partner1.png"
                  alt="image"
                  width={185}
                  height={60}
                />
              </div>
            </div>

            <div className="col-lg-3 col-sm-4 col-md-4 col-6">
              <div className="single-partners-box">
                <Image
                  src="/images/football/partner/footb-partner2.png"
                  alt="image"
                  width={185}
                  height={60}
                />
              </div>
            </div>

            <div className="col-lg-3 col-sm-4 col-md-4 col-6">
              <div className="single-partners-box">
                <Image
                  src="/images/football/partner/footb-partner3.png"
                  alt="image"
                  width={185}
                  height={60}
                />
              </div>
            </div>

            <div className="col-lg-3 col-sm-4 col-md-4 col-6">
              <div className="single-partners-box">
                <Image
                  src="/images/football/partner/footb-partner4.png"
                  alt="image"
                  width={185}
                  height={60}
                />
              </div>
            </div>

            <div className="col-lg-3 col-sm-4 col-md-4 col-6">
              <div className="single-partners-box">
                <Image
                  src="/images/football/partner/footb-partner5.png"
                  alt="image"
                  width={185}
                  height={60}
                />
              </div>
            </div>

            <div className="col-lg-3 col-sm-4 col-md-4 col-6">
              <div className="single-partners-box">
                <Image
                  src="/images/football/partner/footb-partner6.png"
                  alt="image"
                  width={185}
                  height={60}
                />
              </div>
            </div>

            <div className="col-lg-3 col-sm-4 col-md-4 col-6">
              <div className="single-partners-box">
                <Image
                  src="/images/football/partner/footb-partner7.png"
                  alt="image"
                  width={185}
                  height={60}
                />
              </div>
            </div>

            <div className="col-lg-3 col-sm-4 col-md-4 col-6">
              <div className="single-partners-box">
                <Image
                  src="/images/football/partner/footb-partner8.png"
                  alt="image"
                  width={185}
                  height={60}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Partners;
