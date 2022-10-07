import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/product-page/navbar/navbar";
import UserInfo from "../components/profile-page/user-info";

const ProfilePage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen">
      <header className="h-[10%] mb-5 ">
        <Navbar />
      </header>
      <button className="back-arrow" onClick={() => navigate(-1)}>
        <AiOutlineArrowLeft size={30} />
      </button>
      <div className="flex flex-col items-center">
        <p className="title">Welcome to the Profile Page</p>
        <UserInfo />
      </div>
      <div className="spacer layered2"></div>
    </div>
  );
};
export default ProfilePage;
