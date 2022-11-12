import { useEffect, useState } from "react";
import DescriptionSection from "./description-section";
import ConditionSection from "./condition-section";
import ImageDroper from "./image-section";
import PriceSection from "./price-section";

interface ProductDetailProperties {
  selectCondition: React.RefObject<HTMLSelectElement>;
  inputDescription: React.RefObject<HTMLTextAreaElement>;
  inputPrice: React.RefObject<HTMLInputElement>;
  inputImages: React.RefObject<HTMLInputElement>;
  images: Array<File | undefined>;
  setImages: React.Dispatch<React.SetStateAction<(File | undefined)[]>>;
}

const ProductDetail = (props: ProductDetailProperties) => {
  return (
    <div className="w-[60%] rounded-md mb-5 p-5">
      <p className="text-[20px] font-bold">Product Detail</p>
      <hr className="w-full bg-[#521945] h-[2px] mb-[1.5rem]" />

      <ConditionSection selectValue={props.selectCondition} />

      <DescriptionSection inputValue={props.inputDescription} />

      <PriceSection inputValue={props.inputPrice} />

      <ImageDroper
        inputValue={props.inputImages}
        images={props.images}
        setImages={props.setImages}
      />
    </div>
  );
};

export default ProductDetail;
