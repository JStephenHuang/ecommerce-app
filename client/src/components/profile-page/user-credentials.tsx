import { useState } from "react";
import { useAPIs } from "../../contexts/APIContext";
import InfoSection from "./info-section";

const UserCredentials = () => {
  const APIContext = useAPIs();
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
  const username = "Stephen";
  APIContext.getUser(username).then((value) => {
    setUser(value.data);
  });
  return (
    <div className="w-[70%] h-[10%]">
      <div className="flex items-center justify-between">
        <p className="font-bold text-[20px] truncate">User Credentials</p>
      </div>
      <hr className="w-full bg-[#521945] h-[2px]" />
      <div className="flex flex-col">
        <div className="flex flex-col w-[50%] justify-between h-full p-5">
          <InfoSection name="Name" value={user.username} />
        </div>
      </div>
    </div>
  );
};

export default UserCredentials;
