import React from "react";
import { Metadata } from "next";
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

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const query = `*[_type == "post" && slug.current == $slug][0].title`;
  const title = await client.fetch(query, { slug: params.slug });

  return {
    title: `${title} - PotsRun Blog`,
    description: `Lies den Beitrag "${title}" auf der PotsRun Webseite.`,
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await fetchData({ slug: params.slug });
  return (
    <>
      <SingleBlogContent post={post} />
    </>
  );
}

export async function generateStaticParams() {
  const query = `*[_type == "post"]{ 'slug': slug.current }`;
  const posts = await client.fetch(query);

  return posts.map((post: any) => ({
    slug: post.slug,
  }));
}
