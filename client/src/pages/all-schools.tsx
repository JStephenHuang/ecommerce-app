import { useState, useEffect } from "react";
import { useAPIs } from "../contexts/api-context";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";

import Navbar from "../components/product-page/navbar/navbar";
import SchoolBubbles from "../components/product-page/features/school-bubbles";

const AllSchools = () => {
  const APIContext = useAPIs();
  const navigate = useNavigate();
  const [schools, setSchools] = useState<
    Array<{ name: string; products: []; _id: string }>
  >([]);
  useEffect(() => {
    APIContext.getSchools().then((value) => {
      setSchools(value.data);
    });
  }, [APIContext]);
  const frontEndSchool = schools.map((school, key) => {
    return (
      <SchoolBubbles
        key={key}
        classname={"w-full"}
        name={school.name}
        products={school.products.length}
        id={school._id}
      />
    );
  });
  return (
    <div className="h-screen w-screen">
      <header className="h-[10%] mb-5">
        <Navbar />
      </header>
      <button className="back-arrow" onClick={() => navigate(-1)}>
        <AiOutlineArrowLeft size={30} />
      </button>
      <div className="flex flex-col items-center">
        <p className="title">All schools</p>
        <div className="w-[80%]">
          <p className="text-[20px] font-bold">{schools.length} schools</p>
          <hr className="w-full bg-[#521945] h-[2px] mb-[1.5rem]" />
        </div>

        <div className="w-[80%] grid grid-cols-2 gap-3 my-5">
          {frontEndSchool}
        </div>
      </div>
    </div>
  );
};

export default AllSchools;
