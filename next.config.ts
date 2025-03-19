module.exports = {
  // 渲染markdown, https://github.com/hashicorp/next-mdx-remote
  transpilePackages: ["next-mdx-remote"],
  images: {
    remotePatterns: [
      {
        hostname: "i.seadn.io",
      },
    ],
  },
};