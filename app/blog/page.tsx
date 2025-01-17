import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

export default function BlogPage() {
  return (
    <div
      className="w-[700px]"
      style={{
        fontFamily:
          'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "system-ui", "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, SFProLocalRange',
      }}
    >
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
          <AccordionContent>是的，它遵循 WAI-ARIA 设计模式</AccordionContent>
          <AccordionContent>是的，它遵循 WAI-ARIA 设计模式</AccordionContent>
          <AccordionContent>是的，它遵循 WAI-ARIA 设计模式</AccordionContent>
          <AccordionContent>是的，它遵循 WAI-ARIA 设计模式</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>{"过往->当下"}</AccordionTrigger>
          <AccordionContent>是的，它遵循 WAI-ARIA 设计模式</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
