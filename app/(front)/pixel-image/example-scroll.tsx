import { cn } from "@/lib/utils";
import Image from "next/image";
import styles from "./example-scroll.module.css";

const imgList = [
  {
    original: "/pixel-examples/react.png",
    pixel: "/pixel-examples/react-pixel.png",
    pixelColor: "/pixel-examples/react-pixel-color.png",
  },
  {
    original: "/pixel-examples/vue.png",
    pixel: "/pixel-examples/vue-pixel.png",
    pixelColor: "/pixel-examples/vue-pixel-color.png",
  },
  {
    original: "/pixel-examples/nodejs.webp",
    pixel: "/pixel-examples/nodejs-pixel.png",
    pixelColor: "/pixel-examples/nodejs-pixel-color.png",
  },
  {
    original: "/pixel-examples/以太坊.png",
    pixel: "/pixel-examples/以太坊-pixel.png",
    pixelColor: "/pixel-examples/以太坊-pixel-color.png",
  },
  {
    original: "/pixel-examples/像.png",
    pixel: "/pixel-examples/像-pixel.png",
    pixelColor: "/pixel-examples/像-pixel.png",
  },
  {
    original: "/pixel-examples/素.png",
    pixel: "/pixel-examples/素-pixel.png",
    pixelColor: "/pixel-examples/素-pixel.png",
  },
  {
    original: "/pixel-examples/普京.png",
    pixel: "/pixel-examples/普京-pixel.png",
    pixelColor: "/pixel-examples/普京-pixel-color.png",
  },
  {
    original: "/pixel-examples/马斯克.png",
    pixel: "/pixel-examples/马斯克-pixel.png",
    pixelColor: "/pixel-examples/马斯克-pixel-color.png",
  },
  {
    original: "/pixel-examples/比特币.png",
    pixel: "/pixel-examples/比特币-pixel.png",
    pixelColor: "/pixel-examples/比特币-pixel-color.png",
  },
];

const renderList: string[] = [];

imgList.forEach((item) => {
  renderList.push(item.original, item.pixel, item.pixelColor);
});

const ExampleScroll = () => {
  const shuffledList = renderList.sort(() => Math.random() - 0.5);

  const shuffledList2 = [...shuffledList].sort(() => Math.random() - 0.5); // 第二个打乱
  const shuffledList3 = [...shuffledList].sort(() => Math.random() - 0.5); // 第三个打乱

  return (
    <div>
      <div className={cn("flex gap-2", styles.exampleList)}>
        {shuffledList.map((item, index) => (
          <Image
            key={`${item}1-1-${index}`}
            src={item}
            alt={item}
            width={100}
            height={100}
          />
        ))}
        {shuffledList.map((item, index) => (
          <Image
            key={`${item}1-2-${index}`}
            src={item}
            alt={item}
            width={100}
            height={100}
          />
        ))}
      </div>
      <div className={cn("flex gap-2 mt-2", styles.exampleList2)}>
        {shuffledList2.map((item, index) => (
          <Image
            key={`${item}2-1-${index}`}
            src={item}
            alt={item}
            width={100}
            height={100}
          />
        ))}
        {shuffledList2.map((item, index) => (
          <Image
            key={`${item}2-2-${index}`}
            src={item}
            alt={item}
            width={100}
            height={100}
          />
        ))}
      </div>
      <div className={cn("flex gap-2 mt-2", styles.exampleList3)}>
        {shuffledList3.map((item, index) => (
          <Image
            key={`${item}3-1-${index} `}
            src={item}
            alt={item}
            width={100}
            height={100}
          />
        ))}
        {shuffledList3.map((item, index) => (
          <Image
            key={`${item}3-2-${index}`}
            src={item}
            alt={item}
            width={100}
            height={100}
          />
        ))}
      </div>
    </div>
  );
};

export default ExampleScroll;
