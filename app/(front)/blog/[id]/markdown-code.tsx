"use client";

import dynamic from "next/dynamic";

const Monaco = dynamic(() => import("./monaco"), { ssr: false });

const MarkdownCode = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return <Monaco className={className}>{children}</Monaco>;
};
export default MarkdownCode;
