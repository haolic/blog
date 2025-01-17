import type { Metadata } from "next";
import Nav from "@/components/nav";

import "./globals.css";

export const metadata: Metadata = {
  title: "Haolic",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col items-center justify-center pt-24">
        <Nav />
        {children}
      </body>
    </html>
  );
}
