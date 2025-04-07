export default function Introduce() {
  return (
    <>
      <h1 className="inline m-auto text-2xl font-bold sticky top-1 z-10 bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-size-200 bg-no-repeat">
        像素化图片生成器
      </h1>

      <div className="text-sm text-gray-500 mt-7 max-w-[870px] text-center mx-auto bg-clip-text bg-gradient-to-br from-blue-600 to-purple-600 text-transparent">
        这是一个像素化图片生成器，你可以上传图片，然后生成像素化图片。
        一款将普通图片转化为像素艺术的创意工具，支持自定义像素密度。上传图片后，系统会智能分析色彩分布，生成风格独特的像素艺术效果，立即上传图片体验数字艺术的魅力吧！
      </div>
    </>
  );
}
