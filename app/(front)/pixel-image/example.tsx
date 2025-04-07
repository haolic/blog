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
        <Image
          src={originalUrl}
          alt="原图"
          width={imgWidth}
          height={imgWidth}
          className="rounded-3xl"
        />
        <div className="text-sm mt-4">原图</div>
      </div>
      <div>
        <Image
          src={pixelUrl}
          alt="像素化"
          width={imgWidth}
          height={imgWidth}
          className="rounded-3xl"
        />
        <div className="text-sm mt-4">像素化-黑白</div>
      </div>
      <div>
        <Image
          src={pixelColorUrl}
          alt="像素化"
          width={imgWidth}
          height={imgWidth}
          className="rounded-3xl"
        />
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
