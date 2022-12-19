import { useEffect, useState } from "react";
import { useAPIClient } from "../../hooks/api-client";
import { useFirebaseAuthUser } from "../../contexts/firebase-app-context";
import LoadingSpinner from "../sell-form-page/loading-spinner";
import { IoCart } from "react-icons/io5";

interface ListingButtonProperties {
  id: string;
  seller: string;
  inCart: [string];
}

const AddCartButton = (props: ListingButtonProperties) => {
  const client = useAPIClient();
  const user = useFirebaseAuthUser();
  const [inCart, setInCart] = useState<boolean>(false);
  const [ownership, setOwnership] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  console.log(user);

  const getRelationListing = async () => {
    setLoading(true);
    if (!user) {
      setInCart(false);
      setLoading(false);
      return;
    }
    if (props.inCart.includes(user.uid)) {
      setInCart(true);
    } else if (props.seller === user.uid) {
      setOwnership(true);
    } else {
      setOwnership(false);
      setInCart(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    getRelationListing();
  }, []);

  const addToCart = async () => {
    setLoading(true);
    client
      .post(`listing/add-cart/${props.id}`)
      .then(() => {
        console.log("Item Successfully Added to Cart!");
        setInCart(true);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  if (loading) {
    return (
      <button
        className="add-to-cart-button flex justify-center"
        disabled={true}
      >
        <LoadingSpinner classname="w-6 h-6" />
      </button>
    );
  } else if (inCart) {
    return (
      <button className="button-in-cart" disabled={true}>
        In Cart
      </button>
    );
  } else if (ownership) {
    return (
      <>
        <button className="button-in-cart" disabled={true}>
          Owned
        </button>
      </>
    );
  } else {
    return (
      <button
        className="checkout-button flex items-center justify-center"
        onClick={addToCart}
      >
        Add to cart <IoCart className="ml-2" />
      </button>
    );
  }
};

export default AddCartButton;
