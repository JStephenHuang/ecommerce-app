import { useEffect, useRef, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { AiFillCaretRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useAPIs } from "../contexts/api-context";
import { useUser } from "../contexts/user-context";
import Navbar from "../components/product-page/navbar/navbar";
import ProductInfo from "../components/sell-form-page/product-info/product-info";
import ProductDetail from "../components/sell-form-page/product-detail/product-detail";
import LoadingSpinner from "../components/sell-form-page/loading-spinner";

const SellFormPage = () => {
  const APIContext = useAPIs();
  const userContext = useUser();
  const navigate = useNavigate();
  //* Product detail
  const conditionSelectRef = useRef<HTMLSelectElement>(null);
  const priceInputRef = useRef<HTMLInputElement>(null);
  const descriptionTextAreaRef = useRef<HTMLTextAreaElement>(null);
  const imagesInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<Array<File | undefined>>([]);

  //* Product info
  const schoolSelectRef = useRef<HTMLSelectElement>(null);
  const typeSelectRef = useRef<HTMLSelectElement>(null);
  const sizeSelectRef = useRef<HTMLSelectElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);

  const [notFilled, setNotFilled] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  // const [invalidInfo, setInvalidInfo] = useState<boolean>(false);

  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const publish = async () => {
    if (
      schoolSelectRef.current &&
      typeSelectRef.current &&
      sizeSelectRef.current &&
      titleInputRef.current &&
      priceInputRef.current &&
      imagesInputRef.current &&
      conditionSelectRef.current &&
      descriptionTextAreaRef.current
    ) {
      const title = titleInputRef.current.value;
      const clothingType = typeSelectRef.current.value;
      const seller = userContext.seller;
      const description = descriptionTextAreaRef.current.value;
      const size = sizeSelectRef.current.value;
      const condition = conditionSelectRef.current.value;
      const school = schoolSelectRef.current.value;
      const images = imagesInputRef.current.files;
      const price = Number(priceInputRef.current.value);
      if (
        title === "-" ||
        clothingType === "-" ||
        description === "-" ||
        size === "-" ||
        condition === "-" ||
        school === "-" ||
        price === 0
      ) {
        setNotFilled(true);
        return;
      } else {
        setLoading(true);

        await delay(2000);

        const body = {
          title: title,
          clothingType: clothingType,
          seller: seller,
          description: description,
          size: size,
          condition: condition,
          schoolName: school,
          price: price,
        };

        APIContext.publishListing(body)
          .then(() => {
            console.log("Item Successfully Listed");
            setLoading(false);
            navigate("/");
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
      }
    }
  };

  const sections = [
    <ProductInfo
      key={0}
      selectSchool={schoolSelectRef}
      selectSize={sizeSelectRef}
      selectType={typeSelectRef}
      inputTitle={titleInputRef}
    />,
    <ProductDetail
      key={1}
      selectCondition={conditionSelectRef}
      inputDescription={descriptionTextAreaRef}
      inputPrice={priceInputRef}
      inputImages={imagesInputRef}
      images={images}
      setImages={setImages}
    />,
  ];

  return (
    <>
      <div className="h-screen w-screen">
        <header className="h-[10%] mb-5">
          <Navbar />
        </header>
        <button className="back-arrow" onClick={() => navigate(-1)}>
          <AiOutlineArrowLeft size={30} />
        </button>
        <div className="flex flex-col items-center">
          <p className="title">Welcome to the Sell Form</p>
          {sections}
          {notFilled ? (
            <div className="text-center my-5">
              <p className="text-red-600">Invalid or missing informations</p>
            </div>
          ) : null}
          <div className="w-[60%] flex flex-col items-end pb-10 ">
            <button className="publish-button group" onClick={publish}>
              {loading ? (
                <LoadingSpinner classname="w-8 w-8" />
              ) : (
                <>
                  <p className="mr-[5px] font-extrabold">Publish</p>
                  <AiFillCaretRight
                    className="group-hover:translate-x-1.5 transition-all"
                    size={20}
                  />
                </>
              )}
            </button>
          </div>
        </div>

        {/* <Media /> */}
      </div>
    </>
  );
};
export default SellFormPage;
