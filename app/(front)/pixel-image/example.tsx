import SpotlightCard from "@/components/SpotlightCard";
import Image from "next/image";

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
];

export default function Example() {
  return (
    <div>
      <h1 className="text-4xl font-bold mt-12 text-cyan-300">探索像素艺术</h1>
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
