import { cn } from "@/lib/utils";
import AvatarImg from "./AvatarImg";

import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AvatarAnimation = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "fixed top-[4px] left-1/2 -translate-x-1/2 z-20",
        className
      )}
    >
      <AvatarImg width={28} height={28} />
    </div>
  );
};

export default AvatarAnimation;
