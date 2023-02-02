import { useState } from "react";
import { Link } from "react-router-dom";
import { IListing } from "../../types/listing";
import { TbTrash } from "react-icons/tb";
import { useDownloadUrls } from "../../hooks/use-download-urls";
import { useAPIClient } from "../../hooks/api-client";
import { timeout } from "../../hooks/timeout";

import LoadingSpinner from "../status/loading-spinner";

interface CartItemsProperties {
  cartItems: IListing[];
  getCartHandler: () => void;
}

interface CartItemProperties {
  cartItem: IListing;
  getCartHandler: () => void;
}
const CartItem = ({ cartItem, getCartHandler }: CartItemProperties) => {
  const client = useAPIClient();

  const [removeLoading, setRemoveLoading] = useState<boolean>(false);

  const imageUrls = useDownloadUrls(cartItem.imagePaths);

  const removeCartItemHandler = async (id: string) => {
    setRemoveLoading(true);
    await client.post(`/cart/${id}`);

    await timeout(500);

    getCartHandler();

    setRemoveLoading(false);
  };

  return (
    <div className="cart-items mb-5">
      <div className="flex items-center w-full h-full">
        <div className="h-full aspect-square bg-white border">
          <img className="w-full h-full" src={imageUrls[0]} alt="" />
        </div>

        <div className="flex flex-col ml-5 w-[50%] mr-auto">
          <Link to={`/listing/${cartItem._id}`}>
            <p className="hover:opacity-50 font-extrabold truncate text-[16px]">
              {cartItem.title}
            </p>
          </Link>
          <div className="flex font-extralight">
            <p className="">Seller:</p>
            <p className="ml-1"> {cartItem.seller.username}</p>
          </div>
          <p className="text-[#87C38F] text-[24px] mr-3 font-extrabold">
            ${cartItem.price.toFixed(2)}
          </p>
        </div>
        {removeLoading ? (
          <LoadingSpinner classname="w-6 h-6 " />
        ) : (
          <TbTrash
            className="hover:text-red-600 ml-auto"
            onClick={() => removeCartItemHandler(cartItem._id)}
            size={24}
          />
        )}
      </div>
    </div>
  );
};

const CartItems = ({ cartItems, getCartHandler }: CartItemsProperties) => {
  const frontEndCartItems = cartItems.map((value, index) => {
    return (
      <CartItem key={index} cartItem={value} getCartHandler={getCartHandler} />
    );
  });
  return (
    <div className="flex flex-col w-[60%] overflow-y-auto">
      {frontEndCartItems.length === 0 ? (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <Link
            to="/"
            className="mt-2 px-[14px] py-[10px] bg-black text-white rounded-sm transition-all hover:opacity-70"
          >
            Go shopping
          </Link>
        </div>
      ) : (
        frontEndCartItems
      )}
    </div>
  );
};

export default CartItems;
