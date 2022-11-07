import { useEffect } from "react";
import SubNavbar from "../../sub-navbar/sub-navbar";
import Carousel from "./carousel";

const Slider = () => {
  return (
    <div className="w-full h-[30rem] bg-white flex flex-col items-center">
      <SubNavbar />
      <Carousel />
    </div>
  );
};

export default Slider;
