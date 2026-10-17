"use client";

import React, { useState, useEffect } from "react";

const GoTop = () => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const checkScrollTop = () => {
      setShowScroll(window.pageYOffset > 100);
    };

    window.addEventListener("scroll", checkScrollTop);
    return function cleanup() {
      window.removeEventListener("scroll", checkScrollTop);
    };
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div
        className="go-top"
        onClick={scrollTop}
        style={{
          display: showScroll ? "block" : "none",
        }}
      >
        <i className="bx bxs-up-arrow-alt"></i>
      </div>
    </>
  );
};

export default GoTop;
