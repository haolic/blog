import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 生成64字节（512位）的随机十六进制字符串（128字符长度）

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get("blog-management-auth-token");

  // 如果没有认证，重定向到登录页面
  if (!authToken?.value) {
    return NextResponse.rewrite(new URL("/auth-verify", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/(admin)/:path*",
    "/blog-management/:path*",
    "/blog-add/:path*",
    "/blog-edit/:path*",
  ],
};
