import { useEffect, useRef, useState } from "react";
import { useSellProduct } from "../../../contexts/SellProductContext";
import DescriptionSection from "./description-section";
import ConditionSection from "./condition-section";
import PriceSection from "./price-section";

interface ProductDetailProperties {
  count: number;
}

const ProductDetail = (props: ProductDetailProperties) => {
  const SellProductContext = useSellProduct();
  const priceInputRef = useRef<HTMLInputElement>(null);
  const descriptionTextAreaRef = useRef<HTMLTextAreaElement>(null);
  //   const sellerInputRef = useRef<HTMLInputElement>(null);
  const [notFilled, setNotFilled] = useState<boolean>(false);

  useEffect(() => {
    const fillDetail = (seller: string, price: number, description: string) => {
      SellProductContext.fillDetail(seller, price, description);
    };

    if (
      priceInputRef.current &&
      descriptionTextAreaRef.current &&
      props.count !== 0
    ) {
      const seller = "Stephen";
      const price = Number(priceInputRef.current.value);
      const description = descriptionTextAreaRef.current.value;
      if (price === 0 || description === "") {
        setNotFilled(true);
      } else {
        setNotFilled(false);
      }
      fillDetail(seller, price, description);
    }
  }, [props.count]);

  return (
    <div className="w-[60%] rounded-md mb-5 p-5">
      <p className="text-[20px] font-bold">Product Detail</p>
      <hr className="w-full bg-[#521945] h-[2px] mb-[1.5rem]" />

      <ConditionSection />

      <DescriptionSection inputValue={descriptionTextAreaRef} />

      <PriceSection inputValue={priceInputRef} />
      {notFilled ? (
        <div className="text-center">
          <p className="text-red-600 my-5">Invalid or missing details</p>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetail;
