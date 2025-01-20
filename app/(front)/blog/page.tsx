import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

export default function BlogPage() {
  return (
    <div className="w-[700px]">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>赶路</AccordionTrigger>
          <AccordionContent>是的，它遵循 WAI-ARIA 设计模式</AccordionContent>
          <AccordionContent>
            <Link href="/blog/1">是的，它遵循 WAI-ARIA 设计模式</Link>
          </AccordionContent>
          <AccordionContent>是的，它遵循 WAI-ARIA 设计模式</AccordionContent>
          <AccordionContent>是的，它遵循 WAI-ARIA 设计模式</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>墨者无疆</AccordionTrigger>
          <AccordionContent>第一首诗</AccordionContent>
          <AccordionContent>第一首诗</AccordionContent>
          <AccordionContent>第一首诗</AccordionContent>
          <AccordionContent>第一首诗</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>{"过往->当下"}</AccordionTrigger>
          <AccordionContent>
            <Link href="/blog/1">
              <div className="flex justify-between items-center">
                <div>交付年</div>
                <div className="border-b border-dashed border-gray-100 flex-1 mx-6"></div>
                <div>2024-01-01</div>
              </div>
            </Link>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
