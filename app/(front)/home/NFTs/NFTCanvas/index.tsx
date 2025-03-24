"use client";
import { useCallback, useEffect, useRef } from "react";
import draw, { Pixel } from "./draw";
import getColorPixels from "./getColorPixels";
import { useTheme } from "next-themes";

const NFTCanvas = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const { resolvedTheme } = useTheme();

  const calcBodyScroll = useCallback(
    ({ pixels, theme }: { pixels: Array<Pixel>; theme: "light" | "dark" }) => {
      const wrapTop = wrapRef.current!.getBoundingClientRect().top;
      const range = [window.innerHeight / 2, window.innerHeight];
      const percent = Math.max(
        0,
        Math.min(1, (wrapTop - range[0]) / (range[1] - range[0]))
      );

      draw({
        pixels,
        width: canvas.current!.width,
        height: canvas.current!.height,
        ctx: canvas.current!.getContext("2d")!,
        percent: percent,
        wrapTop,
        theme,
      });
    },
    []
  );

  const init = useCallback(() => {
    canvas.current = wrapRef.current!.querySelector("canvas");

    if (!canvas.current) {
      canvas.current = document.createElement("canvas");
      canvas.current.width = wrapRef.current!.clientWidth * devicePixelRatio;
      canvas.current.height = wrapRef.current!.clientHeight * devicePixelRatio;
      canvas.current.style.width = `${wrapRef.current!.clientWidth}px`;
      canvas.current.style.height = `${wrapRef.current!.clientHeight}px`;

      wrapRef.current?.appendChild(canvas.current);
    }

    const ctx = canvas.current!.getContext("2d")!;
    const width = canvas.current!.width;
    const height = canvas.current!.height;

    ctx.clearRect(0, 0, width, height);

    const text = "N F T s";
    // 设置字体和填充样式
    ctx.font = `${devicePixelRatio * 48}px Noto Serif`;
    ctx.fillStyle = "black";

    const textWidth = ctx.measureText(text).width;
    ctx.fillText(text, (width - textWidth) / 2, 36 * devicePixelRatio);

    const pixels = getColorPixels({
      ctx,
      width,
      height,
    });
    return pixels;
  }, []);

  useEffect(() => {
    const pixels = init();

    const theme = resolvedTheme as "light" | "dark";

    const handleScroll = calcBodyScroll.bind(null, { pixels, theme });

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    calcBodyScroll({ pixels, theme });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [calcBodyScroll, init, resolvedTheme]);

  return (
    <div
      className="text-5xl absolute w-full h-full top-0 flex justify-center"
      ref={wrapRef}
    />
  );
};

export default NFTCanvas;
