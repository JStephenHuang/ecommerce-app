import { useEffect, useState } from "react";
import { apiCommands } from "../../helper/apiCommands";
import { useUser } from "../../contexts/user-context";
import { IoCart } from "react-icons/io5";
import LoadingSpinner from "../sell-form-page/loading-spinner";

interface ListingButtonProperties {
  id: string;
  seller: string;
  inCart: [string];
}

const AddCartButton = (props: ListingButtonProperties) => {
  const userContext = useUser();
  const username = userContext.buyer;
  const [inCart, setInCart] = useState<boolean>(false);
  const [ownership, setOwnership] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const getRelationListing = async () => {
    setLoading(true);
    const user = (await apiCommands.getUser(username)).data;
    if (props.inCart.includes(user._id)) {
      setInCart(true);
    } else if (props.seller === user._id) {
      setOwnership(true);
    } else {
      setOwnership(false);
      setInCart(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    getRelationListing();
  }, [apiCommands, username]);

  const addToCart = async () => {
    setLoading(true);
    apiCommands
      .addCartItem(username, props.id)
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
      <button className="add-to-cart-button" disabled={true}>
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
