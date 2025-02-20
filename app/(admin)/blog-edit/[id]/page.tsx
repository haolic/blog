import BlogAdd from "@/app/(admin)/blog-add/page";
import { getBlogById } from "@/lib/db";

export default async function BlogEdit({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const blog = await getBlogById(id);
  console.log(blog);
  return (
    <BlogAdd
      defaultValues={{
        title: blog?.title ?? "",
        content: blog?.content ?? "",
        category: blog?.category ?? "",
        id: blog?.id ?? "",
      }}
    />
  );
}
