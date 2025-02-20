"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, Rss } from "lucide-react";

const navList = [
  {
    name: "Home",
    path: "/home",
    icon: <House size={18} />,
  },
  // {
  //   name: "项目",
  //   path: "/project",
  // },
  {
    name: "Blog",
    path: "/blogs",
    icon: <Rss size={18} />,
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
    <Tabs value={pathnameValue} className="fixed top-6 z-[99]">
      <TabsList>
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
