import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/product-page/navbar/navbar";
import CartInfo from "../components/cart-page/cart-info/cart-info";

const CartPage = () => {
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
        <div className="spacer layer2">
          <div className="flex flex-col items-center ">
            <p className="title">Welcome to your Cart</p>
            <CartInfo />
          </div>
          {/* <Media /> */}
        </div>
      </div>
    </>
  );
};
export default CartPage;
