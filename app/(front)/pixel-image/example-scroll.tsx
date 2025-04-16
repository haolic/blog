import { cn } from "@/lib/utils";
import Image from "next/image";
import styles from "./example-scroll.module.css";

const ExampleScroll = () => {
  return (
    <div>
      <div className={cn("flex gap-2 h-24", styles.exampleList)}>
        <Image
          src={"/pixel-examples/merged-image0.jpg"}
          alt={"img"}
          width={39738}
          height={1124}
          className="max-w-[unset]"
        />
        <Image
          src={"/pixel-examples/merged-image0.jpg"}
          alt={"img"}
          width={39738}
          height={1124}
          className="max-w-[unset]"
        />
      </div>
      <div className={cn("flex gap-2 mt-2 h-24", styles.exampleList2)}>
        <Image
          src={"/pixel-examples/merged-image1.jpg"}
          alt={"img"}
          width={39738}
          height={1124}
          className="max-w-[unset]"
        />
        <Image
          src={"/pixel-examples/merged-image1.jpg"}
          alt={"img"}
          width={39738}
          height={1124}
          className="max-w-[unset]"
        />
      </div>
      <div className={cn("flex gap-2 mt-2 h-24", styles.exampleList3)}>
        <Image
          src={"/pixel-examples/merged-image2.jpg"}
          alt={"img"}
          width={39738}
          height={1124}
          className="max-w-[unset]"
        />
        <Image
          src={"/pixel-examples/merged-image2.jpg"}
          alt={"img"}
          width={39738}
          height={1124}
          className="max-w-[unset]"
        />
      </div>
    </div>
  );
};

export default ExampleScroll;
