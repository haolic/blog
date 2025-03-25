import BasicInfo from "./BasicInfo";
import Avatar from "./Avatar";
import Squares from "@/components/Squares";
import { Separator } from "@/components/ui/separator";
import NFTs from "./NFTs";
import Projects from "./Projects";
export default function HomePage() {
  return (
    <div className="pt-24 flex flex-col w-full items-center justify-center p-6">
      {
        // 全屏的滚动方格
      }
      <Squares />

      {
        // 头像
      }
      <Avatar />

      {
        // 基本信息
      }
      <BasicInfo />

      <Separator className="my-10 bg-slate-600" />

      {
        // NFTs
      }
      <NFTs />

      <Separator className="my-10 bg-slate-600" />

      {
        // 项目
      }
      <Projects />

      <Separator className="my-10 bg-slate-600" />
    </div>
  );
}
