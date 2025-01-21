"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

export default function Avatar() {
  const constraintsRef = useRef<HTMLDivElement>(null);
  return (
    <motion.div
      ref={constraintsRef}
      className="w-[300px] h-[300px] bg-gray-50 rounded-full"
    >
      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.2}
        className="relative rounded-full w-[200px] h-[200px]"
        animate={{
          x: 100,
          y: 100,
        }}
        initial={{
          x: 0,
          y: 0,
        }}
      >
        <Image
          src="/avatar.jpg"
          alt="avatar"
          width={200}
          height={200}
          className="rounded-full pointer-events-none"
        />
      </motion.div>
    </motion.div>
  );
}
