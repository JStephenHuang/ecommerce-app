import { Listing } from "../../types/listing";

interface ProfilePicProperties {
  user: {
    username: string;
    listings: Array<Listing>;
  };
}

const ProfilePic = (props: ProfilePicProperties) => {
  return (
    <div className="w-[20%] h-full flex flex-col items-center justify-between">
      <div className="w-48 h-48 bg-black rounded-full" />
      <div className="flex items-center mt-5">
        <p className="text-[24px]">{props.user.username}</p>
        <p className="text-[24px] text-gray-500">#2431</p>
      </div>
      <button className="edit-button w-[70%] mt-5">Edit profile</button>
    </div>
  );
};

export default ProfilePic;
