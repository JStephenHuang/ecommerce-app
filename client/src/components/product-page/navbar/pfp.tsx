import { Link } from "react-router-dom";

const ProfilePic = () => {
  return (
    <Link
      className="h-[30px] w-[30px] rounded-full bg-black"
      to="/profile"
    ></Link>
  );
};

export default ProfilePic;
