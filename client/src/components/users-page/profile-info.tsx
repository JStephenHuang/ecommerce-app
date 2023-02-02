import { MdSell, MdOutlinePublic } from "react-icons/md";
import { IUser } from "../../types/user";
import Profile from "./profile";

interface ProfileInfoProperties {
  user: IUser;
}

const Following = () => {
  return (
    <div className="w-1/3 text-[20px] flex items-center justify-between font-light">
      <p>
        <span className="font-extrabold">0</span> Followers
      </p>
      <p>
        <span className="font-extrabold">0</span> Following
      </p>
      <button className="px-[30px] py-[4px] text-[16px] bg-black rounded-sm text-white hover:opacity-50 font-bold">
        Follow
      </button>
    </div>
  );
};

const Stats = () => {
  return (
    <div className="w-1/4 flex items-center justify-between font-light">
      <p>
        <div className="flex items-center">
          <MdOutlinePublic className="mr-1" />
          <span className="font-extrabold mr-1">0</span> Active Listings
        </div>
      </p>
      <p>
        <div className="flex items-center">
          <MdSell className="mr-1" />
          <span className="font-extrabold mr-1">0</span> Sold
        </div>
      </p>
    </div>
  );
};

const ProfileInfo = ({ user }: ProfileInfoProperties) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-4/5 flex flex-col">
        <Profile user={user} />
        <Following />

        <div className="flex flex-col font-light w-1/3 my-5">
          Hello i like selling things, Im a bad bitch that yk sell clothing,
          cleavage, shoes like Lance yk
        </div>

        <Stats />
      </div>
    </div>
  );
};

export default ProfileInfo;
