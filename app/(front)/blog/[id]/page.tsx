import { BlogItem, getBlogById } from "@/lib/db";
import { MDXRemote } from "next-mdx-remote/rsc";
import "./mdxReset.css";

export default async function BlogDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = await params.id;
  const blog: BlogItem = await getBlogById(id);

  return (
    <div className="w-full p-6 font-[God-FangSongGBK-free]">
      <div className="text-2xl font-bold mb-6">
        <div>{blog.title}</div>
        <div className="text-gray-500 text-sm">
          {blog.category} | {blog.created_at}
        </div>
      </div>
      <div className="mdx-wrap">
        <MDXRemote source={blog.content} />
      </div>
    </div>
  );
}
