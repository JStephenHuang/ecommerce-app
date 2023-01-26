import Carousel from "./carousel";

const Slider = () => {
  return (
    <div className="w-full h-[25rem] bg-black flex flex-col items-center mb-5">
      <img className="w-full h-full" alt="" />
      <Carousel />
    </div>
  );
};

export default Slider;
