"use client";

import SVGMail from "@/components/icons/SVGMail";
import SVGNextjs from "@/components/icons/SVGNextjs";
import SVGNodejs from "@/components/icons/SVGNodejs";
import SVGReact from "@/components/icons/SVGReact";
import SVGTailwindCSS from "@/components/icons/SVGTailwindCSS";
import SpotlightCard from "@/components/SpotlightCard";
import { Separator } from "@/components/ui/separator";
import { motion } from "motion/react";

export default function BasicInfo() {
  return (
    <SpotlightCard className="relative z-[2] border-slate-600 mt-10">
      <motion.div
        initial={{ opacity: 0, top: 10 }}
        animate={{ opacity: 1, top: 0 }}
        transition={{ duration: 1.5 }}
      >
        <div className="space-y-1">
          <h3 className="text-3xl font-medium leading-none">Haolic</h3>
          <p className="text-sm">WEB开发工程师</p>
        </div>
        <Separator className="my-4 bg-slate-600" />
        <div className="flex min-h-5 items-center gap-4 text-sm flex-wrap">
          <span className="flex items-center gap-1">
            <SVGReact className="w-4 h-4 text-[#087ea4]" />
            <span>React</span>
          </span>
          <span className="flex items-center gap-1">
            <SVGNextjs className="w-14" />
          </span>
          <span className="flex items-center gap-1">
            <SVGTailwindCSS className="w-4 text-[#00bcff]" />
            <span>Tailwind CSS</span>
          </span>
          <span className="flex items-center gap-1">
            <SVGNodejs className="w-12" />
          </span>
          <div className="flex items-center gap-1">
            <SVGMail className="w-4 text-[#D01D00]" />
            <span>faruxue2019@163.com</span>
          </div>
        </div>
      </motion.div>
    </SpotlightCard>
  );
}
