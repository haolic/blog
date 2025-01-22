"use client";
import { motion } from "motion/react";
import Link from "next/link";
import { IProjectItem } from "./projectData";
import PixelCard from "@/components/PixelCard";
import { cn } from "@/lib/utils";

interface ProjectItemProps {
  index: number;
  data: IProjectItem;
}

export default function ProjectItem(props: ProjectItemProps) {
  const { index, data } = props;
  return (
    <motion.div
      className="rounded-[40px] border bg-card text-card-foreground shadow p-8 w-full card-item [&.card-item:not(:first-child)]:mt-6 relative"
      initial={{ opacity: 0, left: index % 2 === 0 ? 10 : -5 }}
      animate={{ opacity: 1, left: 0 }}
    >
      <div className="flex gap-6">
        <PixelCard variant="blue">
          <Link
            href={data.url || "javascript:void(0)"}
            target={data.url ? "_blank" : undefined}
            className={cn(
              "w-[188px] h-full text-white flex-col justify-end p-3 pb-9 flex"
            )}
            style={{
              background:
                "linear-gradient(180deg, #DB4E66 0%, #A24688 40%, #4E3ABA 100%)",
            }}
          >
            <div className="bg-white w-5 h-5 rounded-full" />
            <div
              className={cn("text-2xl mt-4", {
                underline: data.url,
              })}
            >
              {data.title}
            </div>
            <div className="text-xs mt-2">{data.subTitle}</div>
          </Link>
        </PixelCard>

        <div className="flex-1 flex flex-col gap-4 justify-between">
          <div>
            <h4 className="text-lg font-bold">项目描述</h4>
            <div className="text-slate-500">{data.description}</div>
          </div>

          <div>
            <h4 className="text-lg font-bold">技术栈</h4>
            <div className="text-slate-500">
              {data.technologStack.join(",")}
            </div>
          </div>
          <div>
            <h4 className="text-lg font-bold">成就</h4>
            <div className="text-slate-500">{data.achievement}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
