import { IUser } from "../../types/user";
import UserRating from "./profile-rating";

interface ProfilePicProperties {
  user: IUser;
}

const Profile = (props: ProfilePicProperties) => {
  return (
    <div className="my-5 flex items-center">
      <div className="w-24 h-24 bg-black rounded-full" />
      <div className="flex flex-col ml-5 text-[24px]">
        <p className="font-extrabold">
          <span className="mr-1">{props.user.firstname}</span>
          <span>{props.user.lastname}</span>
        </p>
        <p className="opacity-60 text-[16px] font-normal">
          @{props.user.username}
        </p>
        <UserRating rating={props.user.rating} />
      </div>
    </div>
  );
};

export default Profile;
