import { useEffect, useRef, useState } from "react";
import { useSellProduct } from "../../../contexts/SellProductContext";

import SchoolSection from "./school-section";
import TypeSection from "./type-section";
import SizeSection from "./size-section";
import TitleSection from "./title-section";

interface ProductInfoProperties {
  selectSchool: React.RefObject<HTMLSelectElement>;
  selectSize: React.RefObject<HTMLSelectElement>;
  selectType: React.RefObject<HTMLSelectElement>;
  inputTitle: React.RefObject<HTMLInputElement>;
  count: number;
}

const ProductInfo = (props: ProductInfoProperties) => {
  const selectSchool = props.selectSchool;
  const selectType = props.selectType;
  const selectSize = props.selectSize;
  const inputTitle = props.inputTitle;
  const [notFilled, setNotFilled] = useState<boolean>(false);

  useEffect(() => {
    if (
      selectSchool.current &&
      selectType.current &&
      selectSize.current &&
      inputTitle.current &&
      props.count !== 0
    ) {
      const school = selectSchool.current.value;
      const type = selectType.current.value;
      const size = selectSize.current.value;
      const title = inputTitle.current.value;
      if (title === "" || school === "-" || type === "-" || size === "-") {
        setNotFilled(true);
      } else {
        setNotFilled(false);
      }
    }
  }, [props.count]);

  return (
    <div className="w-[60%] rounded-md my-5 p-5">
      <p className="text-[20px] font-bold">Product Information</p>
      <hr className="w-full bg-[#521945] h-[2px] mb-[1.5rem]" />

      <SchoolSection selectValue={selectSchool} />

      <TypeSection selectValue={selectType} />

      <SizeSection selectValue={selectSize} />

      <TitleSection inputValue={inputTitle} />
      {notFilled ? (
        <div className="text-center">
          <p className="text-red-600 my-5">Invalid or missing informations</p>
        </div>
      ) : null}
    </div>
  );
};

export default ProductInfo;
