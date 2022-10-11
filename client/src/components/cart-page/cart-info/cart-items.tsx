import { Item } from "../../../types/cart-item";
import CartItem from "../cart-item";
import CartTotal from "./cart-total";

const CartItems = ({
  cartItems,
  removeCartItemHandler,
}: {
  cartItems: Item[];
  removeCartItemHandler: (id: string) => void;
}) => {
  const frontEndCartItems = cartItems.map((cartItem, key) => {
    return (
      <CartItem
        key={key}
        removeCartItemHandler={removeCartItemHandler}
        title={cartItem.title}
        price={cartItem.price}
        seller={cartItem.seller}
        id={cartItem._id}
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
      <CartTotal cartLength={cartItems.length} />
    </div>
  );
};

export default CartItems;
