"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BlogItem } from "@/lib/db";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import BackSvg from "@/components/icons/BackSvg";

const CATEGORIES = ["赶路", "墨者无疆", "过往->当下"];

export default function BlogManagement() {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);

  const fetchBlogs = async () => {
    try {
      const response = await fetch("/api/blog/list-flatten");
      const data = await response.json();
      if (data.success) {
        setBlogs(data.data);
      }
    } catch (error) {
      console.error("获取博客列表失败:", error);
      toast.error("获取博客列表失败");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.success) {
        toast.success("删除成功");
        fetchBlogs(); // 重新获取列表
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error("删除博客失败:", error);
      toast.error("删除博客失败");
    }
  };

  const handleRestore = async (id: string) => {
    try {
      const response = await fetch(`/api/blog/restore/${id}`, {
        method: "PATCH",
      });
      const data = await response.json();
      if (data.success) {
        toast.success("恢复成功");
        fetchBlogs(); // 重新获取列表
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error("恢复博客失败:", error);
      toast.error("恢复博客失败");
    }
  };

  const handleCategoryChange = async (id: string, category: string) => {
    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ category }),
      });
      const data = await response.json();
      if (data.success) {
        toast.success("更新分类成功");
        fetchBlogs(); // 重新获取列表
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error("更新分类失败:", error);
      toast.error("更新分类失败");
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <BackSvg href="/blog" />
        博客管理
      </h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>标题</TableHead>
            <TableHead>分类</TableHead>
            <TableHead>创建时间</TableHead>
            <TableHead>操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {blogs.map((blog) => (
            <TableRow key={blog.id}>
              <TableCell
                className={cn({
                  "line-through": blog.delete,
                  "text-gray-400": blog.delete,
                })}
              >
                {blog.title}
              </TableCell>
              <TableCell
                className={cn({
                  "text-gray-400": blog.delete,
                })}
              >
                <Select
                  defaultValue={blog.category}
                  disabled={blog.delete}
                  onValueChange={(value) =>
                    handleCategoryChange(blog.id, value)
                  }
                >
                  <SelectTrigger className="w-48 h-7 border-none shadow-none">
                    <SelectValue placeholder="选择分类" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell
                className={cn({
                  "line-through": blog.delete,
                  "text-gray-400": blog.delete,
                })}
              >
                {blog.created_at}
              </TableCell>
              <TableCell>
                {blog.delete ? (
                  <AlertDialog>
                    <AlertDialogTrigger className="text-green-500">
                      恢复  
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          确定要恢复这篇博客吗？
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          确定要恢复这篇博客吗？恢复后将可以正常访问。
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>取消</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleRestore(blog.id)}
                        >
                          恢复
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                ) : (
                  <AlertDialog>
                    <AlertDialogTrigger className="text-red-500">
                      删除
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          确定要删除这篇博客吗？
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          确定要删除这篇博客吗？删除后将无法恢复。
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>取消</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(blog.id)}
                        >
                          删除
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
