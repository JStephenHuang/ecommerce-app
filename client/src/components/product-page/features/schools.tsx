import { useEffect, useState } from "react";
import { useAPIs } from "../../../contexts/APIContext";
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
  }, []);

  const frontEndSchools: JSX.Element[] = schools.map((school, key) => {
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
    <div className="w-[80%] my-5">
      <div className="flex justify-between">
        <p className="">Schools</p>
        <a className="underline hover:text-[#912F56]" href="">
          See all
        </a>
      </div>

      <div className="flex w-full my-5 overflow-x-auto">{frontEndSchools}</div>
    </div>
  );
};

export default Schools;
