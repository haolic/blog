export const dynamic = "force-dynamic";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { getAllBlogs } from "@/lib/db";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import { ChartNoAxesGantt } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function BlogPage() {
  const blogs = await getAllBlogs();
  return (
    <div className="pt-24 w-full px-8">
      <Accordion
        type="multiple"
        defaultValue={blogs?.map((el) => el.category)}
        className="w-full"
      >
        {blogs?.map((el) => {
          return (
            <AccordionItem value={el.category} key={el.category}>
              <AccordionTrigger>{el.category}</AccordionTrigger>
              <AccordionContent>
                {el.blogs?.map(
                  (
                    blogItem: {
                      id: string;
                      title: string;
                      content: string;
                      created_at: string;
                    },
                    index: number
                  ) => {
                    return (
                      <Link
                        href={`/blog/${blogItem.id}`}
                        key={blogItem.id}
                        className={cn(
                          "block px-6 hover:decoration-gray-500 hover:underline",
                          {
                            "mt-6": index !== 0,
                          }
                        )}
                      >
                        <div className="flex justify-between items-center text-gray-500 font-styleFont">
                          <div>{blogItem.title}</div>
                          <div className="border-b border-dashed border-gray-400 flex-1 mx-6 opacity-20"></div>
                          <div>
                            {dayjs(blogItem.created_at).format(
                              "YYYY-MM-DD HH:mm"
                            )}
                          </div>
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
      <Link href="/blog-add" className="fixed bottom-20 right-24">
        <Button variant="outline" size="icon">
          <Plus />
        </Button>
      </Link>
      <Link href="/blog-management" className="fixed bottom-20 right-10">
        <Button variant="outline" size="icon">
          <ChartNoAxesGantt />
        </Button>
      </Link>
    </div>
  );
}
