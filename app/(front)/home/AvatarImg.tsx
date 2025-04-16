import { cn } from "@/lib/utils";
import Image from "next/image";

const AvatarImg = ({
  width = 200,
  height = 200,
  className,
}: {
  width?: number;
  height?: number;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "rounded-full relative box-content m-auto group :hover:scale-95",
        className
      )}
      style={{
        width,
        height,
      }}
    >
      <div
        className="rounded-full overflow-hidden pointer-events-none"
        style={{
          width,
          height,
        }}
      >
        <Image
          src="/avatar.jpg"
          alt="avatar"
          width={width}
          height={height}
          className="pointer-events-none"
        />
      </div>

      <div
        className="absolute top-0 left-0 overflow-hidden pointer-events-none"
        style={{
          paddingTop: height * 0.4,
          transform: `translateY(-${height * 0.4}px)`,
          width,
          height: height / 2 + height * 0.6,
        }}
      >
        <Image
          src="/avatar-bg-transparent.png"
          alt="bg"
          width={width}
          height={height}
          className="transition-all scale-97 group-hover:scale-125 pointer-events-none"
        />
      </div>
      <div
        className="absolute bottom-0 left-0 rounded-bl-full rounded-br-full overflow-hidden pointer-events-none"
        style={{
          width,
          height: height / 2,
        }}
      >
        <Image
          src="/avatar-bg-transparent.png"
          alt="bg"
          width={width}
          height={height}
          className="-translate-y-1/2 transition-all scale-97 group-hover:scale-125 pointer-events-none"
        />
      </div>
    </div>
  );
};

export default AvatarImg;
