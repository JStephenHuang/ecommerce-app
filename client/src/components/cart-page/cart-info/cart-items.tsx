import { Listing } from "../../../types/listing";
import CartItem from "../cart-item";
import CartTotal from "./cart-total";

interface CartItemsProperties {
  cartItems: Listing[];
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
      <CartTotal cartItems={cartItems} />
    </div>
  );
};

export default CartItems;
