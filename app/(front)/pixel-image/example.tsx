import SpotlightCard from "@/components/SpotlightCard";
import Image from "next/image";

import styles from "./example.module.css";
import { cn } from "@/lib/utils";
import { CornerLeftUp } from "lucide-react";

const imgWidth = 330;

const ExampleItem = ({
  originalUrl,
  pixelUrl,
  pixelColorUrl,
}: {
  originalUrl: string;
  pixelUrl: string;
  pixelColorUrl: string;
}) => {
  return (
    <div className="flex gap-6 justify-center mt-14">
      <div>
        <SpotlightCard className="p-0">
          <Image
            src={originalUrl}
            alt="原图"
            width={imgWidth}
            height={imgWidth}
          />
        </SpotlightCard>
        <div className="text-sm mt-4">原图</div>
      </div>
      <div>
        <SpotlightCard className="p-0">
          <Image
            src={pixelUrl}
            alt="像素化"
            width={imgWidth}
            height={imgWidth}
          />
        </SpotlightCard>
        <div className="text-sm mt-4">像素化-黑白</div>
      </div>
      <div>
        <SpotlightCard className="p-0">
          <Image
            src={pixelColorUrl}
            alt="像素化"
            width={imgWidth}
            height={imgWidth}
          />
        </SpotlightCard>
        <div className="text-sm mt-4">像素化-彩色</div>
      </div>
    </div>
  );
};

const exampleList = [
  {
    original: "/pixel-examples/dog.png",
    pixel: "/pixel-examples/dog-pixel.png",
    pixelColor: "/pixel-examples/dog-pixel-color.png",
  },
  {
    original: "/pixel-examples/panda.png",
    pixel: "/pixel-examples/panda-pixel.png",
    pixelColor: "/pixel-examples/panda-pixel-color.png",
  },
  {
    original: "/pixel-examples/long.png",
    pixel: "/pixel-examples/long-pixel.png",
    pixelColor: "/pixel-examples/long-pixel-color.png",
  },
  {
    original: "/pixel-examples/meimei.png",
    pixel: "/pixel-examples/meimei-pixel.png",
    pixelColor: "/pixel-examples/meimei-pixel-color.png",
  },
];

export default function Example() {
  return (
    <div className={cn(styles.example, "pb-14 px-4 relative")}>
      <div
        className={cn(
          "absolute top-10 left-1/2 text-purple-500 blur-2xl pointer-events-none -rotate-100 z-[-1]",
          styles.bgColorPart
        )}
      >
        <CornerLeftUp size={200} />
      </div>
      <div className="absolute top-96 left-1/3 text-purple-500 blur-2xl pointer-events-none -rotate-100 z-[-1]">
        <CornerLeftUp size={200} />
      </div>

      <h1 className="text-4xl font-bold mt-12 text-cyan-300">探索像素艺术</h1>
      <p className="text-sm text-gray-500 mt-4">
        以下是一些像素化图片的示例，你可以上传自己的图片，预览像素化效果。
      </p>
      {exampleList.map((item) => (
        <ExampleItem
          key={item.original}
          originalUrl={item.original}
          pixelUrl={item.pixel}
          pixelColorUrl={item.pixelColor}
        />
      ))}
    </div>
  );
}
