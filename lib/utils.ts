import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Pixel {
  x: number;
  y: number;
  r: number;
  g: number;
  b: number;
  a: number;
}

export const getColorPixels = async ({
  ctx,
  width,
  height,
  pixelXNumber = 200,
}: {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  pixelXNumber?: number;
}) => {
  // 获取所有像素点
  const imageData = ctx.getImageData(0, 0, width, height);
  const pixels = imageData.data;
  const pixelArray: Pixel[] = [];

  // 增加步长，减少处理的像素数量
  let step = 4;
  if (width < 100) {
    step = 1;
  } else {
    if (width > pixelXNumber) {
      step = Math.ceil(width / pixelXNumber);
    } else {
      step = 1;
    }
  }

  for (let i = 0; i < height; i += step) {
    for (let j = 0; j < width; j += step) {
      const index = (i * width + j) * 4;
      // 检查索引是否有效
      if (index >= pixels.length) continue;

      const [r, g, b, a] = [
        pixels[index],
        pixels[index + 1],
        pixels[index + 2],
        pixels[index + 3],
      ];
      if (r !== 0 || g !== 0 || b !== 0 || a !== 0) {
        pixelArray.push({
          x: j,
          y: i,
          r,
          g,
          b,
          a,
        });
      }
    }
  }

  return pixelArray;
};

export default getColorPixels;
