import { useState, useEffect } from "react";
import { useAPIClient } from "../hooks/api-client";

import Navbar from "../components/product-page/navbar/navbar";
import SchoolBubbles from "../components/product-page/features/school-bubbles";
import { ISchool } from "../types/school";
import { useQuery } from "react-query";

const AllSchools = () => {
  const client = useAPIClient();

  const getAllSchoolHandler = async (): Promise<ISchool[]> => {
    const res = await client.get("/school");
    return res.data;
  };

  const { data, status } = useQuery<ISchool[]>(
    "getAllSchools",
    getAllSchoolHandler
  );

  if (status === "loading") {
  }

  if (status === "error") {
  }

  const frontEndSchool = (data || []).map((school, key) => {
    return <SchoolBubbles key={key} name={school.name} id={school._id} />;
  });
  return (
    <div className="h-screen w-screen">
      <header className="h-[10%] mb-5">
        <Navbar />
      </header>
      <div className="flex flex-col items-center">
        <p className="title">All schools</p>
        <div className="w-[80%]">
          <p className="text-[20px] font-bold">{(data || []).length} schools</p>
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
