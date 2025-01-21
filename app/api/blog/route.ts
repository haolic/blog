import { NextResponse } from 'next/server';
import { addBlog } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { title, content, category } = await request.json();
    
    if (!title || !content) {
      return NextResponse.json(
        { error: '标题和内容不能为空' },
        { status: 400 }
      );
    }

    const result = addBlog(title, content, category);
    
    return NextResponse.json({ success: true, id: result.lastInsertRowid });
  } catch (error) {
    console.error('添加博客失败:', error);
    return NextResponse.json(
      { error: '添加博客失败' },
      { status: 500 }
    );
  }
} 