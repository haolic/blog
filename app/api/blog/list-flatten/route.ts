import { NextResponse } from 'next/server';
import { getAllBlogsFlatten, initDB } from '@/lib/db';

export async function GET() {
  try {
    // 确保数据库表已创建
    await initDB();
    
    const blogs = await getAllBlogsFlatten();
    return NextResponse.json({ success: true, data: blogs });
  } catch (error) {
    console.error('获取博客列表失败:', error);
    return NextResponse.json(
      { error: '获取博客列表失败' },
      { status: 500 }
    );
  }
} 