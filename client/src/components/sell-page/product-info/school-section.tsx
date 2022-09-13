import { useState, useEffect, useRef } from "react";
import { useAPIs } from "../../../contexts/APIContext";

const SchoolSection = () => {
  const APIContext = useAPIs();

  const [schools, setSchools] = useState<
    Array<{ name: string; product: string }>
  >([]);
  useEffect(() => {
    APIContext.getSchools().then((value) => {
      setSchools(value.data);
    });
  }, []);
  return (
    <div className="container">
      <p className="text-[16px] font-bold">School</p>
      <select className="select-button">
        {schools.map((school, key) => {
          return (
            <option key={key} value={school.name}>
              {school.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SchoolSection;
