"use client";
import { CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

const HomeassistantNext = () => {
  const { resolvedTheme } = useTheme();

  const [theme, setTheme] = useState("light");

  useEffect(() => {
    setTheme(resolvedTheme || ("light" as const));
  }, [resolvedTheme]);

  return (
    <div>
      <CardHeader>
        <CardTitle className="text-center flex items-center justify-center gap-2">
          Homeassistant-NEXT
          <span
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="cursor-pointer flex items-center gap-1"
          >
            {theme === "dark" ? <Sun /> : <Moon />}切换
          </span>
        </CardTitle>
      </CardHeader>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 z-10">
        <div className="relative w-full h-[500px] mx-auto lg:mx-0 lg:ml-auto ">
          <Image
            src="/homeassistant-next/homeassistant-next-pc.png"
            alt="Homeassistant-NEXT"
            className={cn(
              "w-full align-top absolute top-0 left-0 transition-opacity duration-700 pointer-events-none",
              theme === "light" ? "opacity-100" : "opacity-0"
            )}
            width={1000}
            height={500}
          />

          <Image
            src="/homeassistant-next/homeassistant-next-pc-dark.png"
            alt="Homeassistant-NEXT"
            key="dark"
            width={1000}
            height={500}
            className={cn(
              "w-full align-top absolute top-0 left-0 transition-opacity duration-700 pointer-events-none",
              theme === "dark" ? "opacity-100" : "opacity-0"
            )}
          />
        </div>
        <div className="relative w-full h-[500px] mx-auto lg:mx-0 lg:mr-auto ">
          <Image
            src="/homeassistant-next/homeassistant-next-pc-cook.png"
            alt="Homeassistant-NEXT"
            key="light"
            width={1000}
            height={500}
            className={cn(
              "w-full align-top absolute top-0 left-0 transition-opacity duration-700 pointer-events-none",
              theme === "light" ? "opacity-100" : "opacity-0"
            )}
          />
          <Image
            src="/homeassistant-next/homeassistant-next-pc-cook-dark.png"
            alt="Homeassistant-NEXT"
            key="dark"
            width={1000}
            height={500}
            className={cn(
              "w-full align-top absolute top-0 left-0 transition-opacity duration-700 pointer-events-none",
              theme === "dark" ? "opacity-100" : "opacity-0"
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default HomeassistantNext;
