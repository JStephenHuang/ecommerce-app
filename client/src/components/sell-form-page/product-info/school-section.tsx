import { useState, useEffect } from "react";
import { useAPIClient } from "../../../hooks/api-client";
import { ListingFormType } from "../../../types/listing";

interface SchoolSectionProperties {
  sellForm: ListingFormType;
  handleInputChange: (event: any) => void;
}

const SchoolSection = (props: SchoolSectionProperties) => {
  const client = useAPIClient();

  const [schools, setSchools] = useState<
    Array<{ name: string; product: string }>
  >([]);
  useEffect(() => {
    client.get("/school").then((value) => {
      setSchools(value.data);
    });
  }, []);
  return (
    <div className="container">
      <p className="text-[16px] font-bold">School</p>
      <select
        className={
          props.sellForm.schoolName !== ""
            ? `select-button`
            : `select-button text-gray-400`
        }
        name="schoolName"
        value={props.sellForm.schoolName}
        onChange={props.handleInputChange}
      >
        <option value="" disabled={true}>
          Select School
        </option>
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
