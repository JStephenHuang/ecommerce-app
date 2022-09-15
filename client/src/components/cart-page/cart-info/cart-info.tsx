import { useState, useEffect, useRef } from "react";
import CartItem from "../cart-item";
import CartTotal from "./cart-total";

const CartInfo = () => {
  const cartItems = [
    {
      title: "Polo from ND",
      price: 50,
      seller: "Leo",
    },
    {
      title: "Polo from ND",
      price: 50,
      seller: "Leo",
    },
    {
      title: "Polo from ND",
      price: 50,
      seller: "Leo",
    },
    {
      title: "Polo from ND",
      price: 50,
      seller: "Leo",
    },
  ];
  const frontEndCartItems = cartItems.map((cartItem, key) => {
    return (
      <CartItem
        title={cartItem.title}
        price={cartItem.price}
        seller={cartItem.seller}
      />
    );
  });
  return (
    <div className="w-[50%] my-5 p-5">
      <p className="text-[20px] font-bold mb-[1.5rem]">
        Cart Information
        <hr className="w-full bg-[#521945] h-[2px]" />
      </p>
      <div className="flex my-5">
        <p className="mr-[55%]">Items</p>

        <p className="">Total</p>
      </div>
      <div className="flex h-[20rem] ">
        <div className="flex flex-col w-[60%] overflow-y-auto pr-3">
          {frontEndCartItems}
        </div>
        <CartTotal />
      </div>
    </div>
  );
};

export default CartInfo;
