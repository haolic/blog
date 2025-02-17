"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navList = [
  {
    name: "Home",
    path: "/home",
  },
  // {
  //   name: "项目",
  //   path: "/project",
  // },
  {
    name: "Blog",
    path: "/blogs",
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
              {item.name}
            </TabsTrigger>
          </Link>
        ))}
      </TabsList>
    </Tabs>
  );
}
