import Blog from "@/app/(front)/blog/[id]/page";
import Container from "./container";
const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-[999]">
      <div className="fixed top-0 left-0 w-full h-full backdrop-blur-lg -z-10" />
      <Container>
        <Blog params={params} />
      </Container>
    </div>
  );
};

export default Page;
