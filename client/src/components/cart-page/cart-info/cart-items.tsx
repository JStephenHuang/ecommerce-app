import { Link } from "react-router-dom";
import { ListingType } from "../../../types/listing";
import CartItem from "../cart-item";
import CartTotal from "./cart-total";

interface CartItemsProperties {
  cartItems: ListingType[];
  removeCartItemHandler: (id: string) => void;
}

const CartItems = ({
  cartItems,
  removeCartItemHandler,
}: CartItemsProperties) => {
  const frontEndCartItems = cartItems.map((value, index) => {
    return (
      <CartItem
        key={index}
        cartItem={value}
        removeCartItemHandler={removeCartItemHandler}
      />
    );
  });
  return (
    <div className="flex flex-col w-[60%] overflow-y-auto">
      {frontEndCartItems.length === 0 ? (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <p>Cart Empty</p>
          <Link
            to="/"
            className="mt-2 p-3 bg-black text-white transition-all hover:opacity-70"
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
