import { CornerLeftUp } from "lucide-react";
import styles from "./intorduce.module.css";
import { cn } from "@/lib/utils";

export default function Introduce() {
  return (
    <div className="px-4">
      <div
        className={cn(
          "absolute top-10 left-1/2 w-0 text-yellow-500 blur-2xl pointer-events-none -rotate-100 z-[-1]",
          styles.bgColorPart
        )}
      >
        <CornerLeftUp size={200} />
      </div>
      <h1 className="inline m-auto text-5xl font-bold bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-size-200 bg-no-repeat">
        像素化图片生成器
      </h1>

      <div className="text-sm text-gray-500 mt-7 max-w-[870px] text-center mx-auto bg-clip-text bg-gradient-to-br from-blue-600 to-purple-600 text-transparent">
        这是一个像素化图片生成器，你可以上传图片，然后生成像素化图片。
        一款将普通图片转化为像素艺术的创意工具，支持自定义像素密度。上传图片后，系统会智能分析色彩分布，生成风格独特的像素艺术效果，立即上传图片体验数字艺术的魅力吧！
      </div>
    </div>
  );
}
