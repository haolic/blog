import type { Metadata } from "next";

import Nav from "@/components/nav";

export const metadata: Metadata = {
  title: "Haolic",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Nav />
      {children}
    </>
  );
}
