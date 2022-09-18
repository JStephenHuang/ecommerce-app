import { useEffect, useState } from "react";
import { useAPIs } from "../../contexts/APIContext";

interface AddToCartButtonProperties {
  id: string;
}

const AddToCartButton = (props: AddToCartButtonProperties) => {
  const APIContext = useAPIs();
  const username = "Leo";
  const [inCart, setInCart] = useState<boolean>(false);
  useEffect(() => {
    APIContext.getCart(username).then((value) => {
      const cart = value.data;
      const userArticles = cart.articles.map((article: any) => article._id);
      console.log(userArticles);
      if (userArticles.includes(props.id)) {
        setInCart(true);
      } else {
        setInCart(false);
      }
    });
  });
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
  if (!inCart) {
    return (
      <button
        className="checkout-button text-center mt-auto"
        onClick={addToCart}
      >
        Add to Cart
      </button>
    );
  } else {
    return (
      <button
        className="checkout-button-in-cart text-center mt-auto"
        disabled={true}
      >
        In Cart
      </button>
    );
  }
};

export default AddToCartButton;
