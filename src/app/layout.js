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
  description:
    "PotsRun ist deine Laufgruppe in Potsdam. Wir laufen gemeinsam, ohne Leistungsdruck und mit viel Spaß. Schließ dich uns an!",
  keywords: [
    "Laufen",
    "Potsdam",
    "Laufgruppe",
    "Joggen",
    "Sport",
    "Community",
    "PotsRun",
  ],
  openGraph: {
    title: "PotsRun - Die Potsdamer Laufgruppe",
    description:
      "Gemeinsam laufen in Potsdam. Trete unserer kostenlosen Laufgruppe bei!",
    url: "https://www.potsrun.de",
    siteName: "PotsRun",
    images: [
      {
        url: "/images/potsrun_team1.jpg",
        width: 1200,
        height: 630,
        alt: "PotsRun Laufgruppe",
      },
    ],
    locale: "de_DE",
    type: "website",
  },
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
    <html lang="de">
      <body className={teko.className}>
        {children}

        <AosAnimation />

        <GoTop />
      </body>
    </html>
  );
}
