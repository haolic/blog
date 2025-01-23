import { NextResponse } from 'next/server';
import { deleteBlog, restoreBlog, updateBlogCategory } from '@/lib/db';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    if (!id) {
      return NextResponse.json(
        { error: '博客ID不能为空' },
        { status: 400 }
      );
    }

    await deleteBlog(id);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('删除博客失败:', error);
    return NextResponse.json(
      { error: '删除博客失败' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    if (!id) {
      return NextResponse.json(
        { error: '博客ID不能为空' },
        { status: 400 }
      );
    }

    const { category } = await request.json();

    if (category) {
      await updateBlogCategory(id, category);
      return NextResponse.json({ success: true });
    }

    await restoreBlog(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('更新博客失败:', error);
    return NextResponse.json(
      { error: '更新博客失败' },
      { status: 500 }
    );
  }
} 