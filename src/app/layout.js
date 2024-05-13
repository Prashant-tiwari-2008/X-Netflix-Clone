import { Inter } from "next/font/google";
import "./globals.css";
import Commentpopup from "@/components/Commentpopup";
import LeftSide from "@/components/LeftSide";
import RightSide from "@/components/RightSide";
import Provider from "@/components/SessionProvider";


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
        <Provider>
          <div className="flex justify-between max-w-7xl mx-auto">
            {/* todo : Need to fix ui in tablet view  */}
            <div className="hidden sm:inline border-r h-screen sticky top-0"><LeftSide /></div>
            <div className="w-2xl flex-1 lg:border-x-0 border-gray-100">{children}</div>
            <div className="hidden lg:inline border-l h-screen top-0 w-96"><RightSide /></div>
            <div></div>
          </div>
          {/* todo : need to work onit */}
          {/* <Commentpopup /> */}
        </Provider>
      </body>
    </html>
  );
}

// {children}