import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/product-page/navbar/navbar";
import SchoolInfo from "../components/school-page/school-info";

const SchoolPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const name = params.name?.replace(/-/g, " ");

  return (
    <div className="h-screen w-screen">
      <header className="h-[10%] mb-10">
        <Navbar />
      </header>
      <button
        className="ml-10 text-gray-400 hover:text-red-600 ease-in-out duration-150"
        onClick={() => navigate(-1)}
      >
        <AiOutlineArrowLeft size={30} />
      </button>
      <div className="flex flex-col items-center"></div>
      <div className="spacer layer2">
        <div className="flex flex-col items-center">
          <p className="title">{name}</p>
          <SchoolInfo />
        </div>
      </div>
    </div>
  );
};

export default SchoolPage;
