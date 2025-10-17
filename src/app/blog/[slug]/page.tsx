import React from "react";
import SingleBlogContent from "../../../components/potsrun/SingleBlog/SingleBlogContent";
import { client } from "../../../sanity/lib/client";

async function fetchData(params: { slug: string }): Promise<any> {
  const query = `*[_type == "post" && slug.current == $slug] {
    title,
    "author": author->name,
    "image": mainImage.asset,
    publishedAt,
    body
  }`;

  const options = { slug: params.slug };

  const post = await client.fetch(query, options);

  return post[0] || {};
}

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await fetchData({ slug: params.slug });
  return (
    <>
      <SingleBlogContent post={post} />
    </>
  );
}

async function getStaticPaths() {
  const query = `*[_type == "post"]{ 'slug': slug.current }`;

  const posts = await client.fetch(query);

  const paths =
    posts?.map((post) => ({
      params: {
        slug: post.slug,
      },
    })) || [];

  return {
    paths,
    fallback: false,
  };
}
