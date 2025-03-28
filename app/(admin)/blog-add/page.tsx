"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Dot } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { useRouter } from "next/navigation";

import { Textarea } from "@/components/ui/textarea";
import { useActionState, useCallback, useEffect, useState } from "react";
import BackSvg from "@/components/BackSvg";
import { cn } from "@/lib/utils";
import { CATEGORIES } from "@/constants";

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
  id: z.union([z.string(), z.number()]).optional(),
});

export default function BlogAdd({
  defaultValues,
}: {
  defaultValues: z.infer<typeof formSchema>;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [draftUpdatedAt, setDraftUpdatedAt] = useState<number | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      category: "",
      id: "",
    },
  });

  useEffect(() => {
    let formModified = false;
    const subscription = form.watch(() => {
      setIsDirty(true);
      formModified = true;
    });

    // 添加页面离开确认
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (formModified) {
        e.preventDefault();
        e.returnValue = "您有未保存的表单数据，确定要离开吗？";
        return e.returnValue;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    const handleSaveDraft = () => {
      const values = form.getValues();
      localStorage.setItem(
        `blog-draft-${defaultValues?.id || ""}`,
        JSON.stringify(values)
      );

      const now = new Date().getTime();
      localStorage.setItem(
        `blog-draft-updated-at-${defaultValues?.id || ""}`,
        now.toString()
      );
      setDraftUpdatedAt(now);
      setIsDirty(false);
      formModified = false;
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };

    document.addEventListener("keydown", (e) => {
      // mac 系统
      if (navigator.userAgent.includes("Mac OS")) {
        if (e.key === "s" && e.metaKey) {
          e.preventDefault();
          handleSaveDraft();
        }
      } else {
        // windows 系统
        if (e.key === "s" && e.ctrlKey) {
          e.preventDefault();
          handleSaveDraft();
        }
      }
    });

    return () => {
      subscription.unsubscribe();
      document.removeEventListener("keydown", handleSaveDraft);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [form, defaultValues]);

  // 初始化表单
  const init = useCallback(async () => {
    const draft = localStorage.getItem(`blog-draft-${defaultValues?.id || ""}`);
    if (draft) {
      setOpen(true);
    } else {
      if (defaultValues) {
        form.reset(defaultValues);
      }
    }
  }, [defaultValues, form]);

  useEffect(() => {
    init();
  }, [init]);

  const cancelEditDraft = () => {
    setOpen(false);
    localStorage.removeItem(`blog-draft-${defaultValues?.id || ""}`);
    localStorage.removeItem(`blog-draft-updated-at-${defaultValues?.id || ""}`);

    if (defaultValues) {
      form.reset(defaultValues);
    }
  };

  const continueEditDraft = () => {
    setOpen(false);
    const draft = localStorage.getItem(`blog-draft-${defaultValues?.id || ""}`);
    const draftUpdatedAt = localStorage.getItem(
      `blog-draft-updated-at-${defaultValues?.id || ""}`
    );

    if (draft) {
      form.reset(JSON.parse(draft));
      if (draftUpdatedAt) {
        setDraftUpdatedAt(parseInt(draftUpdatedAt));
      }
    }
  };

  const saveNew = async (formData: z.infer<typeof formSchema>) => {
    const response = await fetch("/api/blog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    return await response.json();
  };

  const updateBlog = async (formData: z.infer<typeof formSchema>) => {
    const response = await fetch(`/api/blog/${defaultValues?.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    return await response.json();
  };

  // 2. Define a submit handler.
  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    if (!formData.title || !formData.content) {
      alert("标题和内容不能为空");
      return;
    }

    try {
      let data;
      if (!defaultValues?.id) {
        data = await saveNew(formData);
      } else {
        data = await updateBlog(formData);
      }
      if (data.success) {
        toast("发布成功");
        localStorage.removeItem(`blog-draft-${defaultValues?.id || ""}`);
        localStorage.removeItem(
          `blog-draft-updated-at-${defaultValues?.id || ""}`
        );
        setTimeout(() => {
          router.push("/blogs");
        }, 500);
      } else {
        throw new Error(data.error || "发布失败");
      }
    } catch (error) {
      console.error(error);
      toast("发布失败");
    }
  };

  const [, formAction, isPending] = useActionState(async () => {
    await form.handleSubmit(onSubmit, console.log)();
  }, null);

  return (
    <div className="font-styleFont w-full mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <BackSvg />
        <div>{defaultValues?.id ? "编辑博客" : "添加新博客"}</div>
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
              <FormItem className="space-y-3">
                <FormLabel>分类</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex flex-col space-y-1"
                  >
                    {CATEGORIES.map((el) => {
                      return (
                        <FormItem
                          key={el}
                          className="flex items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <RadioGroupItem value={el} />
                          </FormControl>
                          <FormLabel className="font-normal">{el}</FormLabel>
                        </FormItem>
                      );
                    })}
                  </RadioGroup>
                </FormControl>
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
                  <FormLabel>内容（Markdown）</FormLabel>
                  <FormControl>
                    <Textarea placeholder="输入内容" {...field} rows={15} />
                  </FormControl>
                  <FormMessage />
                  <FormDescription className="flex justify-between">
                    <a
                      href="https://daringfireball.net/projects/markdown/syntax"
                      target="_blank"
                      className="underline"
                    >
                      查看Markdown语法
                    </a>
                    {draftUpdatedAt && (
                      <span className="text-sm text-gray-500 flex items-center">
                        {
                          <Dot
                            className={cn(
                              "transition-all duration-300 relative",
                              {
                                "opacity-0": !isDirty,
                                "right-2": !isDirty,

                                "opacity-100": isDirty,
                                "right-0": isDirty,
                              }
                            )}
                          />
                        }
                        暂存于：
                        {new Date(draftUpdatedAt).toLocaleString()}
                      </span>
                    )}
                  </FormDescription>
                </FormItem>
              );
            }}
          />
          <div className="flex gap-2 justify-end mt-4">
            <Button
              variant="outline"
              onClick={() => router.push("/blogs")}
              disabled={isPending}
            >
              取消
            </Button>
            {isPending ? (
              <Button variant="outline" disabled>
                保存中...
              </Button>
            ) : (
              <Button formAction={formAction}>保存</Button>
            )}
          </div>
        </form>
      </Form>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>是否继续编辑草稿？</AlertDialogTitle>
            <AlertDialogDescription>
              检测到您之前保存的草稿，是否继续编辑？
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelEditDraft}>
              取消
            </AlertDialogCancel>
            <AlertDialogAction onClick={continueEditDraft}>
              继续编辑
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
