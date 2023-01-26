import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { IListing } from "../../types/listing";
import { useFirebaseAuthUser } from "../../contexts/firebase-app-context";
import { useAPIClient } from "../../hooks/api-client";
import { Link, useNavigate } from "react-router-dom";

import LoadingSpinner from "../listing-form-page/loading-spinner";
import CartItems from "./cart-items";
import CartTotal from "./cart-total";

const LoadingState = () => {
  return (
    <div className="h-[80%] grid place-items-center">
      <LoadingSpinner classname="w-16 h-16" />
    </div>
  );
};

const ErrorState = () => {
  return <div className="h-[80%] grid place-items-center">Cart Not Found</div>;
};

const CartInfo = () => {
  const client = useAPIClient();
  const user = useFirebaseAuthUser();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(true);
  const [cart, setCart] = useState<IListing[]>([]);

  const getCartHandler = async () => {
    await client
      .get("/cart")
      .then((value) => {
        if (value.data === undefined) {
          setLoading(true);
        } else {
          setCart(value.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (err.response.status === 404) navigate("/onboarding");
      });
  };

  const removeCartItemHandler = async (id: string) => {
    await client.post(`/cart/remove/${id}`);
    getCartHandler();
  };

  useEffect(() => {
    if (user === null) navigate("/login");
    getCartHandler();
  }, [user]);

  if (loading) return <LoadingState />;
  // if (isError) return <ErrorState />;

  if (cart.length === 0) {
    return (
      <div className="mt-[10%] flex flex-col items-center">
        <p className="text-[30px] font-bold mb-5">Cart</p>
        <div className="py-10 w-[50%] rounded-sm shadow-lg flex flex-col items-center justify-center border">
          <p className="font-light"> Your cart is empty </p>
          <Link
            to="/"
            className="mt-2 px-[14px] py-[10px] bg-black text-white rounded-sm transition-all hover:opacity-70"
          >
            Go shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-[80%] my-5 p-5">
        <p className="text-[30px] font-bold text-center">Cart Information</p>
        <div className="flex my-5 font-semibold">
          <p className="">Items:</p>
        </div>
        <div className="flex">
          <CartItems
            cartItems={cart}
            removeCartItemHandler={removeCartItemHandler}
          />
          <CartTotal cartItems={cart} />
        </div>
      </div>
    </div>
  );
};

export default CartInfo;
