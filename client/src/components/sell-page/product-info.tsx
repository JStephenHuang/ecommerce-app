import { useRef } from "react";
import Select from "react-select";

import DropDown from "./dropdown";

const ProductInfo = () => {
  const selectSchoolRef = useRef(null);
  return (
    <div className="w-[50%] rounded-md my-5 p-5 bg-white border border-[#912F56]">
      <p className="text-[20px] font-bold mb-[1.5rem]">Product Information</p>
      <div className="container">
        <p className="text-[16px] font-bold">School</p>
      </div>
      <div className="container">
        <div>
          <p className="text-[16px] font-bold">Product type</p>
          <p className="text-[12px]">Polo, T-shirt, Skirt, etc</p>
        </div>
      </div>
      <div className="flex justify-between mb-[1.5rem]">
        <p className="text-[16px] font-bold">Size</p>
      </div>
      <div className="flex justify-between mb-[1.5rem]">
        <p className="text-[16px] font-bold">Description</p>
        <textarea
          className="w-[60%] border rounded-md resize-none p-2"
          rows={5}
        ></textarea>
      </div>
      <div className="flex justify-between mb-[1.5rem]">
        <p className="text-[16px] font-bold">Description</p>
        <button className="select-button"></button>
      </div>
    </div>
  );
};

export default ProductInfo;
