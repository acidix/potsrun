"use client";

import React from "react";
import Link from "next/link";
import ArticleFooter from "./ArticleFooter";
import CommentsArea from "./CommentsArea";
import Image from "next/image";

const SingleBlogContent = () => {
  return (
    <>
      {/* Start Page Banner Area */}
      <div
        className="page-banner-area"
        style={{
          backgroundImage: `url(/images/football/footb-banner1.jpg)`,
        }}
      >
        <div className="back-home">
          <a href="/football">
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
                <h3>Your talent determines what you can do</h3>

                <div className="entry-meta">
                  <ul>
                    <li>
                      <i className="bx bx-folder"></i>
                      <span>Category:</span>
                      <Link href="#">Fashion</Link>
                    </li>
                    <li>
                      <i className="bx bxs-user-detail"></i>
                      <span>Posted By:</span>
                      <Link href="#">Kreton Smith</Link>
                    </li>
                    <li>
                      <i className="bx bx-calendar"></i>
                      <span>Posted On:</span>
                      <Link href="#">01/14/2020</Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="blog-details-desc">
                <div className="article-content">
                  <p>
                    Quuntur magni dolores eos qui ratione voluptatem sequi
                    nesciunt. Neque porro quia non numquam eius modi tempora
                    incidunt ut labore et dolore magnam dolor sit amet,
                    consectetur adipisicing.
                  </p>

                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in sed quia non
                    numquam eius modi tempora incidunt ut labore et dolore
                    magnam aliquam quaerat voluptatem.
                  </p>

                  <ul className="wp-block-gallery columns-3">
                    <li className="blocks-gallery-item">
                      <figure>
                        <Image
                          src="/images/football/blog/footb-blog1.jpg"
                          alt="image"
                          width={750}
                          height={500}
                        />
                      </figure>
                    </li>

                    <li className="blocks-gallery-item">
                      <figure>
                        <Image
                          src="/images/football/blog/footb-blog2.jpg"
                          alt="image"
                          width={750}
                          height={500}
                        />
                      </figure>
                    </li>

                    <li className="blocks-gallery-item">
                      <figure>
                        <Image
                          src="/images/football/blog/footb-blog3.jpg"
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

                {/* Article Footer */}
                <ArticleFooter />

                {/* Post Navigation */}
                <div className="kreton-post-navigation">
                  <div className="prev-link-wrapper">
                    <div className="info-prev-link-wrapper">
                      <Link href="#">
                        <span className="image-prev">
                          <Image
                            src="/images/football/blog/footb-blog1.jpg"
                            alt="image"
                            width={750}
                            height={500}
                          />
                          <span className="post-nav-title">Prev</span>
                        </span>
                        <span className="prev-link-info-wrapper">
                          <span className="prev-title">
                            How to Find the Perfect Influencers for Your Niche
                          </span>
                          <span className="meta-wrapper">
                            <span className="date-post">January 21, 2020</span>
                          </span>
                        </span>
                      </Link>
                    </div>
                  </div>

                  <div className="next-link-wrapper">
                    <div className="info-next-link-wrapper">
                      <Link href="#">
                        <span className="next-link-info-wrapper">
                          <span className="next-title">
                            How to Successfully Negotiate with Influencers
                          </span>
                          <span className="meta-wrapper">
                            <span className="date-post">January 19, 2020</span>
                          </span>
                        </span>
                        <span className="image-next">
                          <Image
                            src="/images/football/blog/footb-blog2.jpg"
                            alt="image"
                            width={750}
                            height={500}
                          />
                          <span className="post-nav-title">Next</span>
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Comments Area */}
                <CommentsArea />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleBlogContent;
