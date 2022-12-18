import { useState, useEffect } from "react";
import { useAPIs } from "../../contexts/api-context";
import { useUser } from "../../contexts/user-context";
import { FrontEndListing } from "../../types/listing";
import { UserType } from "../../types/user";

import UserListings from "../users-page/user-listings";

const SellerListings = () => {
  const APIContext = useAPIs();
  const userContext = useUser();

  const username = userContext.seller;

  const [user, setUser] = useState<UserType>();
  useEffect(() => {
    APIContext.getUser(username).then((value) => {
      setUser(value.data);
    });
  }, [APIContext, username]);
  if (user)
    return (
      <div className="">
        <p className="mb-5">{user.listings.length} listings:</p>
        <UserListings listings={user.listings} />
      </div>
    );
};

export default SellerListings;
