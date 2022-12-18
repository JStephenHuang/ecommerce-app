import { Link } from "react-router-dom";
import { useUser } from "../../../contexts/user-context";

const ProfilePic = () => {
  const userContext = useUser();
  return (
    <Link
      className="h-[30px] w-[30px] rounded-full bg-black"
      to={`/${userContext.seller}`}
    ></Link>
  );
};

export default ProfilePic;
