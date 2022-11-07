import { useEffect, useState } from "react";
import DescriptionSection from "./description-section";
import ConditionSection from "./condition-section";
import ImageDroper from "./image-section";
import PriceSection from "./price-section";

interface ProductDetailProperties {
  inputDescription: React.RefObject<HTMLTextAreaElement>;
  inputPrice: React.RefObject<HTMLInputElement>;
  inputImages: React.RefObject<HTMLInputElement>;
  images: Array<FileList | null | undefined>;
  setImages: React.Dispatch<
    React.SetStateAction<(FileList | null | undefined)[]>
  >;
  count: number;
}

const ProductDetail = (props: ProductDetailProperties) => {
  const inputDescription = props.inputDescription;
  const inputPrice = props.inputPrice;
  const inputImages = props.inputImages;
  const [notFilled, setNotFilled] = useState<boolean>(false);
  const [priceError, setPriceError] = useState<boolean>(false);

  useEffect(() => {
    if (
      inputPrice.current &&
      inputDescription.current &&
      inputImages.current &&
      props.count !== 0
    ) {
      const description = inputDescription.current.value;
      const price = Number(inputPrice.current.value);
      const images = inputImages.current.files;
      if (price === 0 || description === "" || images?.length === 0) {
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

      <ImageDroper
        inputValue={inputImages}
        images={props.images}
        setImages={props.setImages}
      />

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
