# Next.js 博客系统

这是一个使用 Next.js 构建的现代化博客系统，支持前台展示和后台管理功能。

## 功能特点

- 😈个人基本信息展示页面
- 📝 博客文章的创建、编辑、删除和恢复
- 👥 前台博客展示界面
- 🔧 后台管理系统

## 技术栈

- Next.js 15
- TypeScript
- Tailwind CSS
- shadcn/ui
- reactbits.dev
- PostgreSQL
- Vercel
## 项目结构

```
app/
├── (admin)/                # 后台管理相关页面
│   ├── blog-management/    # 博客管理
│   └── blog-add/          # 添加博客
├── (front)/               # 前台展示相关页面
│   └── blog/              # 博客列表和详情
├── api/                   # API 路由
├── globals.css           # 全局样式
├── layout.tsx            # 全局布局
├── page.tsx             # 首页
└── favicon.ico          # 网站图标

lib/                    # 工具函数和配置
├── db.ts               # 数据库配置和操作
└── utils.ts            # 通用工具函数

public/                 # 静态资源目录

# 配置文件
├── .gitignore        # Git 忽略配置
├── components.json   # 组件配置
├── next.config.ts    # Next.js 配置
├── package.json      # 项目依赖配置
├── postcss.config.mjs # PostCSS 配置
├── tailwind.config.ts # Tailwind CSS 配置
└── tsconfig.json     # TypeScript 配置
```

## 开始使用

### 1. 克隆项目
```bash
git clone [项目地址]
cd blog
```

### 2. 安装依赖
```bash
pnpm install
# 或
yarn install
```

### 3. 创建并连接数据库
确保已安装并启动数据库服务 
https://vercel.com/docs/storage/vercel-postgres

### 4. 启动开发服务器
```bash
pnpm run dev
# 或
yarn dev
```

访问 http://localhost:3000 查看博客前台
访问 http://localhost:3000/blog-management 进入后台管理

### 5. 构建并启动
```bash
pnpm run build && pnpm run start
# 或
yarn build && yarn start
```
访问 http://localhost:3000 查看博客前台
访问 http://localhost:3000/blog-management 进入后台管理

## 部署

项目可以部署到 Vercel 等平台：

https://vercel.com/

## 许可证

MIT
