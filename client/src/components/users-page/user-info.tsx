import { useEffect, useState } from "react";
import { IUser } from "../../types/user";
import { useAPIClient } from "../../hooks/api-client";

import LoadingSpinner from "../listing-form-page/loading-spinner";
import Profile from "./profile";

const UserInfo = () => {
  const client = useAPIClient();
  const [user, setUser] = useState<IUser>();
  const [loading, setLoading] = useState<boolean>(false);

  const getUserHandler = async () => {
    setLoading(true);
    setUser((await client.get(`/user`)).data);
    setLoading(false);
  };

  useEffect(() => {
    getUserHandler();
  }, []);

  if (user) {
    return (
      <div className="flex flex-col items-center">
        <p className="title">Welcome to the Profile Page</p>
        <div className="w-[80%] my-5 p-5">
          <div className="flex flex-col">
            <Profile user={user} />
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
