import ProfilePic from "./profile-pic";
import UserCredentials from "./user-credentials";

const UserInfo = () => {
  return (
    <div className="w-[80%] my-5 p-5">
      <div className="flex justify-center">
        <ProfilePic />
        <UserCredentials />
      </div>
    </div>
  );
};

export default UserInfo;
