import { useEffect, useRef, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { AiFillCaretRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useAPIs } from "../contexts/api-context";
import { useUser } from "../contexts/user-context";
import Navbar from "../components/product-page/navbar/navbar";
import ProductInfo from "../components/sell-page/product-info/product-info";
import ProductDetail from "../components/sell-page/product-detail/product-detail";
import LoadingSpinner from "../components/sell-page/loading-spinner";

const SellPage = () => {
  const APIContext = useAPIs();
  const userContext = useUser();
  const navigate = useNavigate();
  //* Product detail
  const priceInputRef = useRef<HTMLInputElement>(null);
  const descriptionTextAreaRef = useRef<HTMLTextAreaElement>(null);

  //* Product info
  const schoolSelectRef = useRef<HTMLSelectElement>(null);
  const typeSelectRef = useRef<HTMLSelectElement>(null);
  const sizeSelectRef = useRef<HTMLSelectElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);

  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  // const [invalidInfo, setInvalidInfo] = useState<boolean>(false);

  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
  const publish = async () => {
    setCount((count) => (count += 1));
    if (
      schoolSelectRef.current &&
      typeSelectRef.current &&
      sizeSelectRef.current &&
      titleInputRef.current &&
      priceInputRef.current &&
      descriptionTextAreaRef.current
    ) {
      const title = titleInputRef.current.value;
      const productType = typeSelectRef.current.value;
      const seller = userContext.seller;
      const description = descriptionTextAreaRef.current.value;
      const size = sizeSelectRef.current.value;
      const school = schoolSelectRef.current.value;
      const price = Number(priceInputRef.current.value);
      if (
        title === "-" ||
        productType == "-" ||
        description === "-" ||
        size === "-" ||
        school === "-" ||
        price === 0
      ) {
        return;
      } else {
        setLoading(true);

        await delay(2000);

        APIContext.sellListing(
          title,
          productType,
          seller,
          description,
          size,
          school,
          price
        )
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
      count={count}
      selectSchool={schoolSelectRef}
      selectSize={sizeSelectRef}
      selectType={typeSelectRef}
      inputTitle={titleInputRef}
    />,
    <ProductDetail
      key={1}
      count={count}
      inputDescription={descriptionTextAreaRef}
      inputPrice={priceInputRef}
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
          <p className="title">Welcome to the Sell page</p>
          {sections}
          <div className="w-[60%] flex flex-col items-end">
            <button
              className="publish-button flex items-center justify-center"
              onClick={publish}
            >
              {loading ? (
                <LoadingSpinner classname="w-8 w-8" />
              ) : (
                <>
                  <p className="mr-[5px]">Publish</p>
                  <AiFillCaretRight size={20} />
                </>
              )}
            </button>
          </div>
        </div>

        <div className="spacer layer11"></div>
        {/* <Media /> */}
      </div>
    </>
  );
};
export default SellPage;
