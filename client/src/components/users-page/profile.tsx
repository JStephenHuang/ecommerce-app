import { IUser } from "../../types/user";
import UserRating from "./user-rating";

interface ProfilePicProperties {
  user: IUser;
}

const Profile = (props: ProfilePicProperties) => {
  return (
    <div className="w-full h-full flex items-center">
      <div className="w-24 h-24 bg-black rounded-full" />
      <div className="flex flex-col ml-5 text-[24px]">
        <p className="font-extrabold">{props.user.username}</p>
        <p className="opacity-60 text-[16px] font-normal">@leoguo</p>
        <UserRating rating={props.user.rating} />
      </div>
    </div>
  );
};

export default Profile;
