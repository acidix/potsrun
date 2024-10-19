"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import AnchorLink from "react-anchor-link-smooth-scroll";
import Image from "next/image";

const Navbar = () => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    let elementId = document.getElementById("navbar");
    const handleScroll = () => {
      if (window.scrollY > 170) {
        elementId.classList.add("is-sticky");
      } else {
        elementId.classList.remove("is-sticky");
      }
    };

    document.addEventListener("scroll", handleScroll);
    window.scrollTo(0, 0);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleMenuActiveClass = () => {
      let mainNavLinks = document.querySelectorAll(".navbar-nav li a");
      let fromTop = window.scrollY;
      mainNavLinks.forEach((link) => {
        if (link.hash) {
          let section = document.querySelector(link.hash);

          if (
            section.offsetTop <= fromTop &&
            section.offsetTop + section.offsetHeight > fromTop
          ) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        }
      });
    };

    window.addEventListener("scroll", handleMenuActiveClass);

    return () => {
      window.removeEventListener("scroll", handleMenuActiveClass);
    };
  }, []);

  const classOne = collapsed
    ? "collapse navbar-collapse"
    : "navbar-collapse collapse show";
  const classTwo = collapsed
    ? "navbar-toggler navbar-toggler-right collapsed"
    : "navbar-toggler navbar-toggler-right";

  return (
    <>
      <nav
        id="navbar"
        className="navbar navbar-expand-lg navbar-light bg-light"
      >
        <div className="container-fluid">

          <button
            onClick={toggleNavbar}
            className={classTwo}
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={classOne} id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <AnchorLink
                  onClick={toggleNavbar}
                  offset={() => 100}
                  className="nav-link active"
                  href="#home"
                >
                  Home
                </AnchorLink>
              </li>

              <li className="nav-item">
                <AnchorLink
                  onClick={toggleNavbar}
                  offset={() => -1}
                  className="nav-link"
                  href="#matches"
                >
                  Wettkämpfe
                </AnchorLink>
              </li>

              <li className="nav-item">
                <AnchorLink
                  onClick={toggleNavbar}
                  offset={() => -1}
                  className="nav-link"
                  href="#shop"
                >
                  Über uns
                </AnchorLink>
              </li>

              <li className="nav-item">
                <AnchorLink
                  onClick={toggleNavbar}
                  offset={() => -1}
                  className="nav-link"
                  href="#partners"
                >
                  Partner
                </AnchorLink>
              </li>

              <li className="nav-item">
                <AnchorLink
                  onClick={toggleNavbar}
                  offset={() => -1}
                  className="nav-link"
                  href="#news"
                >
                  News
                </AnchorLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
