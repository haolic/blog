import { CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

const HomeassistantNext = () => {
  return (
    <div>
      <CardHeader>
        <CardTitle className="text-center">
          <span>Homeassistant-NEXT</span>
          <span>切换liangan</span>
        </CardTitle>
      </CardHeader>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 z-10">
        <Image
          src="/homeassistant-next/homeassistant-next-pc.png"
          alt="Homeassistant-NEXT"
          className="w-full"
          width={1000}
          height={500}
        />

        <Image
          src="/homeassistant-next/homeassistant-next-pc-cook.png"
          alt="Homeassistant-NEXT-cook"
          className="w-full"
          width={1000}
          height={500}
        />
      </div>
    </div>
  );
};

export default HomeassistantNext;
