"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useCallback, useRef, useState } from "react";
import { getColorPixels } from "@/lib/utils";
import draw from "./draw";
import { Button } from "@/components/ui/button";
import { ImageUp, RotateCcw } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const accept = "image/png,image/jpeg,image/gif,image/webp";

export default function DrawContent() {
  const [image, setImage] = useState<File | null>(null);

  const [pixelXNumber, setPixelXNumber] = useState(50);

  const [styleType, setStyleType] = useState<"normal" | "gray">("normal");

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawPixelImage = useCallback(
    async ({
      width,
      height,
      ctx,
      pixelXNumber,
      type,
    }: {
      width: number;
      height: number;
      ctx: CanvasRenderingContext2D;
      pixelXNumber: number;
      type: "normal" | "gray";
    }) => {
      const pixels = await getColorPixels({
        width,
        height,
        ctx,
        pixelXNumber,
        styleType: type,
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

      if (!accept.includes(file.type)) {
        toast.error("不支持此类型的图片");
        return;
      }

      try {
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
          type: styleType,
        });
      } catch (error) {
        console.error("Error processing image:", error);
      }
    },
    [pixelXNumber, image, drawPixelImage, styleType]
  );

  const handlePixelNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pixelXNumber = parseInt(e.target.value);
    setPixelXNumber(pixelXNumber);
  };

  const handleRadioChange = (value: "normal" | "gray") => {
    setStyleType(value);
  };

  const handleDraw = () => {
    drawPixelImage({
      width: canvasRef.current!.width,
      height: canvasRef.current!.height,
      ctx: canvasRef.current!.getContext("2d")!,
      pixelXNumber,
      type: styleType,
    });
  };
  return (
    <>
      <div className="p-6 border-none rounded-3xl w-[800px] mx-auto mt-7 bg-violet-50 bg-opacity-30">
        <Input
          id="image-input"
          type="file"
          accept={accept}
          onChange={handleChange}
          className="hidden"
        />
        <Button
          onClick={() => {
            const input = document.getElementById("image-input");
            input?.click();
          }}
          variant="outline"
          className={cn("h-36 w-full rounded-3xl", {
            hidden: !!image,
          })}
        >
          <ImageUp />
          上传图片
        </Button>

        <div
          className={cn({
            hidden: !image,
          })}
        >
          <Button
            onClick={() => {
              const input = document.getElementById("image-input");
              input?.click();
            }}
            variant="outline"
            className="w-1/2"
          >
            <ImageUp />
            上传新图片
          </Button>
          <canvas
            ref={canvasRef}
            width={600}
            height={600}
            className="w-full object-contain max-h-[400px] mt-6"
          />

          <div className="flex flex-col items-center gap-2 mt-6">
            <div className="flex items-center gap-2 w-1/2">
              <span className="text-sm break-keep w-[75px] text-right">
                水平像素数
              </span>
              <Input
                type="number"
                onChange={handlePixelNumberChange}
                className="flex-1"
                min={5}
                placeholder="像素数"
                value={pixelXNumber}
              />
            </div>

            <div className="flex items-center gap-2 w-1/2">
              <span className="text-sm break-keep w-[75px] text-right">
                风格
              </span>
              <RadioGroup
                value={styleType}
                onValueChange={handleRadioChange}
                className="flex"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="normal" id="normal-style" />
                  <Label htmlFor="normal-style">正常</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="gray" id="gray-style" />
                  <Label htmlFor="gray-style">黑白</Label>
                </div>
              </RadioGroup>
            </div>
            <Button
              onClick={handleDraw}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white w-1/2 mt-6"
            >
              <RotateCcw />
              生成
            </Button>
          </div>
        </div>
      </div>

      <div
        className="w-full h-[600px] flex justify-center items-center mt-7"
        ref={containerRef}
      />
    </>
  );
}
