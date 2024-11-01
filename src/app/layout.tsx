import type { Metadata } from "next";

import { fustat } from "./constants/font";
import "./globals.css";
import Navigation from "@/components/Navigation";
import MainBackGround from "@/components/MainBackGround";

export const metadata: Metadata = {
  title: "Agora",
  description: "AI personal shopping assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
      </head>
      <body className={`${fustat.className} antialiased`}>
        <MainBackGround />
        <main className="lg:flex">
          <div className="basis-20">
            <Navigation />
          </div>
          <div className="w-full">{children}</div>
        </main>
      </body>
    </html>
  );
}
