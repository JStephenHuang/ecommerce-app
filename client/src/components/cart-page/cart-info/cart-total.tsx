import { useState, useEffect } from "react";
import { useAPIs } from "../../../contexts/APIContext";
import { Link } from "react-router-dom";

interface CartTotalProperties {
  deleteAlert: number;
}

const CartTotal = (props: CartTotalProperties) => {
  const APIContext = useAPIs();
  const username = "Stephen";
  const [cartTotal, setCartTotal] = useState<number>(0);
  useEffect(() => {
    APIContext.getCart(username).then((value) => {
      setCartTotal(value.data.total);
      console.log("lol");
    });
  }, [props.deleteAlert]);
  const shipping = cartTotal * 0.1;
  const total = cartTotal + shipping;
  return (
    <div className="p-5 rounded-lg w-[40%] h-full ml-5 flex flex-col items-end border border-black">
      <div className="flex w-full justify-between">
        <p className="">Item(s):</p>
        <p className="">${cartTotal.toFixed(2)}</p>
      </div>
      <div className="flex w-full justify-between">
        <p className="">Shipping:</p>
        <p className="">${shipping.toFixed(2)}</p>
      </div>
      <hr className="w-full h-[2px] bg-[#521945] place-items-center mt-auto" />
      <div className="flex w-full justify-between text-[24px] my-2">
        <p className="">Total:</p>
        <p className="text-[#87C38F]">${total.toFixed(2)}</p>
      </div>
      {cartTotal === 0 ? (
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
