"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const Products = () => {
  return (
    <>
      <section id="shop" className="products-area pt-100 pb-70">
        <div className="container">
          <div className="section-title">
            <h2>Die Laufgruppe in Potsdam</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
              ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas
              accumsan lacus vel facilisis.
            </p>
          </div>

          <div className="row">
            <div className="col-lg-3 col-sm-6">
              <div className="single-products-box">
                <Image
                  src="/images/football/products/footb-product1.jpg"
                  alt="image"
                  width={750}
                  height={1000}
                />

                <div className="content">
                  <h3>Für wen?</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor.
                  </p>
                </div>

              </div>
            </div>

            <div className="col-lg-3 col-sm-6">
              <div className="single-products-box">
                <Image
                  src="/images/football/products/footb-product2.jpg"
                  alt="image"
                  width={750}
                  height={1000}
                />

                <div className="content">
                  <h3>Ziele</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-sm-6">
              <div className="single-products-box">
                <Image
                  src="/images/football/products/footb-product3.jpg"
                  alt="image"
                  width={750}
                  height={1000}
                />

                <div className="content">
                  <h3>Wann und Wo?</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-sm-6">
              <div className="single-products-box">
                <Image
                  src="/images/football/products/footb-product4.jpg"
                  alt="image"
                  width={750}
                  height={1000}
                />

                <div className="content">
                  <h3>Kontakt</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor.
                  </p>

                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Products;
