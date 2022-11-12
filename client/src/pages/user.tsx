import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/product-page/navbar/navbar";
import UserInfo from "../components/users-page/user-info";

const UserPage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen">
      <header className="h-[10%] mb-5 ">
        <Navbar />
      </header>
      <button className="back-arrow" onClick={() => navigate(-1)}>
        <AiOutlineArrowLeft size={30} />
      </button>

      <UserInfo />
    </div>
  );
};
export default UserPage;
