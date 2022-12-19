import { useEffect, useState } from "react";
import { useAPIClient } from "../../../hooks/api-client";
import { Link } from "react-router-dom";

import SchoolBubbles from "./school-bubbles";

const Schools = () => {
  const client = useAPIClient();
  const [schools, setSchools] = useState<
    Array<{ name: string; listings: []; _id: string }>
  >([]);

  useEffect(() => {
    client.get("/school").then((value) => {
      console.log(value.data);
      setSchools(value.data);
    });
  }, []);

  const frontEndSchools: JSX.Element[] = schools
    .slice(0, 4)
    .map((school, key) => {
      return (
        <SchoolBubbles
          key={key}
          name={school.name}
          products={school.listings.length}
          id={school._id}
        />
      );
    });

  return (
    <div className="w-[80%]">
      <div className="flex justify-between items-center mt-10">
        <p className="text-[24px] font-bold">Popular Schools</p>
        <Link to={"/schools"} className="underline hover:opacity-50">
          See all
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 w-full my-5">
        {frontEndSchools}
      </div>
    </div>
  );
};

export default Schools;
