import { Button } from "@/components/ui/button";
import { CheckCheck, DraftingCompass, Feather, ImageDown } from "lucide-react";

export default function HowToUse() {
  return (
    <div className="max-w-[800px] mx-auto mt-20 text-left px-4 pb-14 relative">
      <div className="absolute -top-10 -left-10 text-purple-500 blur-lg pointer-events-none z-[-1]">
        <CheckCheck size={140} />
      </div>

      <div className="absolute bottom-10 right-10 text-pink-500 blur-xl pointer-events-none z-[-1]">
        <Feather size={140} />
      </div>
      <h1 className="text-5xl font-bold">如何使用像素风格图片生成器</h1>
      <p className="text-2xl text-gray-500 mt-4">
        简单两步，就可以生成像素化风格的图片。
      </p>
      <h2 className="text-3xl font-bold mt-16 flex items-center gap-2">
        <DraftingCompass
          size={30}
          className="text-purple-500 inline"
          strokeWidth={2.75}
        />
        上传您的图片
      </h2>
      <p className="text-xl text-gray-500 mt-4 px-10">
        点击“上传图片”按钮，选择您想要像素化的图片，生成器支持多种格式，包括png、jpg、webp等。
      </p>
      <h2 className="text-3xl font-bold mt-16 flex items-center gap-2">
        <ImageDown
          size={30}
          className="text-red-500 inline"
          strokeWidth={2.75}
        />
        下载生成的图片
      </h2>
      <p className="text-xl text-gray-500 mt-4 px-10">
        生成图片后，右键点击图片或点击图片下方
        <Button
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white h-6 mx-1"
          size="sm"
        >
          <ImageDown />
          下载生成的图片
        </Button>
        即可选择保存到您的电脑或手机，所有生成的像素风格图片都归您所有，可随意使用，用作社交头像，分享到社交媒体平台等。
      </p>
    </div>
  );
}
