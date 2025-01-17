"use client";

import { motion } from "motion/react";
import Image from "next/image";

export default function Avatar() {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, top: -5 }}
      animate={{ opacity: 1, top: 0 }}
    >
      <Image
        src="/avatar.jpg"
        alt="avatar"
        width={200}
        height={200}
        className="rounded-full"
      />
    </motion.div>
  );
}
