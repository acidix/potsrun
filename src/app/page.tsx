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
  nextClubEventQuery,
  nextEventsQuery,
} from "../sanity/lib/queries";
import dynamic from "next/dynamic";

const NextMatch = dynamic(() => import("../components/potsrun/NextMatch"), {
  ssr: false,
  loading: () => (
    <section className="next-match-area">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="next-match-content">
              <div className="content">
                <h2>Lade nächsten Lauf...</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  ),
});

interface Props {
  nextClubEvent: any;
  nextEvents: any;
  blogPosts: any;
}

async function fetchData(): Promise<Props> {
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

      <BlogPost posts={data.blogPosts} />

      <Products />

      <Partners />

      <Footer />
    </>
  );
}
