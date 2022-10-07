import { useEffect, useState } from "react";
import { useAPIs } from "../../contexts/APIContext";
import { useUser } from "../../contexts/UserContext";

interface AddToCartButtonProperties {
  id: string;
}

const AddToCartButton = (props: AddToCartButtonProperties) => {
  const APIContext = useAPIs();
  const userContext = useUser();
  const username = userContext.buyer;
  const [inCart, setInCart] = useState<boolean>(false);

  const [ownership, setOwnership] = useState<boolean>(false);
  useEffect(() => {
    APIContext.getCart(username).then((value) => {
      const cart = value.data;
      const userCartListingsId = cart.articles.map(
        (listings: any) => listings._id
      );
      console.log(userCartListingsId);
      if (userCartListingsId.includes(props.id)) {
        setInCart(true);
      } else {
        setInCart(false);
      }
    });
  }, []);

  useEffect(() => {
    APIContext.getUserListings(username).then((value) => {
      const userListings = value.data;
      const userListingsId = userListings.map((listings: any) => listings._id);
      console.log(userListingsId);
      console.log("----");

      if (userListingsId.includes(props.id)) {
        setOwnership(true);
      } else {
        setOwnership(false);
      }
    });
  }, []);
  const addToCart = () => {
    {
      APIContext.addToCart(username, props.id)
        .then(() => {
          console.log("Item Successfully Added to Cart!");
          setInCart(true);
        })
        .catch((err) => console.log(err));
    }
  };
  if (inCart) {
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
