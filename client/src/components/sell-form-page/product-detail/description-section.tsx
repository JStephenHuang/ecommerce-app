import { useState } from "react";
import { ListingFormType } from "../../../types/listing";

interface PriceSectionProperties {
  sellForm: ListingFormType;
  handleInputChange: (event: any) => void;
}

const DescriptionSection = (props: PriceSectionProperties) => {
  return (
    <div className="flex justify-between mb-[1.5rem]">
      <div className="w-[30%]">
        <p className="text-[16px] font-bold">Description</p>
        <p className="text-[12px] font-light">
          Describe your listing: the more details, the better for buyers!
        </p>
      </div>

      <div className="w-[60%] h-[15%] flex flex-col">
        <textarea
          className="text-area"
          rows={7}
          placeholder="Describe the state of your product... at least 30 characters"
          name="description"
          value={props.sellForm.description}
          onChange={props.handleInputChange}
        ></textarea>
        <p className="text-[12px] text-gray-500 ml-auto">
          {props.sellForm.description.length}/30
        </p>
      </div>
    </div>
  );
};

export default DescriptionSection;
