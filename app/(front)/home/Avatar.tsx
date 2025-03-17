"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

export default function Avatar() {
  const constraintsRef = useRef<HTMLDivElement>(null);
  return (
    <motion.div
      ref={constraintsRef}
      className="relative z-[3] w-[300px] h-[300px] rounded-full bg-opacity-10 bg-gray-400"
    >
      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.2}
        className="relative rounded-full w-[200px] h-[200px] cursor-grab active:cursor-grabbing"
        animate={{
          x: 100,
          y: 100,
        }}
        initial={{
          x: 0,
          y: 0,
        }}
        transition={{
          duration: 0.5,
          ease: "backOut",
        }}
      >
        <div className="rounded-full flex pt-6">
          <div className="w-[200px] h-[200px] border rounded-full absolute"></div>
          <div className="w-[200px] h-[200px] rounded-full relative box-content m-auto group">
            <div className="w-[200px] h-[200px] rounded-full overflow-hidden">
              <Image
                src="/avatar.jpg"
                alt="avatar"
                width={200}
                height={200}
                className="pointer-events-none"
              />
            </div>
            <div className="w-[200px] h-[156px] absolute top-0 left-0 pt-11 -translate-y-11 overflow-hidden">
              <Image
                src="/avatar-bg-transparent.png"
                alt="bg"
                width={200}
                height={200}
                className="transition-all scale-97 group-hover:scale-125 pointer-events-none"
              />
            </div>
            <div className="w-[200px] h-[100px] absolute bottom-0 left-0 rounded-bl-full rounded-br-full overflow-hidden">
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
  );
}
