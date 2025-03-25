import { Pixel } from "./draw";

const getColorPixels = ({
  ctx,
  width,
  height,
}: {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
}) => {
  // 获取所有像素点
  const imageData = ctx.getImageData(0, 0, width, height);
  const pixels = imageData.data;
  const pixelArray: Pixel[] = [];

  // 增加步长，减少处理的像素数量
  for (let i = 0; i < height; i += 6) {
    for (let j = 0; j < width; j += 6) {
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
