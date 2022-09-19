import { useEffect, useRef, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { AiFillCaretRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useAPIs } from "../contexts/APIContext";
import { useSellProduct } from "../contexts/SellProductContext";
import Navbar from "../components/product-page/navbar/navbar";
import ProductInfo from "../components/sell-page/product-info/product-info";
import ProductDetail from "../components/sell-page/product-detail/product-detail";

const SellPage = () => {
  const SellProductContext = useSellProduct();
  const APIContext = useAPIs();
  const navigate = useNavigate();
  const [count, setCount] = useState<number>(0);
  const [invalidInfo, setInvalidInfo] = useState<boolean>(false);

  const publish = () => {
    setCount((current) => current + 1);
    console.log(SellProductContext.productInfo);
    const listing = SellProductContext.productInfo;
    const title = listing.title;
    const productType = listing.productType;
    const seller = listing.seller;
    const description = listing.description;
    const size = listing.size;
    const school = listing.school;
    const price = listing.price;

    if (
      title !== "-" ||
      productType !== "-" ||
      seller !== "-" ||
      description !== "-" ||
      size !== "-" ||
      school !== "-" ||
      price !== 0
    ) {
      console.log("Lol");
      APIContext.sellProduct(
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
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setInvalidInfo(true);
    }
  };

  const sections = [
    <ProductInfo count={count} />,
    <ProductDetail count={count} />,
  ];

  return (
    <>
      <div className="h-screen w-screen">
        <header className="h-[10%] mb-10">
          <Navbar />
        </header>
        <button
          className="ml-10 text-gray-400 hover:text-red-600 ease-in-out duration-150"
          onClick={() => navigate(-1)}
        >
          <AiOutlineArrowLeft size={30} />
        </button>
        <div className="flex flex-col items-center">
          <p className="title">Welcome to the Sell page</p>
          {sections}
          <div className="w-[60%] flex flex-col items-end">
            {invalidInfo ? (
              <button
                className="publish-button flex items-center justify-center"
                onClick={publish}
              >
                <p className="mr-[5px]">Publish</p>
                <AiFillCaretRight size={20} />
              </button>
            ) : (
              <button
                className="publish-button opacity-50 z-[-10] flex items-center justify-center"
                onClick={publish}
                disabled={true}
              >
                <p className="mr-[5px]">Publish</p>
                <AiFillCaretRight size={20} />
              </button>
            )}
          </div>
        </div>

        <div className="spacer layer11"></div>
        {/* <Media /> */}
      </div>
    </>
  );
};
export default SellPage;
