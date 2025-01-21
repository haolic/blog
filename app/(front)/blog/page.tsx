import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { getAllBlogs } from "@/lib/db";

export default async function BlogPage() {
  const blogs = await getAllBlogs();
  console.log(blogs);

  return (
    <div className="w-[700px]">
      <Accordion type="single" collapsible className="w-full">
        {blogs?.map((el) => {
          return (
            <AccordionItem value={el.category} key={el.category}>
              <AccordionTrigger>{el.category}</AccordionTrigger>
              <AccordionContent>
                {el.blogs?.map(
                  (blogItem: {
                    id: string;
                    title: string;
                    content: string;
                    created_at: string;
                  }) => {
                    return (
                      <Link
                        href={`/blog/${blogItem.id}`}
                        key={blogItem.id}
                        className="mt-6 block"
                      >
                        <div className="flex justify-between items-center text-gray-500">
                          <div>{blogItem.title}</div>
                          <div className="border-b border-dashed border-gray-100 flex-1 mx-6"></div>
                          <div>{blogItem.created_at}</div>
                        </div>
                      </Link>
                    );
                  }
                )}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
