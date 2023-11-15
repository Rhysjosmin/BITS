

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SideBar } from "@/app/Components/SideBar";
import { NavBar } from "@/app/Components/NavBar";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex">
          <SideBar links={[{ name: "Dashboard", src: "/Dashboards/Doctor" }]} />
          <div className="w-[calc(100vw-13rem)]">
            <div className="h-16">
              <NavBar />
            </div>
            <div className="p-3">{children}</div>
   
          </div>
        </div>
      </body>
    </html>
  );
}
