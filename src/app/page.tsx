import Navbar from "../components/Layouts/Navbar";
import Banner from "../components/Football/Banner";
import NextMatch from "../components/Football/NextMatch";
import UpcomingMatches from "../components/Football/UpcomingMatches";
import Products from "../components/Football/Products";
import Partners from "../components/Football/Partners";
import BlogPost from "../components/Football/BlogPost";
import Footer from "../components/Layouts/Footer";
import { sanityFetch } from "../sanity/lib/client";
import { blogQuery, nextClubEventQuery, nextEventsQuery } from "../sanity/lib/queries";

interface Props {
  nextClubEvent: any;
  nextEvents: any;
  blogPosts: any;
}

async function fetchData():Promise<Props> {
  const nextClubEvent = await sanityFetch({
    query: nextClubEventQuery,
  });

  const nextEvents = await sanityFetch({
    query: nextEventsQuery,
  });

  const blogPosts = await sanityFetch({
    query: blogQuery,
  });

  return {
    nextClubEvent: nextClubEvent,
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

      <NextMatch nextEvent={data.nextClubEvent} />

      <UpcomingMatches events={data.nextEvents} />

      <Products />

      <Partners />

      <BlogPost posts={data.blogPosts}/>

      <Footer />
    </>
  );
}
