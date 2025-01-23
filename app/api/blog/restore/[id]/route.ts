import { restoreBlog } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  if (!id) {
    return NextResponse.json({ error: "博客ID不能为空" }, { status: 400 });
  }

  try {
    await restoreBlog(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("恢复博客失败:", error);
    return NextResponse.json({ error: "恢复博客失败" }, { status: 500 });
  }
}
