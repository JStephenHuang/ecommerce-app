import { useState, useEffect, useRef } from "react";
import SchoolSection from "./school-section";
import TypeSection from "./type-section";
import SizeSection from "./size-section";
import DescriptionSection from "./description-section";

const ProductInfo = () => {
  return (
    <div className="w-[50%] rounded-md my-5 p-5">
      <p className="text-[20px] font-bold mb-[1.5rem]">
        Product Information
        <hr className="w-full bg-[#521945] h-[2px]" />
      </p>
      <SchoolSection />
      <TypeSection />
      <SizeSection />
      <DescriptionSection />
    </div>
  );
};

export default ProductInfo;
