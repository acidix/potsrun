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
  title: "Plaon - React Nextjs Sports & Athlete Personal Portfolio Template",
  description: "React Nextjs Sports & Athlete Personal Portfolio Template",
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
