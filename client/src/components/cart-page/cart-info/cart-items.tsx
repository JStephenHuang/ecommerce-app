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
  const frontEndCartItems = cartItems.map((value, index) => {
    return (
      <CartItem
        key={index}
        removeCartItemHandler={removeCartItemHandler}
        title={value.title}
        price={value.price}
        seller={value.seller}
        id={value._id}
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
