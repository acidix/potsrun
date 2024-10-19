"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const Subscribe = () => {
  return (
    <>
      <section className="subscribe-area">
        <div className="container">
          <div className="subscribe-inner-area">
            <div className="section-title">
              <h2>Stay Tuned</h2>
              <p>
                Subscribe my newsletter and don’t miss any update on new
                products, promotions or even career events.
              </p>
            </div>

            <form className="newsletter-form">
              <input
                type="email"
                className="input-newsletter"
                placeholder="Enter your email address"
                name="email"
                required
              />
              <button type="submit">Subscribe To Newsletter</button>

              <div className="check-info">
                <input className="inp-cbx" id="cbx" type="checkbox" />
                <label className="cbx" htmlFor="cbx">
                  <span>
                    <svg width="12px" height="9px" viewBox="0 0 12 9">
                      <polyline points="1 5 4 8 11 1"></polyline>
                    </svg>
                  </span>
                  <span>
                    I read and accept the <Link href="#">privacy policy.</Link>
                  </span>
                </label>
              </div>
            </form>

            <div className="subscribe-shape1">
              <Image
                src="/images/football/football1.png"
                alt="image"
                width={253}
                height={206}
              />
            </div>
            <div className="subscribe-shape2">
              <Image
                src="/images/football/football2.png"
                alt="image"
                width={386}
                height={314}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Subscribe;
