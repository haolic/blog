"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Avatar.module.css";
import { cn } from "@/lib/utils";
import { Hand } from "lucide-react";

export default function Avatar() {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const [inited, setInited] = useState(false);

  const calcBodyScroll = useCallback(() => {
    const scrollY = window.scrollY;
    // 控制0-362的高度的动画。
    if (scrollY <= 362) {
      wrapRef.current?.style.setProperty("--delay", `-${scrollY}s`);
    } else {
      wrapRef.current?.style.setProperty("--delay", "-362s");
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", calcBodyScroll);
    calcBodyScroll();
    setInited(true);
    return () => {
      window.removeEventListener("scroll", calcBodyScroll);
    };
  }, [calcBodyScroll]);

  return (
    <div ref={wrapRef}>
      <div className="w-[200px] h-[200px]"></div>

      <motion.div
        ref={constraintsRef}
        className={cn(
          "fixed top-[120px] left-1/2 -translate-x-1/2 z-20 rounded-full bg-opacity-20 bg-gray-400",
          styles["avatar-drag-container"],
          {
            "opacity-0": !inited,
          }
        )}
      >
        <div
          className={cn(
            "absolute left-1/2 -translate-x-1/2 -top-8 opacity-30",
            styles["avatar-drag-hand"]
          )}
        >
          <Hand />
        </div>
        <motion.div
          drag
          dragConstraints={constraintsRef}
          dragElastic={0.2}
          className="relative rounded-full w-[200px] h-[200px] cursor-grab active:cursor-grabbing"
          transition={{
            duration: 0.5,
            ease: "backOut",
          }}
        >
          <div className="rounded-full flex">
            <div className="w-[200px] h-[200px] border rounded-full absolute pointer-events-none"></div>
            <div className="w-[200px] h-[200px] rounded-full relative box-content m-auto group :hover:scale-95">
              <div className="w-[200px] h-[200px] rounded-full overflow-hidden pointer-events-none">
                <Image
                  src="/avatar.jpg"
                  alt="avatar"
                  width={200}
                  height={200}
                  className="pointer-events-none"
                />
              </div>
              <div className="w-[200px] h-[156px] absolute top-0 left-0 pt-11 -translate-y-11 overflow-hidden pointer-events-none">
                <Image
                  src="/avatar-bg-transparent.png"
                  alt="bg"
                  width={200}
                  height={200}
                  className="transition-all scale-97 group-hover:scale-125 pointer-events-none"
                />
              </div>
              <div className="w-[200px] h-[100px] absolute bottom-0 left-0 rounded-bl-full rounded-br-full overflow-hidden pointer-events-none">
                <Image
                  src="/avatar-bg-transparent.png"
                  alt="bg"
                  width={200}
                  height={200}
                  className="-translate-y-1/2 transition-all scale-97 group-hover:scale-125 pointer-events-none"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
