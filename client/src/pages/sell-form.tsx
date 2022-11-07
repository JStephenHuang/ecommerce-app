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
  const priceInputRef = useRef<HTMLInputElement>(null);
  const descriptionTextAreaRef = useRef<HTMLTextAreaElement>(null);
  const imagesInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<Array<FileList | null | undefined>>([]);
  useEffect(() => {
    console.log(images);
  }, [images]);
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
      images &&
      descriptionTextAreaRef.current
    ) {
      const title = titleInputRef.current.value;
      const clothingType = typeSelectRef.current.value;
      const seller = userContext.seller;
      const description = descriptionTextAreaRef.current.value;
      const size = sizeSelectRef.current.value;
      const school = schoolSelectRef.current.value;
      const price = Number(priceInputRef.current.value);
      if (
        title === "-" ||
        clothingType === "-" ||
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
          clothingType,
          seller,
          description,
          size,
          school,
          images,
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
          <p className="title">Welcome to the Sell page</p>
          {sections}
          <div className="w-[60%] flex flex-col items-end pb-10">
            <button
              className="publish-button flex items-center justify-center"
              onClick={publish}
            >
              {loading ? (
                <LoadingSpinner classname="w-8 w-8" />
              ) : (
                <>
                  <p className="mr-[5px] group">Publish</p>
                  <AiFillCaretRight
                    className="group-hover:translate-x-1.5"
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
