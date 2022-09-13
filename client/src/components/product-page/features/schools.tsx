import { useEffect, useState } from "react";
import { useAPIs } from "../../../contexts/APIContext";
import SchoolBubbles from "./school-bubbles";

const Schools = () => {
  const APIContext = useAPIs();
  const [schools, setSchools] =
    useState<Array<{ name: string; product: string }>>();
  useEffect(() => {
    APIContext.getSchools().then((value) => {
      setSchools(value.data);
    });
  }, []);

  console.log(schools);

  if (!schools) return null;

  const frontEndSchools: JSX.Element[] = schools.map((school, key) => {
    return <SchoolBubbles name={school.name} />;
  });

  return (
    <div className="flex w-full my-5 overflow-x-auto">{frontEndSchools}</div>
  );
};

export default Schools;
