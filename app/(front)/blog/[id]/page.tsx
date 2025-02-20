import { getBlogById } from "@/lib/db";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { Pencil } from "lucide-react";
import markdownComponents from "./markdownComponents";

import BackSvg from "@/components/BackSvg";

import "katex/dist/katex.min.css";
import Link from "next/link";

export default async function BlogDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const blog = await getBlogById(id);

  const category = blog?.category;

  return (
    <div
      className={cn("max-w-[800px] mx-auto p-6 font-styleFont", {
        "w-full": category !== "墨者无疆",
        "text-center": category === "墨者无疆",
      })}
    >
      <BackSvg className="fixed top-10 left-6" />

      <div className="text-2xl font-bold mb-6">
        <div>{blog?.title}</div>
        <div className="text-gray-500 text-sm">
          {blog?.category} | {blog?.created_at}
        </div>
      </div>
      <div
        className={cn("mdx-wrap", {
          "text-xl font-bold": category === "墨者无疆",
          "[&>p]:[text-indent:2em]": category === "赶路",
        })}
      >
        <ReactMarkdown
          components={markdownComponents}
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeKatex]}
        >
          {blog?.content || ""}
        </ReactMarkdown>
      </div>
      <Link
        href={`/blog-edit/${id}`}
        className="text-center mt-6 rounded-full border border-gray-200 w-10 h-10 flex justify-center items-center shadow-sm fixed bottom-20 right-24"
      >
        <Pencil />
      </Link>
    </div>
  );
}
