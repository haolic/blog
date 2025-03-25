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
  theme,
}: {
  pixels: Array<Pixel>;
  width: number;
  height: number;
  ctx: CanvasRenderingContext2D;
  theme: "light" | "dark";
}) => {
  ctx.clearRect(0, 0, width, height);

  // 使用批量绘制，减少重绘次数
  const pixelSize = 5;
  if (theme === "light") {
    ctx.fillStyle = `#13c2c2`;
  } else {
    ctx.fillStyle = `#08979c`;
  }
  // 绘制像素
  for (let index = 0; index < pixels.length; index += 1) {
    const pixel = pixels[index];
    ctx.fillRect(pixel.x, pixel.y, pixelSize, pixelSize);
  }
};

export default draw;
