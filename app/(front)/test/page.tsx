import Image from "next/image";

const Test = () => {
  return (
    <div>
      <div className="rounded-full flex pt-6">
        <div className="w-[200px] h-[200px] border rounded-full absolute"></div>
        <div className="w-[200px] h-[200px] rounded-full relative box-content m-auto group">
          <div className="w-[200px] h-[200px] rounded-full overflow-hidden">
            <Image
              src="/avatar.jpg"
              alt="avatar"
              width={200}
              height={200}
              className="pointer-events-none"
            />
          </div>
          <div className="w-[200px] h-[156px] absolute top-0 left-0 pt-11 -translate-y-11 overflow-hidden">
            <Image
              src="/avatar-bg-transparent.png"
              alt="bg"
              width={200}
              height={200}
              className="transition-all scale-97 group-hover:scale-125 pointer-events-none"
            />
          </div>
          <div className="w-[200px] h-[100px] absolute bottom-0 left-0 rounded-bl-full rounded-br-full overflow-hidden">
            <Image
              src="/avatar-bg-transparent.png"
              alt="bg"
              width={200}
              height={200}
              className="-translate-y-1/2 transition-all scale-97 group-hover:scale-125 pointer-events-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;
