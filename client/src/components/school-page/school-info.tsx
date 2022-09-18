import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAPIs } from "../../contexts/APIContext";

const SchoolInfo = () => {
  const [school, setSchool] = useState<{
    name: string;
    product: [];
  }>({ name: "-", product: [] });
  const APIContext = useAPIs();
  const params = useParams();
  let id = "";
  if (params.id) id = params.id;
  useEffect(() => {
    APIContext.getSchool(id).then((value) => {
      setSchool(value.data);
    });
  });
  return (
    <div className="w-[70%] my-5 p-5">
      <p className="text-[20px] font-bold">Every Listings from {school.name}</p>
      <hr className="w-full bg-[#521945] h-[2px] mb-[1.5rem]" />
    </div>
  );
};
export default SchoolInfo;
