import Database from "better-sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "public", "data.db");
let db: Database.Database;

try {
  db = new Database(dbPath);
  // 初始化数据库表
  db.exec(`
    CREATE TABLE IF NOT EXISTS blogs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      category TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
} catch (error) {
  console.error("数据库连接失败:", error);
  throw new Error("数据库连接失败");
}

export function addBlog(title: string, content: string, category: string) {
  try {
    const stmt = db.prepare(
      "INSERT INTO blogs (title, content, category) VALUES (?, ?, ?)"
    );
    return stmt.run(title, content, category);
  } catch (error) {
    console.error("添加博客失败:", error);
    throw new Error("添加博客失败");
  }
}

export function getAllBlogs() {
  try {
    const stmt = db.prepare(`
      SELECT 
        category,
        json_group_array(
          json_object(
            'id', id,
            'title', title,
            'content', content,
            'category', category,
            'created_at', created_at
          )
        ) as blogs
      FROM blogs 
      GROUP BY category
      ORDER BY category ASC
    `);

    interface BlogGroup {
      category: string;
      blogs: string;
    }

    const results = stmt.all() as BlogGroup[];
    // 解析每个分组中的 blogs JSON 字符串
    return results.map((group) => ({
      category: group.category,
      blogs: JSON.parse(group.blogs),
    }));
  } catch (error) {
    console.error("获取博客列表失败:", error);
    return [];
  }
}

export interface BlogItem {
  id: string;
  title: string;
  content: string;
  category: string;
  created_at: string;
}

export function getBlogById(id: string) {
  const stmt = db.prepare("SELECT * FROM blogs WHERE id = ?");
  return stmt.get(id) as BlogItem;
}

export default db;
