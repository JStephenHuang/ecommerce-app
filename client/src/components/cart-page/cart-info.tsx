import { IListing } from "../../types/listing";
import { useAPIClient } from "../../hooks/api-client";
import { Link } from "react-router-dom";

import CartItems from "./cart-items";
import CartTotal from "./cart-total";

interface CartInfoProperties {
  cart: IListing[];
  getCartHandler: () => void;
}

const CartInfo = ({ cart, getCartHandler }: CartInfoProperties) => {
  if (cart.length === 0) {
    return (
      <div className="mt-[10%] flex flex-col items-center">
        <p className="text-[30px] font-bold mb-5">Cart</p>
        <div className="py-10 w-[50%] rounded-sm shadow-lg flex flex-col items-center justify-center border">
          <p className="font-light"> Your cart is empty </p>
          <Link
            to="/"
            className="mt-2 px-[14px] py-[10px] bg-black text-white rounded-sm transition-all hover:opacity-70"
          >
            Go shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-[80%] my-5 p-5">
        <p className="text-[30px] font-bold text-center">Cart Information</p>
        <div className="flex my-5 font-semibold">
          <p className="">Items:</p>
        </div>
        <div className="flex">
          <CartItems cartItems={cart} getCartHandler={getCartHandler} />
          <CartTotal cartItems={cart} />
        </div>
      </div>
    </div>
  );
};

export default CartInfo;
