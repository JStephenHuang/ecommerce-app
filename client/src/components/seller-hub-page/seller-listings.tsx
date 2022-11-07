import { useState, useEffect } from "react";
import { useAPIs } from "../../contexts/api-context";
import { useUser } from "../../contexts/user-context";
import { Listing } from "../../types/listing";

import UserListings from "../profile-page/user-listings";

const SellerListings = () => {
  const APIContext = useAPIs();
  const userContext = useUser();

  const username = userContext.seller;

  const [user, setUser] = useState<{
    username: string;
    listings: Array<Listing>;
  }>({
    username: "-",
    listings: [],
  });
  useEffect(() => {
    APIContext.getUser(username).then((value) => {
      setUser(value.data);
    });
  }, [APIContext, username]);

  return (
    <div className="">
      <p className="mb-5">{user.listings.length} listings:</p>
      <UserListings listings={user.listings} />
    </div>
  );
};

export default SellerListings;
