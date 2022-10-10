import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/product-page/navbar/navbar";
import CartInfo from "../components/cart-page/cart-info/cart-info";

const CartPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="h-screen w-screen">
        <header className="h-[10%] mb-5">
          <Navbar />
        </header>
        <button className="back-arrow" onClick={() => navigate(-1)}>
          <AiOutlineArrowLeft size={30} />
        </button>
        <div className="spacer layer2">
          <CartInfo />
        </div>
        {/* <Media /> */}
      </div>
    </>
  );
};
export default CartPage;
