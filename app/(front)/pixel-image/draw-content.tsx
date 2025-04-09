"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";
import { getColorPixels } from "@/lib/utils";
import draw from "./draw";
import { Button } from "@/components/ui/button";
import { ImageDown, ImageUp, RotateCcw } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const accept = "image/png,image/jpeg,image/webp";

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

  const handleDraw = useCallback(() => {
    drawPixelImage({
      width: canvasRef.current!.width,
      height: canvasRef.current!.height,
      ctx: canvasRef.current!.getContext("2d")!,
      pixelXNumber,
      type: styleType,
    });
  }, [drawPixelImage, pixelXNumber, styleType]);

  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (items) {
        if (items[0].type.indexOf("image") !== -1) {
          const blob = items[0].getAsFile();
          if (blob) {
            setImage(blob);
            const canvas = canvasRef.current!;
            const ctx = canvas.getContext("2d")!;
            const reader = new FileReader();
            reader.onload = function (event) {
              const img = new Image();
              img.onload = function () {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
              };
              img.src = event.target?.result as string;
              setTimeout(() => {
                handleDraw();
              }, 100);
            };
            reader.readAsDataURL(blob);
          }
        }
      }
    };
    window.addEventListener("paste", handlePaste);
    return () => {
      window.removeEventListener("paste", handlePaste);
    };
  }, [handleDraw]);

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

  return (
    <div className="px-4">
      <div className="relative py-11 px-1 border-none rounded-3xl w-3/4 max-w-[800px] mx-auto mt-7 bg-gradient-to-br from-purple-400/5 via-purple-400/20 to-purple-400/5">
        <Input
          id="image-input"
          type="file"
          accept={accept}
          onChange={handleChange}
          className="hidden"
        />
        <div
          onClick={() => {
            const input = document.getElementById("image-input");
            input?.click();
          }}
          className={cn(
            "p-4 w-full rounded-3xl z-10 relative flex items-center justify-center gap-2 text-2xl cursor-pointer",
            {
              hidden: !!image,
            }
          )}
        >
          <ImageUp />
          上传图片
        </div>

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
            <div className="flex flex-col items-center gap-2 w-1/2 sm:flex-row">
              <span className="text-sm break-keep w-[75px] sm:text-right">
                水平像素数
              </span>
              <Input
                type="number"
                onChange={handlePixelNumberChange}
                className="flex-1"
                min={5}
                placeholder="像素数"
                value={pixelXNumber || ""}
              />
            </div>

            <div className="flex flex-col items-center gap-2 w-1/2 sm:flex-row">
              <span className="text-sm break-keep w-[75px] sm:text-right">
                风格
              </span>
              <RadioGroup
                value={styleType}
                onValueChange={handleRadioChange}
                className="flex"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="normal" id="normal-style" />
                  <Label htmlFor="normal-style" className="whitespace-nowrap">
                    正常
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="gray" id="gray-style" />
                  <Label htmlFor="gray-style" className="whitespace-nowrap">
                    黑白
                  </Label>
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
        className={cn(
          "max-w-[800px] h-[600px] flex justify-center items-center mt-7 mx-auto",
          {
            hidden: !image,
          }
        )}
        ref={containerRef}
      />
      {image && (
        <Button
          onClick={() => {
            const canvas = containerRef.current!.querySelector("canvas");
            const link = document.createElement("a");
            link.href = canvas!.toDataURL();
            link.download = `${image?.name}-pixel-${new Date().getTime()}.png`;
            link.click();
          }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white mt-6"
        >
          <ImageDown />
          下载生成的图片
        </Button>
      )}
    </div>
  );
}
