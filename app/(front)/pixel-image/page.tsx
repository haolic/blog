import Introduce from "./intorduce";
import DrawContent from "./draw-content";
import Example from "./example";
import HowToUse from "./how-to-use";

const PixelImage = () => {
  return (
    <div className="w-full flex flex-col h-dvh box-border text-center bg-pink-200 bg-opacity-15 overflow-y-auto relative">
      <div className="min-h-28" />
      <Introduce />

      <DrawContent />

      <Example />

      <HowToUse />
    </div>
  );
};

export default PixelImage;
