import { useAPIClient } from "../../hooks/api-client";
import { useFirebaseAuthUser } from "../../contexts/firebase-app-context";
import { IoCart } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

import LoadingSpinner from "../status/loading-spinner";
import { useState } from "react";

interface ListingButtonProperties {
  id: string;
  seller: string;
  inCart: string[];
}

const AddCartButton = (props: ListingButtonProperties) => {
  const client = useAPIClient();
  const user = useFirebaseAuthUser();
  const navigate = useNavigate();

  const [inCart, setInCart] = useState<boolean>(false);

  if (user === undefined) {
    return (
      <button
        className="add-to-cart-button flex justify-center"
        disabled={true}
      >
        <LoadingSpinner classname="w-6 h-6" />
      </button>
    );
  }

  if (user === null) {
    return (
      <button
        className="checkout-button flex items-center justify-center"
        onClick={() => navigate("/login")}
      >
        Add to cart <IoCart className="ml-2" />
      </button>
    );
  }

  const addToCart = async () => {
    await client
      .post(`listing/${props.id}`)
      .then(() => {
        setInCart(true);
        console.log("Item Successfully Added to Cart!");
      })
      .catch((err) => {
        if (err.response.status === 404) return navigate("/onboarding");
      });
  };
  if (props.inCart.includes(user.uid) || inCart) {
    return (
      <button className="button-in-cart rounded-sm" disabled={true}>
        In Cart
      </button>
    );
  }
  if (props.seller === user.uid) {
    return (
      <button className="button-in-cart rounded-sm" disabled={true}>
        Owned
      </button>
    );
  }
  return (
    <button
      className="checkout-button flex items-center justify-center rounded-sm"
      onClick={addToCart}
    >
      Add to cart <IoCart className="ml-2" />
    </button>
  );
};

export default AddCartButton;
