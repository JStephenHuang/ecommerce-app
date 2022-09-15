import { Link } from "react-router-dom";

const CartTotal = () => {
  return (
    <div className="p-5 rounded-lg w-[40%] h-full ml-5 flex flex-col items-end border border-black">
      <div className="flex w-full justify-between">
        <p className="">Item(s):</p>
        <p className="">$140.00</p>
      </div>
      <div className="flex w-full justify-between">
        <p className="">Shipping:</p>
        <p className="">$10.00</p>
      </div>
      <hr className="w-full h-[2px] bg-[#521945] place-items-center mt-auto" />
      <div className="flex w-full justify-between text-[24px] my-2">
        <p className="">Total:</p>
        <p className="">$150</p>
      </div>
      <Link className="w-full" to="checkout">
        <p className="checkout-button text-center">Checkout</p>
      </Link>
    </div>
  );
};

export default CartTotal;
