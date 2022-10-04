import { useEffect, useRef, useState } from "react";
import { useSellProduct } from "../../../contexts/SellProductContext";
import DescriptionSection from "./description-section";
import ConditionSection from "./condition-section";
import PriceSection from "./price-section";

interface ProductDetailProperties {
  inputDescription: React.RefObject<HTMLTextAreaElement>;
  inputPrice: React.RefObject<HTMLInputElement>;
  count: number;
}

const ProductDetail = (props: ProductDetailProperties) => {
  const inputDescription = props.inputDescription;
  const inputPrice = props.inputPrice;
  const [notFilled, setNotFilled] = useState<boolean>(false);
  const [priceError, setPriceError] = useState<boolean>(false);

  useEffect(() => {
    if (inputPrice.current && inputDescription.current && props.count !== 0) {
      const seller = "Stephen";
      const description = inputDescription.current.value;
      const price = Number(inputPrice.current.value);
      if (price === 0 || description === "") {
        setNotFilled(true);
      } else if (price % 1 !== 0) {
        setNotFilled(false);
        setPriceError(true);
      } else {
        setPriceError(false);
        setNotFilled(false);
      }
    }
  }, [props.count]);

  return (
    <div className="w-[60%] rounded-md mb-5 p-5">
      <p className="text-[20px] font-bold">Product Detail</p>
      <hr className="w-full bg-[#521945] h-[2px] mb-[1.5rem]" />

      <ConditionSection />

      <DescriptionSection inputValue={inputDescription} />

      <PriceSection inputValue={inputPrice} />
      {notFilled ? (
        <div className="text-center">
          <p className="text-red-600 my-5">Invalid or missing details</p>
        </div>
      ) : null}
      {priceError ? (
        <div className="text-center">
          <p className="text-red-600 my-5">Price can have . but not ,</p>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetail;
