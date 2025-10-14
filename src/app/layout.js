import "../../styles/bootstrap.min.css";
import "../../styles/animate.min.css";
import "../../styles/flaticon.css";
import "../../styles/boxicons.min.css";
import "swiper/css";
import "swiper/css/bundle";
// Global styles
import "../../styles/style.css";
import "../../styles/responsive.css";

import { Teko } from "next/font/google";
import GoTop from "@/components/Shared/GoTop";
import AosAnimation from "@/components/Layouts/AosAnimation";

const teko = Teko({ subsets: ["latin"] });

export const metadata = {
  title: "PotsRun - Die Potsdamer Laufgruppe",
  description: "React Nextjs Sports & Athlete Personal Portfolio Template",
  icons: {
    icon: [
      { url: "/images/favicon.ico" },
      {
        url: "/images/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/images/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
    shortcut: ["/images/favicon.ico"],
    apple: ["/images/favicon-32x32.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={teko.className}>
        {children}

        <AosAnimation />

        <GoTop />
      </body>
    </html>
  );
}
