import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/product-page/navbar/navbar";
import ProductInfo from "../components/sell-page/product-info/product-info";
import Media from "../components/sell-page/media";

const SellPage = () => {
  const navigate = useNavigate();

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
        <div className="spacer layer3">
          <div className="flex flex-col items-center ">
            <p className="title">Welcome to the Sell page</p>
            <ProductInfo />
          </div>
        </div>
        {/* <Media /> */}
      </div>
    </>
  );
};
export default SellPage;
