"use client";

import React from "react";
import Link from "next/link";

const Footer = () => {
  let currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="footer-area">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-4 col-md-12">
              <p>
                <i className="flaticon-copyright"></i> {currentYear} PotsRun{" "}
              </p>
            </div>

            <div className="col-lg-4 col-md-12">
              <ul className="social">
                <li>
                  <a
                    href="https://www.instagram.com/potsrun/?hl=en"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="flaticon-instagram"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.strava.com/clubs/316836"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={22}
                        height={22}
                        viewBox="0 0 384 512"
                        style={{ margin: "0 auto" }}
                      >
                        <path
                          style={{ filter: "invert(1)" }}
                          d="M158.4 0L7 292h89.2l62.2-116.1L220.1 292h88.5zm150.2 292l-43.9 88.2-44.6-88.2h-67.6l112.2 220 111.5-220z"
                        />
                      </svg>
                    </i>
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-lg-4 col-md-12">
              <ul className="info-link">
                <li>
                  <Link href="/privacy">Datenschutz</Link>
                </li>
                <li>
                  <Link href="imprint">Impressum</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
