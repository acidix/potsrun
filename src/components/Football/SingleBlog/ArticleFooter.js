"use client";

import React from "react";
import Link from "next/link";

const ArticleFooter = () => {
  return (
    <>
      <div className="article-footer">
        <div className="article-tags">
          <span>
            <i className="bx bx-folder"></i>
          </span>
          <Link href="#">Fashion</Link>
          <Link href="#">Games</Link>
          <Link href="#">Travel</Link>
        </div>

        <div className="article-share">
          <ul className="social">
            <li>
              <span>Share:</span>
            </li>
            <li>
              <a
                href="https://www.facebook.com/"
                className="facebook"
                target="_blank"
              >
                <i className="bx bxl-facebook"></i>
              </a>
            </li>
            <li>
              <a
                href="https://www.twitter.com/"
                className="twitter"
                target="_blank"
              >
                <i className="bx bxl-twitter"></i>
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/"
                className="linkedin"
                target="_blank"
              >
                <i className="bx bxl-linkedin"></i>
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/"
                className="instagram"
                target="_blank"
              >
                <i className="bx bxl-instagram"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default ArticleFooter;
