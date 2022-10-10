import { lazy, useEffect, useState } from "react";
import LoadingSpinner from "../../sell-page/loading-spinner";
import CartItems from "./cart-items";

const CartInfo = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
  const delayTwoSec = async () => {
    await delay(1500);
    setLoading(false);
  };
  useEffect(() => {
    delayTwoSec();
  }, []);
  if (loading) {
    return (
      <div className="h-[60%] grid place-items-center">
        <LoadingSpinner classname="w-16 h-16" />
      </div>
    );
  } else
    return (
      <div className="flex flex-col items-center">
        <p className="title">Welcome to your Cart</p>

        <div className="w-[70%] my-5 p-5">
          <p className="text-[20px] font-bold">Cart Information</p>
          <hr className="w-full bg-[#521945] h-[2px] mb-[1.5rem]" />

          <div className="flex my-5 font-semibold">
            <p className="mr-[56%]">Items</p>

            <p className="">Total</p>
          </div>
          <CartItems />
        </div>
      </div>
    );
};

export default CartInfo;
