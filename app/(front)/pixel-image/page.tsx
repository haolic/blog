"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";
import { getColorPixels } from "@/lib/utils";
import draw from "./draw";

const PixelImage = () => {
  const [image, setImage] = useState<File | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
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

      setImage(file);
      const pixelXNumber = 50;

      const pixels = await getColorPixels({
        width: canvas.width,
        height: canvas.height,
        ctx,
        pixelXNumber,
      });

      draw({
        width: canvas.width,
        height: canvas.height,
        pixels,
        container: containerRef.current!,
        pixelXNumber,
      });
    }
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
          <CardTitle className="h-9">Pixel Image</CardTitle>
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
