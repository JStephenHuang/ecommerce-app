import { Link } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import CheckoutOverview from "../components/checkout-page/checkout-overview";

const CheckoutPage = () => {
  return (
    <>
      <div className="h-screen w-screen">
        <header className="h-[10%] mb-5">
          <Link className="back-arrow" to="/cart">
            <AiOutlineArrowLeft size={30} />
          </Link>
        </header>
        <div className="flex flex-col items-center">
          <p className="title">Checkout</p>
          <CheckoutOverview />
        </div>
        {/* <Media /> */}
      </div>
    </>
  );
};
export default CheckoutPage;
