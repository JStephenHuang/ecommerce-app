import { useState, useEffect, Key } from "react";
import { useAPIs } from "../../../contexts/APIContext";
import { useUser } from "../../../contexts/UserContext";
import CartItem from "../cart-item";
import CartTotal from "./cart-total";

const CartInfo = () => {
  const APIContext = useAPIs();
  const userContext = useUser();
  const username = userContext.buyer;
  const [deleteAlert, setDeleteAlert] = useState<number>(0);
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
  const deleteAlertFunction = () => {
    setDeleteAlert((deleteAlert) => (deleteAlert += 1));
  };
  useEffect(() => {
    APIContext.getCart(username).then((value) => {
      setCartItems(value.data.listings);
      console.log("23");
    });
  }, [deleteAlert]);

  const frontEndCartItems = cartItems.map((cartItem, key) => {
    return (
      <CartItem
        key={key}
        deleteAlertFunction={deleteAlertFunction}
        title={cartItem.title}
        price={cartItem.price}
        seller={cartItem.seller}
        id={cartItem._id}
      />
    );
  });
  return (
    <div className="w-[70%] my-5 p-5">
      <p className="text-[20px] font-bold">Cart Information</p>
      <hr className="w-full bg-[#521945] h-[2px] mb-[1.5rem]" />

      <div className="flex my-5 font-semibold">
        <p className="mr-[56%]">Items</p>

        <p className="">Total</p>
      </div>
      <div className="flex h-[20rem] ">
        <div className="flex flex-col w-[60%] overflow-y-auto pr-3">
          {frontEndCartItems.length === 0 ? (
            <div className="w-full h-full grid place-items-center">
              <p>Cart Empty</p>
            </div>
          ) : (
            frontEndCartItems
          )}
        </div>
        <CartTotal deleteAlert={deleteAlert} cartLength={cartItems.length} />
      </div>
    </div>
  );
};

export default CartInfo;
