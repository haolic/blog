import BasicInfo from "./BasicInfo";
import Avatar from "./Avatar";
import Squares from "@/components/Squares";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 pb-6">
      <Avatar />

      <BasicInfo />

      <Squares />
    </div>
  );
}
