"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useCallback, useRef, useState } from "react";
import { getColorPixels } from "@/lib/utils";
import draw from "./draw";
import { Button } from "@/components/ui/button";

const PixelImage = () => {
  const [image, setImage] = useState<File | null>(null);

  const [pixelXNumber, setPixelXNumber] = useState(50);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawPixelImage = useCallback(
    async ({
      width,
      height,
      ctx,
      pixelXNumber,
    }: {
      width: number;
      height: number;
      ctx: CanvasRenderingContext2D;
      pixelXNumber: number;
    }) => {
      const pixels = await getColorPixels({
        width,
        height,
        ctx,
        pixelXNumber,
      });

      draw({
        width,
        height,
        pixels,
        container: containerRef.current!,
        pixelXNumber,
      });
    },
    []
  );

  const handleChange = useCallback(
    async (e?: React.ChangeEvent<HTMLInputElement>) => {
      const file = e?.target.files?.[0] || image;
      if (!file) return;

      if (file) {
        setImage(file);
        const canvas = canvasRef.current!;

        const ctx = canvas.getContext("2d")!;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const img = document.createElement("img");

        img.src = URL.createObjectURL(file);
        img.style.objectFit = "contain";
        await new Promise((resolve) => {
          img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            resolve(true);
          };
        });

        drawPixelImage({
          width: canvas.width,
          height: canvas.height,
          ctx,
          pixelXNumber,
        });
      }
    },
    [pixelXNumber, image, drawPixelImage]
  );

  const handlePixelNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pixelXNumber = parseInt(e.target.value);
    setPixelXNumber(pixelXNumber);
  };

  const handleDraw = () => {
    drawPixelImage({
      width: canvasRef.current!.width,
      height: canvasRef.current!.height,
      ctx: canvasRef.current!.getContext("2d")!,
      pixelXNumber,
    });
  };

  return (
    <div className="grid grid-cols-2 gap-4 p-4 pt-24 w-full h-dvh box-border">
      <Card className="relative flex flex-col">
        <CardHeader>
          <CardTitle className="flex items-center justify-center gap-2">
            <div className="min-w-[100px]">原始图片</div>
            <Input
              type="file"
              accept=".png,.jpg,.jpeg,.gif"
              onChange={handleChange}
            />
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-1 h-0">
          <div
            className={cn(
              "w-full h-[400px] relative transition-all duration-300 flex justify-center items-center"
            )}
          >
            <canvas
              ref={canvasRef}
              width={600}
              height={600}
              className={cn("w-full h-full object-contain", {
                "opacity-0": !image,
                "opacity-100": image,
              })}
            ></canvas>
            <div
              className={cn(
                "absolute top-0 left-0 w-full h-full flex justify-center items-center",
                {
                  "opacity-0": image,
                  "opacity-100": !image,
                }
              )}
            >
              <div className="text-2xl font-bold opacity-50">请上传图片</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="relative flex flex-col">
        <CardHeader>
          <CardTitle className="h-9 flex items-center justify-between">
            <span>Pixel Image</span>
            <div className="flex items-center gap-2">
              <span className="text-sm break-keep">水平像素数</span>
              <Input
                type="number"
                onChange={handlePixelNumberChange}
                className="w-20"
              />
              <Button onClick={handleDraw}>生成</Button>
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-1 h-0 relative">
          <div
            className="w-full h-[400px] flex justify-center items-center"
            ref={containerRef}
          ></div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PixelImage;
