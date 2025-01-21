import { BlogItem, getBlogById } from "@/lib/db";
import { MDXRemote } from "next-mdx-remote/rsc";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import BackSvg from "@/components/icons/BackSvg";

import "./mdxReset.css";

export default async function BlogDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = await params.id;
  const blog: BlogItem = await getBlogById(id);

  const category = blog?.category;

  return (
    <div
      className={cn("max-w-[800px] mx-auto p-6 font-[God-FangSongGBK-free]", {
        "w-full": category !== "墨者无疆",
        "text-center": category === "墨者无疆",
      })}
    >
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="fixed top-6 left-6">
              <Link href="/blog">
                <BackSvg />
              </Link>
            </div>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>返回</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div className="text-2xl font-bold mb-6">
        <div>{blog?.title}</div>
        <div className="text-gray-500 text-sm">
          {blog?.category} | {blog?.created_at}
        </div>
      </div>
      <div className="mdx-wrap">
        <MDXRemote source={blog?.content} />
      </div>
    </div>
  );
}
