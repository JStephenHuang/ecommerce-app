import { Link } from "react-router-dom";
import { Listing } from "../../../types/listing";

interface CartTotalProperties {
  cartItems: Listing[];
}

const CartTotal = ({ cartItems }: CartTotalProperties) => {
  let cartTotal;

  if (cartItems.length === 0) {
    cartTotal = 0;
  } else {
    cartTotal = cartItems
      .map((value) => value.price)
      .reduce((prevValue, currValue) => prevValue + currValue);
  }

  const shippingFee = cartTotal * 0.1;
  const total = cartTotal + shippingFee;

  return (
    <div className="p-5 w-[40%] h-full ml-5 flex flex-col items-end border border-black">
      <div className="flex w-full justify-between">
        <p className="">Item(s):</p>
        <p className="">${cartTotal.toFixed(2)}</p>
      </div>
      <div className="flex w-full justify-between">
        <p className="">Shipping:</p>
        <p className="">${shippingFee.toFixed(2)}</p>
      </div>
      <hr className="w-full h-[2px] bg-[#521945] place-items-center mt-auto" />
      <div className="flex w-full justify-between text-[24px] my-2">
        <p className="">Total:</p>
        <p className="text-[#87C38F]">${total.toFixed(2)}</p>
      </div>
      {cartItems.length === 0 ? (
        <button className="checkout-button-disabled" disabled={true}>
          Checkout
        </button>
      ) : (
        <Link className="w-full" to="checkout">
          <p className="checkout-button text-center">Checkout</p>
        </Link>
      )}
    </div>
  );
};

export default CartTotal;
