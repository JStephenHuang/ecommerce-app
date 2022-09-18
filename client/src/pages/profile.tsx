import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/product-page/navbar/navbar";

const ProfilePage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen">
      <header className="h-[10%]">
        <Navbar />
      </header>
      <button
        className="ml-10 text-gray-400 hover:text-red-600 ease-in-out duration-150"
        onClick={() => navigate(-1)}
      >
        <AiOutlineArrowLeft size={30} />
      </button>
      <div className="title">Welcome to the Profile Page</div>
    </div>
  );
};
export default ProfilePage;
