import { useEffect, useState } from "react";
import SchoolSection from "./school-section";
import TypeSection from "./type-section";
import SizeSection from "./size-section";
import TitleSection from "./title-section";

interface ProductInfoProperties {
  selectSchool: React.RefObject<HTMLSelectElement>;
  selectSize: React.RefObject<HTMLSelectElement>;
  selectType: React.RefObject<HTMLSelectElement>;
  inputTitle: React.RefObject<HTMLInputElement>;
}

const ProductInfo = (props: ProductInfoProperties) => {
  return (
    <div className="w-[60%] rounded-md my-5 p-5">
      <p className="text-[20px] font-bold">Product Information</p>
      <hr className="w-full bg-[#521945] h-[2px] mb-[1.5rem]" />

      <SchoolSection selectValue={props.selectSchool} />

      <TypeSection selectValue={props.selectType} />

      <SizeSection selectValue={props.selectSize} />

      <TitleSection inputValue={props.inputTitle} />
    </div>
  );
};

export default ProductInfo;
