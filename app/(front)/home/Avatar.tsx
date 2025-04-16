"use client";

import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Avatar.module.css";
import { cn } from "@/lib/utils";
import { Hand } from "lucide-react";
import AvatarImg from "./AvatarImg";
import AvatarAnimation from "./AvatarAnimation";

export default function Avatar() {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const [inited, setInited] = useState(false);

  const [avatarInTop, setAvatarInTop] = useState(false);

  const calcBodyScroll = useCallback(() => {
    const scrollY = window.scrollY;
    // 控制0-362的高度的动画。
    if (scrollY < 200) {
      if (avatarInTop) {
        setAvatarInTop(false);
      }
      wrapRef.current?.style.setProperty("--delay", `-${scrollY}s`);
    } else if (scrollY > 200) {
      if (!avatarInTop) {
        setAvatarInTop(true);
      }
      wrapRef.current?.style.setProperty("--delay", "-200s");
    }
  }, [avatarInTop]);

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

      <AvatarAnimation
        className={cn({
          "opacity-0": !inited || !avatarInTop,
        })}
      />

      <motion.div
        ref={constraintsRef}
        className={cn(
          "fixed top-[120px] left-1/2 -translate-x-1/2 z-20 rounded-full bg-opacity-20 bg-gray-400",
          styles["avatar-drag-container"],
          {
            "opacity-0": !inited || avatarInTop,
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
          className={cn(
            "relative rounded-full w-[200px] h-[200px] cursor-grab active:cursor-grabbing"
          )}
          transition={{
            duration: 0.5,
            ease: "backOut",
          }}
        >
          <div className="rounded-full flex">
            <div className="w-[200px] h-[200px] border rounded-full absolute pointer-events-none"></div>
            <AvatarImg />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
