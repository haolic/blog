import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

const NFTCard = ({ title, src }: { title: string; src: string }) => {
  return (
    <Card className="flex flex-col bg-transparent border-slate-600">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center items-center m-auto">
        <Image src={src} alt="NFT" width={200} height={200} className="border" />
      </CardContent>
    </Card>
  );
};

const NFTGallery = () => {
  return (
    <div className="flex gap-14 relative z-10">
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
