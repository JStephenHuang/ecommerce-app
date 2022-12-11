import { useEffect, useState } from "react";
import { useUser } from "../../../contexts/user-context";
import { useQuery } from "react-query";
import { apiCommands } from "../../../helper/apiCommands";
import { ListingType } from "../../../types/listing";

import LoadingSpinner from "../../sell-form-page/loading-spinner";
import CartItems from "./cart-items";
import CartTotal from "./cart-total";

const CartInfo = () => {
  const userContext = useUser();
  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const getCartItemsHandler = async () => {
    return (await apiCommands.getCart(userContext.buyer)).data;
  };

  const { data, status, refetch } = useQuery("cart", getCartItemsHandler);

  const removeCartItemHandler = async (id: string) => {
    apiCommands.removeCartItem(userContext.buyer, id);
    refetch();
  };

  if (status === "loading") {
    return (
      <div className="h-[80%] grid place-items-center">
        <LoadingSpinner classname="w-16 h-16" />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="h-[80%] grid place-items-center">Cart Not Found</div>
    );
  }
  const cartItems: ListingType[] = data.listings;

  return (
    <div className="flex flex-col items-center">
      <p className="title">Welcome to your Cart</p>
      <div className="w-[80%] my-5 p-5">
        <p className="text-[20px] font-bold">Cart Information</p>
        <hr className="w-full bg-[#521945] h-[2px] mb-[1.5rem]" />
        <div className="flex my-5 font-semibold">
          <p className="">Items</p>
        </div>
        <div className="flex">
          <CartItems
            cartItems={cartItems}
            removeCartItemHandler={removeCartItemHandler}
          />
          <CartTotal cartItems={cartItems} />
        </div>
      </div>
    </div>
  );
};

export default CartInfo;
