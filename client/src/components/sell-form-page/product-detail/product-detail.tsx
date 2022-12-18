import { useEffect, useState } from "react";
import { ListingFormType } from "../../../types/listing";
import DescriptionSection from "./description-section";
import ConditionSection from "./condition-section";
import ImageDroper from "./image-section";
import PriceSection from "./price-section";

interface ProductDetailProperties {
  sellForm: ListingFormType;
  handleInputChange: (event: any) => void;
}

const ProductDetail = (props: ProductDetailProperties) => {
  return (
    <div className="w-[60%] rounded-md mb-5 p-5">
      <p className="text-[20px] font-bold">Product Detail</p>
      <hr className="w-full bg-[#521945] h-[2px] mb-[1.5rem]" />

      <ConditionSection
        sellForm={props.sellForm}
        handleInputChange={props.handleInputChange}
      />

      <DescriptionSection
        sellForm={props.sellForm}
        handleInputChange={props.handleInputChange}
      />

      <PriceSection
        sellForm={props.sellForm}
        handleInputChange={props.handleInputChange}
      />
    </div>
  );
};

export default ProductDetail;
