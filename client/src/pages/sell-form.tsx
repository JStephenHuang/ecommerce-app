import { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { AiFillCaretRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { apiCommands } from "../helper/apiCommands";
import { useUser } from "../contexts/user-context";

import { ListingFormType, listingFormDefaultValue } from "../types/listing";

import Navbar from "../components/product-page/navbar/navbar";
import ProductInfo from "../components/sell-form-page/product-info/product-info";
import ProductDetail from "../components/sell-form-page/product-detail/product-detail";
import LoadingSpinner from "../components/sell-form-page/loading-spinner";

const SellFormPage = () => {
  const userContext = useUser();
  const navigate = useNavigate();

  const [sellForm, setSellForm] = useState<ListingFormType>(
    listingFormDefaultValue
  );

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setSellForm({
      ...sellForm,
      [name]: value,
    });
    console.log(sellForm);
  };

  const [loading, setLoading] = useState<boolean>(false);
  // const [invalidInfo, setInvalidInfo] = useState<boolean>(false);
  useEffect(() => {
    setSellForm({
      ...sellForm,
      seller: userContext.seller,
    });
  }, []);

  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const publish = async () => {
    setLoading(true);
    delay(2000);
    apiCommands
      .createListing(sellForm)
      .then(() => {
        console.log("Item Successfully Listed");
        setLoading(false);
        navigate("/");
      })
      .catch((err) => {
        console.log(err + " Something Went Wrong");
        setLoading(false);
      });
  };

  const sections = [
    <ProductInfo
      key={0}
      sellForm={sellForm}
      handleInputChange={handleInputChange}
    />,
    <ProductDetail
      key={1}
      sellForm={sellForm}
      handleInputChange={handleInputChange}
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
          <div className="w-[60%] flex flex-col items-end pb-10 ">
            <button className="publish-button group" onClick={publish}>
              {loading ? (
                <LoadingSpinner classname="w-8 h-8" />
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
