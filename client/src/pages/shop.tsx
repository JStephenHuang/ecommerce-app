import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../contexts/user-context";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Navbar from "../components/product-page/navbar/navbar";
import ShopInfo from "../components/shop-page/shop-info";

const ShopPage = () => {
  const navigate = useNavigate();
  const userContext = useUser();
  return (
    <>
      <div className="h-screen w-screen">
        <header className="h-[10%] mb-5">
          <Navbar />

          <button className="back-arrow" onClick={() => navigate(-1)}>
            <AiOutlineArrowLeft size={30} />
          </button>
        </header>
        <div className="flex flex-col items-center">
          <p className="title">Welcome to your Shop</p>
          <ShopInfo />
        </div>
        {/* <Media /> */}
      </div>
    </>
  );
};

export default ShopPage;
