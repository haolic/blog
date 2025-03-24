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
    <>
      <CardHeader className="pt-0">
        <CardTitle className="text-center flex items-center justify-center gap-2">
          Homeassistant-NEXT
          <span
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="cursor-pointer flex items-center gap-1"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}切换
          </span>
        </CardTitle>
      </CardHeader>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 z-10">
        <div className="relative w-full mx-auto lg:mx-0 lg:ml-auto ">
          <Image
            src="/homeassistant-next/homeassistant-next-pc.png"
            alt="Homeassistant-NEXT"
            className={cn(
              "w-full align-top transition-opacity duration-700 pointer-events-none",
              theme === "light" ? "opacity-100" : "opacity-0"
            )}
            width={1000}
            height={615.24}
          />

          <Image
            src="/homeassistant-next/homeassistant-next-pc-dark.png"
            alt="Homeassistant-NEXT"
            className={cn(
              "w-full align-top absolute top-0 left-0 transition-opacity duration-700 pointer-events-none",
              theme === "dark" ? "opacity-100" : "opacity-0"
            )}
            width={1000}
            height={615.24}
          />
        </div>
        <div className="relative w-full mx-auto lg:mx-0 lg:mr-auto ">
          <Image
            src="/homeassistant-next/homeassistant-next-pc-cook.png"
            alt="Homeassistant-NEXT"
            width={1000}
            height={500}
            className={cn(
              "w-full align-top transition-opacity duration-700 pointer-events-none",
              theme === "light" ? "opacity-100" : "opacity-0"
            )}
          />
          <Image
            src="/homeassistant-next/homeassistant-next-pc-cook-dark.png"
            alt="Homeassistant-NEXT"
            width={1000}
            height={500}
            className={cn(
              "w-full align-top absolute top-0 left-0 transition-opacity duration-700 pointer-events-none",
              theme === "dark" ? "opacity-100" : "opacity-0"
            )}
          />
        </div>
      </div>
    </>
  );
};

export default HomeassistantNext;
