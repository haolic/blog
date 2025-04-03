const draw = async ({
  pixels,
  container,
  width,
  height,
  pixelXNumber = 200,
  toGray = false,
}: {
  width: number;
  height: number;
  pixels: Array<{
    r: number;
    g: number;
    b: number;
    a: number;
    x: number;
    y: number;
  }>;
  container: HTMLDivElement;
  pixelXNumber: number;
  toGray?: boolean;
}) => {
  if (container.querySelector("canvas")) {
    container.removeChild(container.querySelector("canvas")!);
  }

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  canvas.style.width = `100%`;
  canvas.style.height = `100%`;
  canvas.style.objectFit = "contain";
  container.appendChild(canvas);

  const ctx = canvas.getContext("2d")!;

  let pixelSize = width / pixelXNumber;
  if (width < 100) {
    pixelSize = 3;
  } else {
    if (width > pixelXNumber) {
      pixelSize = Math.ceil(width / pixelXNumber);
    } else {
      pixelSize = 3;
    }
  }

  // 绘制像素
  for await (const [idx, pixel] of pixels.entries()) {
    if (toGray) {
      // 计算灰度值 - 使用加权平均法计算亮度
      // 人眼对绿色最敏感，对蓝色最不敏感，所以权重不同
      const grayValue = Math.round(
        0.299 * pixel.r + 0.587 * pixel.g + 0.114 * pixel.b
      );
      // 根据灰度值决定是黑色还是白色（阈值为128）
      const bwValue = grayValue < 128 ? 0 : 255;

      ctx.fillStyle = `rgba(${bwValue}, ${bwValue}, ${bwValue}, ${pixel.a})`;
    } else {
      ctx.fillStyle = `rgba(${pixel.r}, ${pixel.g}, ${pixel.b}, ${pixel.a})`;
    }

    await new Promise((resolve) => {
      ctx.fillRect(
        pixel.x,
        pixel.y,
        Math.max(pixelSize - 2, 2),
        Math.max(pixelSize - 2, 2)
      );
      if (idx % Math.ceil(pixels.length / 100) === 0) {
        setTimeout(() => {
          resolve(true);
        }, 1);
      } else {
        resolve(true);
      }
    });
  }
};

export default draw;
