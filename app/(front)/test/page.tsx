import Image from "next/image";

const Test = () => {
  return (
    <div>
      <div className="rounded-full flex pt-6">
        <div className="w-56 h-56 border rounded-full absolute"></div>
        <div className="w-56 h-56 rounded-full relative box-content m-auto group">
          <div className="w-56 h-[156px] absolute top-0 left-0 pt-11 -translate-y-11 overflow-hidden">
            <Image
              src="/avatar-bg-transparent.png"
              alt="bg"
              width={224}
              height={224}
              className="transition-all scale-97 group-hover:scale-125"
            />
          </div>
          <div className="w-56 h-28 absolute bottom-0 left-0 rounded-bl-full rounded-br-full overflow-hidden">
            <Image
              src="/avatar-bg-transparent.png"
              alt="bg"
              width={224}
              height={224}
              className="-translate-y-1/2 transition-all scale-97 group-hover:scale-125"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;
