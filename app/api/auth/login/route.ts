import { NextResponse } from "next/server";

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "123456";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // 验证用户名和密码
    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: "用户名或密码错误" },
        { status: 401 }
      );
    }

    // 创建响应
    const response = NextResponse.json({ success: true });
    
    // 设置登录状态 cookie
    response.cookies.set({
      name: 'blog-management-auth-token',
      value: '@#8ddU&^iewff8xv2',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
      sameSite: 'lax',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    return response;
  } catch (error) {
    console.error("登录失败:", error);
    return NextResponse.json(
      { error: "登录失败" },
      { status: 500 }
    );
  }
} 