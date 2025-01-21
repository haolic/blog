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
    <div className="pt-24 w-full flex flex-col items-center">
      <Nav />
      {children}
    </div>
  );
}
