import { useEffect, useState } from "react";
import { useAPIs } from "../../contexts/api-context";
import { useUser } from "../../contexts/user-context";
import { UserType } from "../../types/user";

import LoadingSpinner from "../sell-form-page/loading-spinner";
import ProfilePic from "./profile-pic";

const UserInfo = () => {
  const APIContext = useAPIs();
  const userContext = useUser();
  const username = userContext.seller;
  const [user, setUser] = useState<UserType>();
  const [loading, setLoading] = useState<boolean>(false);

  const getUserHandler = async () => {
    setLoading(true);
    setUser((await APIContext.getUser(username)).data);
    setLoading(false);
  };

  useEffect(() => {
    getUserHandler();
  }, [APIContext, username]);

  if (user) {
    return (
      <div className="flex flex-col items-center">
        <p className="title">Welcome to the Profile Page</p>
        <div className="w-[80%] my-5 p-5">
          <div className="flex flex-col">
            <ProfilePic user={user} />
            <div className="w-full flex flex-col" />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="h-[80%] grid place-items-center">
        <LoadingSpinner classname="w-16 h-16" />
      </div>
    );
  }
};

export default UserInfo;
