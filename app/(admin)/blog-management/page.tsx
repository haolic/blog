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
import { Trash2, ListRestart } from "lucide-react";

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
import BackSvg from "@/components/BackSvg";
import { CATEGORIES } from "@/constants";

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

  const stats = [
    { name: "总文章数", value: blogs.length },
    { name: "活跃文章", value: blogs.filter((b) => !b.delete).length },
    {
      name: "分类分布",
      value: CATEGORIES.map((c) => (
        <span key={c} className="text-base mr-4">
          {`${c}: ${blogs.filter((b) => b.category === c).length}`}
        </span>
      )),
    },
  ];

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <BackSvg />
        博客管理
      </h1>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {stats.map((stat) => (
          <div key={stat.name} className="border p-4 rounded-lg">
            <div className="text-gray-500 text-sm">{stat.name}</div>
            <div className="text-2xl font-bold">{stat.value}</div>
          </div>
        ))}
      </div>
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
                      <ListRestart size={18} />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          确定要恢复这篇博客吗？
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          恢复后将可以正常展示在文章列表中。
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
                      <Trash2 size={18} />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          确定要删除这篇博客吗？
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          删除后将不展示在博客列表中。
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
