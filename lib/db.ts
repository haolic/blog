import { sql } from '@vercel/postgres';
import dayjs from "dayjs";

// 初始化数据库表
export async function initDB() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS blogs (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        category TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;
  } catch (error) {
    console.error("数据库初始化失败:", error);
    throw new Error("数据库初始化失败");
  }
}

export async function addBlog(title: string, content: string, category: string) {
  try {
    const result = await sql`
      INSERT INTO blogs (title, content, category)
      VALUES (${title}, ${content}, ${category})
      RETURNING id
    `;
    return result.rows[0];
  } catch (error) {
    console.error("添加博客失败:", error);
    throw new Error("添加博客失败");
  }
}

export interface BlogItem {
  id: string;
  title: string;
  content: string;
  category: string;
  created_at: string;
}

export async function getAllBlogs() {
  try {
    const result = await sql`
      SELECT 
        category,
        json_agg(
          json_build_object(
            'id', id,
            'title', title,
            'content', content,
            'category', category,
            'created_at', created_at
          ) ORDER BY created_at DESC
        ) as blogs
      FROM blogs
      WHERE delete = false
      GROUP BY category
      ORDER BY category ASC
    `;
    return result.rows.map((row) => ({
      category: row.category as string,
      blogs: (row.blogs as BlogItem[]).map((blog) => ({
        ...blog,
        created_at: dayjs(blog.created_at)
          .add(8, "hour")
          .format("YYYY-MM-DD HH:mm:ss"),
      })),
    }));
  } catch (error) {
    console.error("获取博客列表失败:", error);
    return [];
  }
}

export async function getBlogById(id: string) {
  try {
    const result = await sql`
      SELECT * FROM blogs WHERE id = ${id}
    `;
    const blog = result.rows[0] as BlogItem;
    if (blog) {
      blog.created_at = dayjs(blog.created_at)
        .add(8, "hour")
        .format("YYYY-MM-DD HH:mm:ss");
    }
    return blog;
  } catch (error) {
    console.error("获取博客失败:", error);
    return null;
  }
}
