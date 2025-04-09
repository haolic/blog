"use client";
import { cn } from "@/lib/utils";

import { useEffect, useMemo, useRef } from "react";
import * as monaco from "monaco-editor";
import { useTheme } from "next-themes";

const Monaco = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor>(null);

  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const language = className?.split("-")[1];
    const container = ref.current;
    if (!container) return;

    editorRef.current = monaco.editor.create(container, {
      theme: "vs-light", // 主题
      language, // 代码语言
      lineNumbers: "on", // 行号
      minimap: {
        enabled: false, // 小地图
      },
      value: children as string,
      readOnly: true, // 只读
      cursorWidth: 0, // 光标宽度
      readOnlyMessage: { value: "不可编辑" }, // 只读提示
      scrollBeyondLastColumn: 0, // 超出范围
      scrollBeyondLastLine: false, // 超出范围
      automaticLayout: true,
    });

    return () => {
      editorRef.current?.dispose();
    };
  }, [className, children]);

  useEffect(() => {
    if (resolvedTheme === "dark") {
      monaco.editor.setTheme("vs-dark");
    } else {
      monaco.editor.setTheme("vs-light");
    }
  }, [resolvedTheme]);

  const height = useMemo(() => {
    const lines = (children as string).split("\n");
    const lineCount = lines.length;
    const lineHeight = 18;
    return lineCount * lineHeight;
  }, [children]);

  return (
    <div
      ref={ref}
      className={cn("mt-1 border", className)}
      style={{ height }}
    />
  );
};
export default Monaco;
