import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { Noto_Serif } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/ModeToggle";
import Version from "@/components/Version";

export const metadata: Metadata = {
  title: "Haolic",
};

const notoSerif = Noto_Serif({
  weight: "400",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://static.zeoseven.com/zsft/22/main/result.css" />
      </head>
      <body className={`flex flex-col items-center justify-center ${notoSerif.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Version />
          <ModeToggle />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
