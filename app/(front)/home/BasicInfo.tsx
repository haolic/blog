"use client";

import { Separator } from "@/components/ui/separator";
import { motion } from "motion/react";

export default function BasicInfo() {
  return (
    <motion.div
      className="relative z-[2]"
      initial={{ opacity: 0, top: 10 }}
      animate={{ opacity: 1, top: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="space-y-1">
        <h3 className="text-3xl font-medium leading-none">Haolic</h3>
        <p className="text-sm text-muted-foreground">WEB开发工程师</p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div>男</div>
        <Separator orientation="vertical" />
        <div>7年前端</div>
        <Separator orientation="vertical" />
        <div>faruxue2019@163.com</div>
        <Separator orientation="vertical" />
        <div>React、Next.js、TypeScript、Node.js</div>
      </div>
    </motion.div>
  );
}
