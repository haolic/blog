import BasicInfo from "./BasicInfo";
import Avatar from "./Avatar";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Avatar />

      <BasicInfo />
    </div>
  );
}
