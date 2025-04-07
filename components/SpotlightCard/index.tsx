"use client";

import { cn } from "@/lib/utils";
import { useCallback, useRef, useState } from "react";
import styles from "./index.module.css";

const rotateMaxDeg = 25;

const SpotlightCard = ({
  children,
  className = "",
  spotlightColor = "rgba(0, 200, 200)",
}: {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!divRef.current) return;

      const rect = divRef.current.getBoundingClientRect();
      const { width, height, left, top } = rect;
      const x = e.clientX - left;
      const y = e.clientY - top;

      const xPercent = x / width;
      const yPercent = y / height;

      divRef.current.style.setProperty(
        "--rotateY",
        `${xPercent * rotateMaxDeg - rotateMaxDeg / 2}deg`
      );
      divRef.current.style.setProperty(
        "--rotateX",
        `${-(yPercent * rotateMaxDeg - rotateMaxDeg / 2)}deg`
      );

      const hueRotateX = xPercent * 180;
      const hueRotateY = yPercent * 180;
      divRef.current.style.setProperty(
        "--hue-rotate",
        `${hueRotateX + hueRotateY}deg`
      );

      spotlightRef.current!.style.setProperty(
        "background",
        `radial-gradient(circle at ${x}px ${y}px, ${spotlightColor}, transparent 80%)`
      );
    },
    [spotlightColor]
  );

  const handleMouseEnter = () => {
    setOpacity(0.3);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={
        {
          "--rotateX": "10deg",
          "--rotateY": "10deg",
          "--hue-rotate": "0deg",
        } as React.CSSProperties
      }
      className={cn(
        "relative rounded-3xl border border-neutral-400 overflow-hidden p-8 hover:shadow-2xl",
        className,
        styles.spotlightCard
      )}
    >
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out"
        style={{
          opacity,
          filter: "hue-rotate(var(--hue-rotate))",
          background: `radial-gradient(circle at 0px 0px, ${spotlightColor}, transparent 50%)`,
        }}
      />
      {children}
    </div>
  );
};
export default SpotlightCard;
