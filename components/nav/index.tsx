"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, Rss, Grid2x2 } from "lucide-react";
const navList = [
  {
    name: "Home",
    path: "/home",
    icon: <House size={18} />,
  },
  {
    name: "Blog",
    path: "/blogs",
    icon: <Rss size={18} />,
  },
  {
    name: "Pixel Image",
    path: "/pixel-image",
    icon: <Grid2x2 size={18} />,
  },
];

export default function Nav() {
  const pathname = usePathname();

  let pathnameValue = pathname;
  const navItem = navList.find((item) => pathnameValue.includes(item.path));
  if (navItem) {
    pathnameValue = navItem.path;
  }

  return (
    <Tabs value={pathnameValue} className="fixed top-10 z-[99]">
      <TabsList className="bg-white/10 backdrop-blur-sm shadow-lg">
        {navList.map((item) => (
          <Link href={item.path} key={item.path}>
            <TabsTrigger value={item.path} className="min-w-24">
              <div className="flex items-center gap-1">
                {item.icon}
                {item.name}
              </div>
            </TabsTrigger>
          </Link>
        ))}
      </TabsList>
    </Tabs>
  );
}
