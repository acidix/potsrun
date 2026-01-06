import BlogOverview from "@/components/potsrun/BlogOverview";
import Navbar from "@/components/Layouts/Navbar";
import Footer from "@/components/Layouts/Footer";

export const metadata = {
  title: "Blog - PotsRun",
  description:
    "Neuigkeiten, Laufberichte und Tipps rund um PotsRun und das Laufen in Potsdam.",
};

const Blog = () => {
  return (
    <>
      <Navbar />
      <BlogOverview />
      <Footer />
    </>
  );
};

export default Blog;
