import { useEffect, useState } from "react";
import { apiCommands } from "../../../helper/apiCommands";
import { useUser } from "../../../contexts/user-context";
import { ListingType } from "../../../types/listing";

import LoadingSpinner from "../../sell-form-page/loading-spinner";
interface ListingButtonProperties {
  listing: ListingType;
}

const ListingImg = (props: ListingButtonProperties) => {
  const userContext = useUser();
  const username = userContext.buyer;
  const [inCart, setInCart] = useState<boolean>(false);
  const [ownership, setOwnership] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const getRelationListing = async () => {
    setLoading(true);
    const user = (await apiCommands.getUser(username)).data;
    if (props.listing.inCart.includes(user._id)) {
      setInCart(true);
    } else if (props.listing.seller._id === user._id) {
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

  if (loading) {
    return <LoadingSpinner classname="w-6 h-6" />;
  } else if (inCart) {
    return (
      <div className="h-[20rem] aspect-auto text-white bg-black opacity-80 hover:opacity-70 grid place-items-center">
        <p className="text-[24px]">In Cart</p>
      </div>
    );
  } else if (ownership) {
    return (
      <div className="h-[20rem] aspect-auto text-white bg-black opacity-80 hover:opacity-70 grid place-items-center">
        <p className="text-[24px]">Owned</p>
      </div>
    );
  } else {
    return <div className="h-[20rem] aspect-auto bg-black hover:opacity-70" />;
  }
};

export default ListingImg;
