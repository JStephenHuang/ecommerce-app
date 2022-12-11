import { useEffect } from "react";
import SubNavbar from "../../sub-navbar/sub-navbar";
import Carousel from "./carousel";

const Slider = () => {
  return (
    <div className="w-full h-[30rem] bg-blue-200 flex flex-col items-center mb-5">
      <SubNavbar />
      <Carousel />
    </div>
  );
};

export default Slider;
