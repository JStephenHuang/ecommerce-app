import { useEffect, useState } from "react";
import { useAPIs } from "../../contexts/api-context";
import { useUser } from "../../contexts/user-context";
import ProfilePic from "./profile-pic";
import UserCredentials from "./user-credentials";
import UserListings from "./user-listings";

const UserInfo = () => {
  const APIContext = useAPIs();
  const userContext = useUser();
  const username = userContext.seller;
  const [user, setUser] = useState<{
    username: string;
    listings: Array<{
      title: string;
      productType: string;
      seller: string;
      size: number;
      school: any;
      price: number;
      _id: string;
    }>;
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
    <div className="w-[80%] my-5 p-5">
      <div className="flex justify-between ">
        <ProfilePic user={user} />
        <div className="w-[75%] flex flex-col">
          <UserCredentials user={user} />
          <div className="w-[full]">
            <p className="mb-5">{user.listings.length} listings:</p>
            <UserListings listings={user.listings} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
