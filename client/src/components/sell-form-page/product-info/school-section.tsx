import { useState, useEffect } from "react";
import { useAPIs } from "../../../contexts/api-context";

interface SchoolSectionProperties {
  selectValue: React.RefObject<HTMLSelectElement>;
}

const SchoolSection = (props: SchoolSectionProperties) => {
  const APIContext = useAPIs();

  const [schools, setSchools] = useState<
    Array<{ name: string; product: string }>
  >([]);
  useEffect(() => {
    APIContext.getSchools().then((value) => {
      setSchools(value.data);
    });
  }, [APIContext]);
  return (
    <div className="container">
      <p className="text-[16px] font-bold">School</p>
      <select className="select-button" ref={props.selectValue}>
        <option value="-">--Choose an option--</option>
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
