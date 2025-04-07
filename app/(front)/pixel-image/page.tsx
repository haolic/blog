import Introduce from "./intorduce";
import DrawContent from "./draw-content";
import Example from "./example";

const PixelImage = () => {
  return (
    <div className="min-w-[800px] flex flex-col pb-14 w-full h-dvh box-border text-center bg-violet-100 bg-opacity-15 overflow-y-auto relative">
      <div className="min-h-28" />
      <Introduce />

      <DrawContent />

      <Example />
    </div>
  );
};

export default PixelImage;
