"use client";

import React from "react";
import Link from "next/link";
import ArticleFooter from "./ArticleFooter";
import CommentsArea from "./CommentsArea";
import Image from "next/image";
import { PortableText } from "next-sanity";
import moment from "moment";
import { renderPortableText } from "../../../sanity/lib/rendering";


const SingleBlogContent = (Props) => {
  return (
    <>
      {/* Start Page Banner Area */}
      <div
        className="page-banner-area"
        style={{
          backgroundImage: `url(/images/potsrun/footb-banner1.jpg)`,
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

                  <ul className="wp-block-gallery columns-3">
                    <li className="blocks-gallery-item">
                      <figure>
                        <Image
                          src="/images/potsrun/blog/footb-blog1.jpg"
                          alt="image"
                          width={750}
                          height={500}
                        />
                      </figure>
                    </li>

                    <li className="blocks-gallery-item">
                      <figure>
                        <Image
                          src="/images/potsrun/blog/footb-blog2.jpg"
                          alt="image"
                          width={750}
                          height={500}
                        />
                      </figure>
                    </li>

                    <li className="blocks-gallery-item">
                      <figure>
                        <Image
                          src="/images/potsrun/blog/footb-blog3.jpg"
                          alt="image"
                          width={750}
                          height={500}
                        />
                      </figure>
                    </li>
                  </ul>

                  <blockquote>
                    <p>
                      It is a long established fact that a reader will be
                      distracted by the readable content of a page when looking
                      at its layout.
                    </p>
                    <cite>Tom Cruise</cite>
                  </blockquote>

                  <p>
                    Quuntur magni dolores eos qui ratione voluptatem sequi
                    nesciunt. Neque porro quia non numquam eius modi tempora
                    incidunt ut labore et dolore magnam dolor sit amet,
                    consectetur adipisicing.
                  </p>

                  <h3>Understand Influencers Costs</h3>

                  <ul className="features-list">
                    <li>
                      <strong>Influencer size and engagement rate:</strong>{" "}
                      Scientific skills for getting a better result
                    </li>
                    <li>
                      <strong>Influencer industry:</strong> Communication skills
                      to getting in touch
                    </li>
                    <li>
                      <strong>Influencer locations:</strong> A career overview
                      opportunity available
                    </li>
                    <li>
                      <strong>Campaign variables:</strong> A good work
                      environment for work
                    </li>
                  </ul>

                  <h3>Setting the mood with incense</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in sed quia non
                    numquam eius modi tempora incidunt ut labore et dolore
                    magnam aliquam quaerat voluptatem.
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

export default SingleBlogContent;
