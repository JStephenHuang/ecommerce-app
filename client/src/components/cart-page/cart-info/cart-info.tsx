import { useState, useEffect } from "react";
import { useAPIs } from "../../../contexts/APIContext";
import CartItem from "../cart-item";
import CartTotal from "./cart-total";

const CartInfo = () => {
  const APIContext = useAPIs();
  const username = "Stephen";
  const [cartItems, setCartItems] = useState<
    Array<{
      title: string;
      productType: string;
      seller: string;
      size: number;
      school: any;
      price: number;
      _id: string;
    }>
  >([]);
  useEffect(() => {
    APIContext.getCart(username).then((value) => {
      setCartItems(value.data.articles);
    });
  }, []);

  console.log(cartItems);

  const frontEndCartItems = cartItems.map((cartItem, key) => {
    return (
      <CartItem
        key={key}
        title={cartItem.title}
        price={cartItem.price}
        seller={cartItem.seller}
        id={cartItem._id}
      />
    );
  });
  return (
    <div className="w-[50%] my-5 p-5">
      <p className="text-[20px] font-bold">Cart Information</p>
      <hr className="w-full bg-[#521945] h-[2px] mb-[1.5rem]" />

      <div className="flex my-5 font-semibold">
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
