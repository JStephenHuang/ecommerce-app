import { useEffect, useState } from "react";
import { useAPIs } from "../../../contexts/APIContext";
import { useUser } from "../../../contexts/UserContext";
import LoadingSpinner from "../../sell-page/loading-spinner";
import CartItems from "./cart-items";
import { Item } from "../../../types/cart-item";

const CartInfo = () => {
  const APIContext = useAPIs();
  const userContext = useUser();
  const [loading, setLoading] = useState<boolean>(true);
  const [cartItems, setCartItems] = useState<Item[]>([]);

  const getCartItemsHandler = async () => {
    setLoading(true);
    setCartItems(
      (await APIContext.getCartItems(userContext.buyer)).data.listings
    );
    setLoading(false);
  };

<<<<<<< HEAD
  const removeCartItemHandler = (id: string) => {
    const cartItemIndex = cartItems.map((cartItem) => cartItem._id).indexOf(id);

    setCartItems(cartItems.splice(cartItemIndex - 1, 1));
=======
  const removeCartItemHandler = async (id: string) => {
    setLoading(true);
    await APIContext.removeCartItem(userContext.buyer, id);
    setCartItems(
      (await APIContext.getCartItems(userContext.buyer)).data.listings
    );
    setLoading(false);
>>>>>>> 9324629c62714753d64d0693d74752197900c5d5
  };

  useEffect(() => {
    getCartItemsHandler();
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
          <CartItems
            cartItems={cartItems}
            removeCartItemHandler={removeCartItemHandler}
          />
        </div>
      </div>
    );
};

export default CartInfo;
