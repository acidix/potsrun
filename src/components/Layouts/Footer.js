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
                <i className="flaticon-copyright"></i> {currentYear} Plaon All
                Rights Reserved{" "}
                <a href="http://envytheme.com/" target="_blank">
                  EnvyTheme
                </a>
              </p>
            </div>

            <div className="col-lg-4 col-md-12">
              <ul className="social">
                <li>
                  <a href="https://www.facebook.com/" target="_blank">
                    <i className="flaticon-facebook-logo"></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.twitter.com/" target="_blank">
                    <i className="flaticon-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/" target="_blank">
                    <i className="flaticon-instagram"></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/" target="_blank">
                    <i className="flaticon-linkedin"></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/" target="_blank">
                    <i className="flaticon-youtube"></i>
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-lg-4 col-md-12">
              <ul className="info-link">
                <li>
                  <Link href="#">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="#">Terms & Conditions</Link>
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
