import { useRef } from "react";

interface PriceSectionProperties {
  inputValue: React.RefObject<HTMLInputElement>;
}

const PriceSection = (props: PriceSectionProperties) => {
  return (
    <div className="flex justify-between mb-[1.5rem]">
      <div className="w-[40%]">
        <p className="text-[16px] font-bold">Price</p>
        <p className="text-[12px]">Should not be over $50</p>
      </div>
      <div className="price-div text-[20px]">
        <p className="text-[#87C38F]">$</p>
        <input
          className="price-input text-[20px]"
          type="text"
          placeholder="0.00"
          maxLength={60}
          ref={props.inputValue}
        />
      </div>
    </div>
  );
};

export default PriceSection;
