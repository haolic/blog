"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import Link from "next/link";
import BackSvg from "@/components/icons/BackSvg";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "标题不能为空",
  }),
  content: z.string().min(1, {
    message: "内容不能为空",
  }),
  category: z.string().min(1, {
    message: "分类不能为空",
  }),
});

export default function BlogAdd() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      category: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    if (!formData.title || !formData.content) {
      alert("标题和内容不能为空");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        toast("发布成功");
        setTimeout(() => {
          router.push("/blog");
        }, 1000);
      } else {
        throw new Error(data.error || "发布失败");
      }
    } catch (error) {
      console.error(error);
      toast("发布失败");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="font-styleFont w-full mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Link href="/blog">
          <BackSvg />
        </Link>
        <div>添加新博客</div>
      </h1>
      <Form {...form}>
        <form className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-72">
                <FormLabel>标题</FormLabel>
                <FormControl>
                  <Input placeholder="输入标题" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="w-48">
                <FormLabel>分类</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="选择分类" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="赶路">赶路</SelectItem>
                    <SelectItem value="墨者无疆">墨者无疆</SelectItem>
                    <SelectItem value="过往->当下">{"过往->当下"}</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => {
              return (
                <FormItem className="flex-1">
                  <FormLabel>内容</FormLabel>
                  <FormControl>
                    <Textarea placeholder="输入内容" {...field} rows={15} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </form>
        <div className="flex gap-2 justify-end mt-4">
          <Button variant="outline" onClick={() => router.push("/blog")}>
            取消
          </Button>
          {isSubmitting ? (
            <Button variant="outline" disabled>
              保存中...
            </Button>
          ) : (
            <Button onClick={() => form.handleSubmit(onSubmit)()}>保存</Button>
          )}
        </div>
      </Form>
    </div>
  );
}
