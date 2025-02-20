"use client";

import { useRouter } from "next/navigation";

import { Undo2 } from "lucide-react";

export default function BackSvg(props: { className?: string }) {
  const { className } = props;
  const router = useRouter();
  return (
    <div
      onClick={() => router.back()}
      className={`${className} cursor-pointer`}
    >
      <Undo2 />
    </div>
  );
}
