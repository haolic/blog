"use client";

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="w-full h-full overflow-auto"
      onScroll={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  );
}
