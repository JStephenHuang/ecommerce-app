import { useEffect, useState } from "react";
import { useAPIClient } from "../../../hooks/api-client";
import { Link } from "react-router-dom";

import SchoolBubbles from "./school-bubbles";
import { useQuery } from "react-query";
import { ISchool } from "../../../types/school";

const Schools = () => {
  const client = useAPIClient();

  const getAllSchoolHandler = async (): Promise<ISchool[]> => {
    const res = await client.get("/school");
    return res.data;
  };

  const { data, status } = useQuery<ISchool[]>(
    "getAllSchools",
    getAllSchoolHandler
  );

  const schools = data || [];

  const frontEndSchools: JSX.Element[] = schools
    .slice(0, 4)
    .map((school, key) => {
      return <SchoolBubbles key={key} name={school.name} id={school._id} />;
    });

  return (
    <div className="w-[80%]">
      <div className="flex justify-between items-center mt-10">
        <p className="text-[24px] font-bold">Popular Schools</p>
        <Link to={"/schools"} className="hover:opacity-50">
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
