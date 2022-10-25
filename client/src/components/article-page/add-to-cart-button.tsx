import { useEffect, useState } from "react";
import { useAPIs } from "../../contexts/api-context";
import { useUser } from "../../contexts/user-context";
import LoadingSpinner from "../sell-page/loading-spinner";

interface AddToCartButtonProperties {
  id: string;
}

const AddToCartButton = (props: AddToCartButtonProperties) => {
  const APIContext = useAPIs();
  const userContext = useUser();
  const username = userContext.buyer;
  const [inCart, setInCart] = useState<boolean>(false);
  const [ownership, setOwnership] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    APIContext.getCartItems(username).then((value) => {
      const cart = value.data;
      const userCartListingsId = cart.listings.map(
        (listings: any) => listings._id
      );
      console.log(userCartListingsId);
      if (userCartListingsId.includes(props.id)) {
        setInCart(true);
      } else {
        setInCart(false);
      }
    });
  }, [APIContext, username]);

  useEffect(() => {
    setLoading(true);
    APIContext.getUserListings(username).then((value) => {
      const userListings = value.data;
      const userListingsId = userListings.map((listings: any) => listings._id);
      console.log(userListingsId);
      console.log("----");

      if (userListingsId.includes(props.id)) {
        setLoading(false);
        setOwnership(true);
      } else {
        setLoading(false);
        setOwnership(false);
      }
    });
  }, []);
  const addToCart = async () => {
    setLoading(true);
    {
      APIContext.addCartItem(username, props.id)
        .then(() => {
          console.log("Item Successfully Added to Cart!");
          setInCart(true);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  };
  if (loading) {
    return (
      <button
        className="checkout-button items-center text-center mt-auto flex justify-center"
        disabled={true}
      >
        <LoadingSpinner classname="w-8 h-8" />
      </button>
    );
  } else if (inCart) {
    return (
      <button
        className="checkout-button-in-cart text-center mt-auto"
        disabled={true}
      >
        In Cart
      </button>
    );
  } else if (ownership) {
    return (
      <>
        <button
          className="checkout-button-in-cart text-center mt-auto"
          disabled={true}
        >
          Owned
        </button>
      </>
    );
  } else {
    return (
      <button
        className="checkout-button text-center mt-auto"
        onClick={addToCart}
      >
        Add to Cart
      </button>
    );
  }
};

export default AddToCartButton;
