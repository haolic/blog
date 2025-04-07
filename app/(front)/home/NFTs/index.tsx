import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import NFTCanvas from "./NFTCanvas";
import SpotlightCard from "@/components/SpotlightCard";

const NFTCard = ({ title, src }: { title: string; src: string }) => {
  return (
    <SpotlightCard className="p-0 select-none flex flex-col">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent className="flex justify-center items-center m-auto">
        <Image
          src={src}
          alt="NFT"
          width={200}
          height={200}
          className="border pointer-events-none"
        />
      </CardContent>
    </SpotlightCard>
  );
};

const NFTGallery = () => {
  return (
    <div className="relative flex justify-around z-10 gap-4 w-full pt-20">
      <NFTCanvas />

      <NFTCard
        title="Blockvatar #29910"
        src="https://i.seadn.io/gae/LUK2kkRE0XdIYD9sTWK8rlDpitA5GmT9bPByKlyKnA2WGbLQ_TdINXMJoGUMYIuiis01G9ZCT_HA9-zmSOgmGeVexAkAiuqZx5JUnw?auto=format&dpr=1&w=500"
      />
      <NFTCard
        title="Your First NFT"
        src="https://i.seadn.io/gae/54vL8I8S5UltzgfgSxnkpdMw_m36U4hSwstGC8tGJZasy0tdcSecYE52P-WEV-I1T-zaY-nrGz4YxkhCX1SfU-Dr459FX2zAQQWiyw?auto=format&dpr=1&w=500"
      />
    </div>
  );
};

export default NFTGallery;
