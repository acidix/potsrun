"use client";

import React, { useState, useEffect } from "react";
import { sanityFetch } from "../../sanity/lib/client";
import { allBlogPostsQuery } from "../../sanity/lib/queries";
import moment from "moment";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "../../sanity/lib/image";
import { blocksToText } from "../../sanity/lib/client";

interface Post {
  title: string;
  slug: string;
  author: string;
  image: any;
  publishedAt: string;
  body: any;
}

const BlogOverview = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await sanityFetch({ query: allBlogPostsQuery });
      setPosts(posts);
    };
    fetchPosts();
  }, []);

  const groupedPosts = posts.reduce(
    (acc, post) => {
      const month = moment(post.publishedAt).format("MMMM YYYY");
      if (!acc[month]) {
        acc[month] = [];
      }
      acc[month].push(post);
      return acc;
    },
    {} as Record<string, Post[]>,
  );

  return (
    <section className="blog-area ptb-100">
      <div className="container">
        <div className="section-title">
          <h2>Blog</h2>
        </div>

        <div className="row">
          {Object.entries(groupedPosts).map(([month, posts]) => (
            <div key={month} className="col-lg-12 col-md-12 mb-5">
              <div className="month-group">
                <h3>{month}</h3>
                <div className="row">
                  {posts.map((post) => (
                    <div key={post.slug} className="col-lg-4 col-md-6">
                      <div className="single-blog-post">
                        {post.image?.asset && (
                          <div className="post-image">
                            <Image
                              src={urlFor(post.image)
                                .width(750)
                                .height(500)
                                .url()}
                              alt="image"
                              width={750}
                              height={500}
                            />

                            <Link
                              href={`/blog/${post.slug}`}
                              className="link-btn"
                            ></Link>
                          </div>
                        )}

                        <div className="post-content">
                          <ul className="post-meta post-meta-rows">
                            <li>
                              By{" "}
                              <Link href="#" className="author-link">
                                {post.author}
                              </Link>
                            </li>
                            <li>{moment(post.publishedAt).format("LL")}</li>
                          </ul>
                          <h3>
                            <Link href={`/blog/${post.slug}`}>
                              {post.title}
                            </Link>
                          </h3>
                          <p>{blocksToText(post.body, 100)}...</p>
                          <Link
                            href={`/blog/${post.slug}`}
                            className="read-more-btn"
                          >
                            Read More
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogOverview;
