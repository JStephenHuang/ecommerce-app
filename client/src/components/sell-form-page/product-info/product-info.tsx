import { ListingFormType } from "../../../types/listing";

import SchoolSection from "./school-section";
import TypeSection from "./type-section";
import SizeSection from "./size-section";
import TitleSection from "./title-section";

interface ProductInfoProperties {
  sellForm: ListingFormType;
  handleInputChange: (event: any) => void;
}

const ProductInfo = (props: ProductInfoProperties) => {
  return (
    <div className="w-[60%] rounded-md my-5 p-5">
      <p className="text-[20px] font-bold">Product Information</p>
      <hr className="w-full bg-[#521945] h-[2px] mb-[1.5rem]" />

      <SchoolSection
        sellForm={props.sellForm}
        handleInputChange={props.handleInputChange}
      />

      <TypeSection
        sellForm={props.sellForm}
        handleInputChange={props.handleInputChange}
      />

      <SizeSection
        sellForm={props.sellForm}
        handleInputChange={props.handleInputChange}
      />

      <TitleSection
        sellForm={props.sellForm}
        handleInputChange={props.handleInputChange}
      />
    </div>
  );
};

export default ProductInfo;
