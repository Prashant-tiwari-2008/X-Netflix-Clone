import { Inter } from "next/font/google";
import "./globals.css";
import Commentpopup from "@/components/Commentpopup";
import LeftSide from "@/components/LeftSide";
import RightSide from "@/components/RightSide";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "X-Nextjs-Clonse",
  description: "X application clone created by Prashant tiwari",
};

export default function RootLayout({ children }) {
  // todo : session remaning
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex justify-between max-w-7xl mx-auto">
          {/* <div className="hidden sm:inline border-r h-screen sticky top-0"><LeftSide /></div> */}
          <div className="hidden sm:inline border-r h-screen sticky top-0"><LeftSide /></div>
          <div className="max-w-2xl flex-1">{children}</div>
          <div className="hidden sm:inline border-l h-screen sticky top-0 w-96"><RightSide /></div>
          <div></div>
        </div>
        <Commentpopup />
      </body>
    </html>
  );
}

// {children}