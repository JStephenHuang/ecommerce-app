import { useEffect, useRef, useState } from "react";
import { useSellProduct } from "../../../contexts/SellProductContext";

import SchoolSection from "./school-section";
import TypeSection from "./type-section";
import SizeSection from "./size-section";
import TitleSection from "./title-section";

interface ProductInfoProperties {
  count: number;
}

const ProductInfo = (props: ProductInfoProperties) => {
  const SellProductContext = useSellProduct();
  const schoolSelectRef = useRef<HTMLSelectElement>(null);
  const typeSelectRef = useRef<HTMLSelectElement>(null);
  const sizeSelectRef = useRef<HTMLSelectElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const [notFilled, setNotFilled] = useState<boolean>(false);

  const fillDetail = (seller: string, price: number, description: string) => {
    SellProductContext.fillDetail(seller, price, description);
  };

  useEffect(() => {
    const fillInformation = (
      school: string,
      productType: string,
      size: string,
      title: string
    ) => {
      SellProductContext.fillInformation(school, productType, size, title);
    };

    if (
      schoolSelectRef.current &&
      typeSelectRef.current &&
      sizeSelectRef.current &&
      titleInputRef.current &&
      props.count !== 0
    ) {
      const seller = "Stephen";

      const school = schoolSelectRef.current.value;
      const type = typeSelectRef.current.value;
      const size = sizeSelectRef.current.value;
      const title = titleInputRef.current.value;
      if (title === "") {
        setNotFilled(true);
      } else {
        setNotFilled(false);
      }
      fillInformation(school, type, size, title);
    }
  }, [props.count]);

  return (
    <div className="w-[60%] rounded-md my-5 p-5">
      <p className="text-[20px] font-bold">Product Information</p>
      <hr className="w-full bg-[#521945] h-[2px] mb-[1.5rem]" />

      <SchoolSection selectValue={schoolSelectRef} />

      <TypeSection selectValue={typeSelectRef} />

      <SizeSection selectValue={sizeSelectRef} />

      <TitleSection inputValue={titleInputRef} />
      {notFilled ? (
        <div className="text-center">
          <p className="text-red-600 my-5">Invalid or missing informations</p>
        </div>
      ) : null}
    </div>
  );
};

export default ProductInfo;
