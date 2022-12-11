import { ListingFormType } from "../../../types/listing";

interface PriceSectionProperties {
  sellForm: ListingFormType;
  handleInputChange: (event: any) => void;
}

const PriceSection = (props: PriceSectionProperties) => {
  return (
    <div className="flex justify-between mb-[1.5rem]">
      <div className="w-[40%]">
        <p className="text-[16px] font-bold">Price</p>
        <p className="text-[12px] font-light">Should not be over $50</p>
      </div>
      <div className="price-div text-[20px]">
        <p className="price-color">$</p>
        <input
          className="price-input text-[20px]"
          type="text"
          placeholder="0.00"
          maxLength={60}
          name="price"
          value={props.sellForm.price}
          onChange={props.handleInputChange}
        />
      </div>
    </div>
  );
};

export default PriceSection;
