"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useCallback, useRef } from "react";
import { useEffect } from "react";
import styles from "./NFTs.module.css";

const NFTCard = ({ title, src }: { title: string; src: string }) => {
  return (
    <Card className="flex flex-col bg-transparent border-slate-600">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent className="flex justify-center items-center m-auto">
        <Image
          src={src}
          alt="NFT"
          width={200}
          height={200}
          className="border"
        />
      </CardContent>
    </Card>
  );
};

const NFTGallery = () => {
  const wrapRef = useRef<HTMLDivElement>(null);

  const calcBodyScroll = useCallback(() => {
    const scrollY = window.scrollY;
    // 控制200-550的高度的动画。
    if (scrollY > 550) {
      wrapRef.current?.style.setProperty("--delay", "-99s");
    } else if (scrollY <= 550 && scrollY >= 200) {
      wrapRef.current?.style.setProperty(
        "--delay",
        `-${((scrollY - 200) / (550 - 200)) * 99}s`
      );
    } else if (scrollY < 200) {
      wrapRef.current?.style.setProperty("--delay", "0s");
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", calcBodyScroll);
    calcBodyScroll();
    return () => {
      window.removeEventListener("scroll", calcBodyScroll);
    };
  }, [calcBodyScroll]);

  return (
    <div className="flex relative z-10 gap-4" ref={wrapRef}>
      <NFTCard
        title="Blockvatar #29910"
        src="https://i.seadn.io/gae/LUK2kkRE0XdIYD9sTWK8rlDpitA5GmT9bPByKlyKnA2WGbLQ_TdINXMJoGUMYIuiis01G9ZCT_HA9-zmSOgmGeVexAkAiuqZx5JUnw?auto=format&dpr=1&w=500"
      />
      <div className={cn("self-center text-4xl", styles["nft-gallery-title"])}>
        NFTs
      </div>
      <NFTCard
        title="Your First NFT"
        src="https://i.seadn.io/gae/54vL8I8S5UltzgfgSxnkpdMw_m36U4hSwstGC8tGJZasy0tdcSecYE52P-WEV-I1T-zaY-nrGz4YxkhCX1SfU-Dr459FX2zAQQWiyw?auto=format&dpr=1&w=500"
      />
    </div>
  );
};

export default NFTGallery;
