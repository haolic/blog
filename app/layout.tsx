import type { Metadata } from "next";

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
      <body className="flex flex-col items-center justify-center">
        {children}
      </body>
    </html>
  );
}
