"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();
  return (
    <Tabs value={pathname} className="fixed top-6">
      <TabsList>
        <Link href="/home">
          <TabsTrigger value="/home" className="min-w-24">
            Home
          </TabsTrigger>
        </Link>

        <Link href="/project">
          <TabsTrigger value="/project" className="min-w-24">
            项目
          </TabsTrigger>
        </Link>

        <Link href="/blog">
          <TabsTrigger value="/blog" className="min-w-24">
            Blog
          </TabsTrigger>
        </Link>
      </TabsList>
    </Tabs>
  );
}
