import Blog from "@/app/(front)/blog/[id]/page";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-[999]">
      <div className="fixed top-0 left-0 w-full h-full backdrop-blur-lg -z-10" />
      <div className="w-full h-full pt-14 overflow-auto">
        <Blog params={params} />
      </div>
    </div>
  );
};

export default Page;
