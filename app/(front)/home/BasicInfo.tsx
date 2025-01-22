"use client";

import SpotlightCard from "@/components/SpotlightCard";
import { Separator } from "@/components/ui/separator";
import { motion } from "motion/react";

export default function BasicInfo() {
  return (
    <SpotlightCard className="relative z-[2] min-w-[630px]">
      <motion.div
        initial={{ opacity: 0, top: 10 }}
        animate={{ opacity: 1, top: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="space-y-1">
          <h3 className="text-3xl font-medium leading-none">Haolic</h3>
          <p className="text-sm">WEB开发工程师</p>
        </div>
        <Separator className="my-4 bg-ring" />
        <div className="flex h-5 items-center space-x-4 text-sm">
          <div>男</div>
          <Separator orientation="vertical" className="bg-ring" />
          <div>faruxue2019@163.com</div>
          <Separator orientation="vertical" className="bg-ring" />
          <div>React、Next.js、TypeScript、Node.js</div>
        </div>
      </motion.div>
    </SpotlightCard>
  );
}
