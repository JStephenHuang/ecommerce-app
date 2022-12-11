import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAPIs } from "../../../contexts/api-context";
import SchoolBubbles from "./school-bubbles";

const Schools = () => {
  const APIContext = useAPIs();
  const [schools, setSchools] = useState<
    Array<{ name: string; products: []; _id: string }>
  >([]);
  useEffect(() => {
    APIContext.getSchools().then((value) => {
      setSchools(value.data);
    });
  }, [APIContext]);

  const frontEndSchools: JSX.Element[] = schools
    .slice(0, 4)
    .map((school, key) => {
      return (
        <SchoolBubbles
          key={key}
          name={school.name}
          products={school.products.length}
          id={school._id}
        />
      );
    });

  return (
    <div className="w-[80%]">
      <div className="flex justify-between">
        <p className="text-[24px] font-bold mt-10">Popular Schools</p>
        <Link to={"/schools"} className="underline hover:text-[#912F56]">
          See all
        </Link>
      </div>

      <div className="grid grid-rows-1 grid-cols-4 gap-2 w-full my-5">
        {frontEndSchools}
      </div>
    </div>
  );
};

export default Schools;
