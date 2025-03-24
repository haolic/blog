"use client";
import { CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";

const HomeassistantNextPhone = () => {
  const { resolvedTheme } = useTheme();

  const [theme, setTheme] = useState("light");

  useEffect(() => {
    setTheme(resolvedTheme || ("light" as const));
  }, [resolvedTheme]);

  return (
    <div>
      <CardHeader>
        <CardTitle className="text-center flex items-center justify-center gap-2">
          Homeassistant-NEXT Mobile
          <span
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="cursor-pointer flex items-center gap-1"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}切换
          </span>
        </CardTitle>
      </CardHeader>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 z-10">
        <div className="relative min-w-[300px] mx-auto lg:mx-0 lg:ml-auto ">
          <Image
            src="/homeassistant-next/homeassistant-next-phone.png"
            alt="Homeassistant-NEXT"
            key="light"
            width={300}
            height={587.22}
            className={cn(
              "w-full h-full align-top transition-opacity duration-700 pointer-events-none",
              theme === "light" ? "opacity-100" : "opacity-0"
            )}
          />
          <Image
            src="/homeassistant-next/homeassistant-next-phone-dark.png"
            alt="Homeassistant-NEXT"
            key="dark"
            width={300}
            height={587.22}
            className={cn(
              "w-full h-full align-top absolute top-0 left-0 transition-opacity duration-700 pointer-events-none",
              theme === "dark" ? "opacity-100" : "opacity-0"
            )}
          />
        </div>
        <div className="relative min-w-[300px] mx-auto lg:mx-0 lg:mr-auto ">
          <Image
            src="/homeassistant-next/homeassistant-next-phone-cook.png"
            alt="Homeassistant-NEXT"
            key="light"
            width={300}
            height={587.22}
            className={cn(
              "w-full h-full align-top transition-opacity duration-700 pointer-events-none",
              theme === "light" ? "opacity-100" : "opacity-0"
            )}
          />
          <Image
            src="/homeassistant-next/homeassistant-next-phone-cook-dark.png"
            alt="Homeassistant-NEXT"
            key="dark"
            width={300}
            height={587.22}
            className={cn(
              "w-full h-full align-top absolute top-0 left-0 transition-opacity duration-700 pointer-events-none",
              theme === "dark" ? "opacity-100" : "opacity-0"
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default HomeassistantNextPhone;
