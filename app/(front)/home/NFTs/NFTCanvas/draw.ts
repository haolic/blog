"use client";

export interface Pixel {
  x: number;
  y: number;
  r: number;
  g: number;
  b: number;
  a: number;
}

const draw = async ({
  pixels,
  width,
  height,
  ctx,
  percent,
  theme,
  wrapTop,
}: {
  pixels: Array<Pixel>;
  width: number;
  height: number;
  ctx: CanvasRenderingContext2D;
  percent: number;
  theme: "light" | "dark";
  wrapTop: number;
}) => {
  ctx.clearRect(0, 0, width, height);

  // 计算需要绘制的像素数量
  const pixelsToRender = Math.floor(pixels.length * (1 - percent));

  // 使用批量绘制，减少重绘次数
  const pixelSize = 4;

  // 绘制像素
  for (let index = 0; index < pixels.length; index += 1) {
    const pixel = pixels[index];

    if (index < pixelsToRender) {
      if (theme === "light") {
        ctx.fillStyle = `rgba(${pixel.r}, ${pixel.g}, ${pixel.b}, ${0.5})`;
      } else {
        ctx.fillStyle = `rgba(255, 255, 255, ${0.5})`;
      }
      ctx.fillRect(pixel.x, pixel.y, pixelSize, pixelSize);
    } else {
      let y = (window.innerHeight - wrapTop) * devicePixelRatio - 20;

      y = y < 0 ? 0 : y;

      if (theme === "light") {
        ctx.fillStyle = `rgba(${pixel.r}, ${pixel.g}, ${pixel.b}, ${0.1})`;
      } else {
        ctx.fillStyle = `rgba(255, 255, 255, ${0.1})`;
      }
      ctx.fillRect(pixel.x, y, pixelSize + 10, pixelSize + 10);
    }
  }
};

export default draw;
