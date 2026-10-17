"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Navbar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const pathname = usePathname();

  const toggleNavbar = () => {
    setCollapsed(!collapsed);
  };

  const handleSectionClick = (event, id) => {
    setCollapsed(true);
    if (pathname !== "/") {
      return;
    }
    const section = document.getElementById(id);
    if (!section) {
      return;
    }
    event.preventDefault();
    const top = section.getBoundingClientRect().top + window.scrollY;
    window.setTimeout(() => window.scrollTo({ top }), 0);
  };

  useEffect(() => {
    const elementId = document.getElementById("navbar");
    if (!elementId) {
      return;
    }
    const handleScroll = () => {
      if (window.scrollY > 170) {
        elementId.classList.add("is-sticky");
      } else {
        elementId.classList.remove("is-sticky");
      }
    };

    document.addEventListener("scroll", handleScroll);
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleMenuActiveClass = () => {
      let mainNavLinks = document.querySelectorAll(".navbar-nav li a");
      let fromTop = window.scrollY;
      mainNavLinks.forEach((link) => {
        if (!(link instanceof HTMLAnchorElement)) {
          return;
        }
        if (link.hash) {
          let section = document.querySelector(link.hash);

          if (!(section instanceof HTMLElement)) {
            link.classList.remove("active");
            return;
          }

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

          <Link href="/" className="navbar-brand">
            <Image
              className="menu-image"
              src="/images/potsrun_menu.png"
              alt="image"
              data-aos="fade-up"
              data-aos-duration="1000"
              width={100}
              height={50}
            />
          </Link>

          <div className={classOne} id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link
                  onClick={toggleNavbar}
                  className="nav-link active"
                  href="/"
                >
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  onClick={(event) => handleSectionClick(event, "matches")}
                  className="nav-link"
                  href="/#matches"
                >
                  Veranstaltungen
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  onClick={(event) => handleSectionClick(event, "shop")}
                  className="nav-link"
                  href="/#shop"
                >
                  Über uns
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  onClick={(event) => handleSectionClick(event, "partners")}
                  className="nav-link"
                  href="/#partners"
                >
                  Partner
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  onClick={(event) => handleSectionClick(event, "news")}
                  className="nav-link"
                  href="/#news"
                >
                  News
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
