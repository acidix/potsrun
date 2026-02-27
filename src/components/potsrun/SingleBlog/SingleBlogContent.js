"use client";

import React from "react";
import Link from "next/link";
import moment from "moment";
import { renderPortableText } from "../../../sanity/lib/rendering";
import { urlFor } from "../../../sanity/lib/client";

const SingleBlogContent = (Props) => {
  return (
    <>
      {/* Start Page Banner Area */}
      <div
        className="page-banner-area"
        style={{
          backgroundImage: `url(${Props.post.image ? urlFor(Props.post.image).width(1920).height(1080).url() : ""})`,
        }}
      >
        <div className="back-home">
          <a href="/">
            <i className="bx bxs-left-arrow-alt"></i> Back Home
          </a>
        </div>
      </div>

      {/* Start Blog Details Area */}
      <section id="blog" className="blog-details-area ptb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-12 offset-lg-2">
              <div className="blog-details-header">
                <h3>{Props.post.title || ''}</h3>

                <div className="entry-meta">
                  <ul>
                    <li>
                      <span>Posted By:</span>
                      <Link href="#">{Props.post.author}</Link>
                    </li>
                    <li>
                      <span>Posted On:</span>
                      <Link href="#">{Props.post.publishedAt ? (moment(new Date(Props.post.publishedAt))).format('DD.MM.YYYY') : "unknown"}</Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="blog-details-desc">
                <div className="article-content">
                  {renderPortableText(Props.post.body)}
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleBlogContent;
