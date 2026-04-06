import Navbar from "../components/Layouts/Navbar";
import Banner from "../components/potsrun/Banner";
import UpcomingMatches from "../components/potsrun/UpcomingMatches";
import Products from "../components/potsrun/Products";
import Partners from "../components/potsrun/Partners";
import BlogPost from "../components/potsrun/BlogPost";
import Footer from "../components/Layouts/Footer";
import { sanityFetch } from "../sanity/lib/client";
import {
  blogQuery,
  nextEventsQuery,
} from "../sanity/lib/queries";
import NextMatch from "../components/potsrun/NextMatch";

interface Props {
  nextEvents: any;
  blogPosts: any;
}

async function fetchData(): Promise<Props> {
  const nextEvents = await sanityFetch({
    query: nextEventsQuery,
  });

  const blogPosts = await sanityFetch({
    query: blogQuery,
  });

  return {
    nextEvents: nextEvents,
    blogPosts: blogPosts,
  };
}

export default async function Home() {
  const data: Props = await fetchData();
  return (
    <>
      <Navbar />

      <Banner />

      <NextMatch />

      <UpcomingMatches events={data.nextEvents} />

      <BlogPost posts={data.blogPosts} />

      <Products />

      <Partners />

      <Footer />
    </>
  );
}
