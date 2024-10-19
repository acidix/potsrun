"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { urlFor, blocksToText } from "../../sanity/lib/client";
import moment from "moment";

const BlogPost = (props) => {
  let postsList = [];

  const components = {
    types: {
      code: props => (
        <pre data-language={props.node.language}>
          <code>{props.node.code}</code>
        </pre>
      )
    }
  }

  if ('posts' in props && props.posts.length > 0) {
    props.posts.forEach(function (post, i) {
      postsList.push(
        <div className="col-lg-4 col-md-6" key={i}>
        <div className="single-blog-post">
          <div className="post-image">
            <Image
              src={post.image ? urlFor(post.image).width(750).height(500).url() : ""}
              alt="image"
              width={750}
              height={500}
            />
            <Link
              href={post.slug ? "/" + post.slug : "/"}
              target="_blank"
              className="link-btn"
            ></Link>
          </div>

          <div className="post-content">
            <ul className="post-meta">
              <li>{post.publishedAt ? (moment(new Date(post.publishedAt))).format('DD.MM.YYYY') : "unknown"}</li>
            </ul>

            <h3>
              <Link href={post.slug ? "/" + post.slug : "/"} target="_blank">
                {post.title}
              </Link>
            </h3>

            <p>
            {blocksToText(post.body,300)} ...
            </p>

            <Link href={post.slug ? "/" + post.slug : "/"} className="read-more-btn">
              Read More
            </Link>
          </div>
        </div>
      </div>
)
    });
  }

  return (
    <>
      <section id="news" className="blog-area pt-100 pb-70">
        <div className="container">
          <div className="section-title">
            <h2>Neuigkeiten</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
              ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas
              accumsan lacus vel facilisis.
            </p>
          </div>

          <div className="row justify-content-center">

            {postsList}

          </div>
        </div>
      </section>
    </>
  );
};

export default BlogPost;
