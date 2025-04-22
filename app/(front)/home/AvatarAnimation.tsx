import { cn } from "@/lib/utils";
import AvatarImg from "./AvatarImg";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCallback, useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const AvatarAnimation = ({ className }: { className?: string }) => {
  const avatarRef = useRef<HTMLDivElement>(null);

  const animation = useCallback(() => {
    if (!avatarRef.current) return;

    // 计算窗口宽度和高度，用于动画路径
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // 获取头像的初始位置
    const { width } = avatarRef.current.getBoundingClientRect();

    // 创建动画时间线
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "body", // 使用整个页面作为触发器
        start: "top+=200 top", // 当页面顶部向下滚动200px时开始
        end: "bottom bottom", // 当页面底部到达视口底部时结束
        scrub: 1, // 平滑跟随滚动，值越大越平滑
        markers: false, // 查看触发点（调试用）
        invalidateOnRefresh: true, // 刷新时重新计算触发器
      },
    });

    // 定义两段动画
    tl.to(avatarRef.current, {
      x: -(windowWidth / 2 - width * 0.5 - 2), // 先向右移动到窗口右侧
      duration: 0.3, // 占总滚动的前半部分
      ease: "power1.inOut",
    }).to(avatarRef.current, {
      x: -(windowWidth / 2 - width * 0.5 - 2), // 保持水平位置
      y: windowHeight - 38, // 向下移动到页面底部
      duration: 0.7, // 占总滚动的后半部分
      ease: "power1.inOut",
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useEffect(() => {
    const kill = animation();
    // 监听窗口大小变化
    return () => {
      kill?.();
    };
  }, [animation]);

  return (
    <div
      ref={avatarRef}
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
