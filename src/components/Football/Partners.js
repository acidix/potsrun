"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
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

            <div className="col-lg-6 col-sm-8 col-md-8 col-12">
              <div className="single-partners-box" >
                <Link href="https://www.meilenweit-potsdam.de/" target="_blank">
                <Image
                  src="/images/potsrun/partner/meilenweit.png"
                  alt="image"
                  width={380}
                  height={60}
                  style={{
                    margin: '0 auto'
                }}
                />
                </Link>
              </div>
            </div>

            <div className="col-lg-3 col-sm-4 col-md-4 col-6">
              <div className="single-partners-box">
                <Link href="https://www.heat24.org/" target="_blank">
                <Image
                  src="/images/potsrun/partner/heat24.png"
                  alt="image"
                  width={185}
                  height={60}
                />
                </Link>
              </div>
            </div>

            <div className="col-lg-3 col-sm-4 col-md-4 col-6">
              <div className="single-partners-box">
                <Link href="https://www.orthomol.de/" target="_blank">
                <Image
                  src="/images/potsrun/partner/orthomol.png"
                  alt="image"
                  width={185}
                  height={60}
                />
                </Link>
              </div>
            </div>

            <div className="col-lg-3 col-sm-4 col-md-4 col-6">
              <div className="single-partners-box">
                <Link href="https://www.rbblauf.de/" target="_blank">
                <Image
                  src="/images/potsrun/partner/rbblauf.png"
                  alt="image"
                  width={185}
                  height={60}
                />
                </Link>
              </div>
            </div>

            <div className="col-lg-3 col-sm-4 col-md-4 col-6">
              <div className="single-partners-box">
                <Link href="https://www.stadtsportbund-potsdam.de/" target="_blank">
                <Image
                  src="/images/potsrun/partner/ssb.png"
                  alt="image"
                  width={185}
                  height={60}
                />
                </Link>
              </div>
            </div>

            <div className="col-lg-3 col-sm-4 col-md-4 col-6">
              <div className="single-partners-box">
                <Link href="https://www.potsdam-schloesserlauf.de/" target="_blank">
                <Image
                  src="/images/potsrun/partner/schloesserlauf.png"
                  alt="image"
                  width={185}
                  height={60}
                  />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Partners;
