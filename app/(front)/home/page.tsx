import BasicInfo from "./BasicInfo";
import Avatar from "./Avatar";
import Squares from "@/components/Squares";
import { Separator } from "@/components/ui/separator";
import NFTs from "./NFTs";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full items-center justify-center gap-4 p-6">
      <Avatar />

      <BasicInfo />

      <Separator className="my-4 bg-slate-600" />

      <NFTs />

      <Squares />
    </div>
  );
}
