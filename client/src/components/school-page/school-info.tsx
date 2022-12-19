import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAPIClient } from "../../hooks/api-client";
import { FrontEndListing, ListingType } from "../../types/listing";
import ListingBubbles from "../product-page/features/listing-bubbles";

const SchoolInfo = () => {
  const [school, setSchool] = useState<{
    name: string;
    listings: Array<ListingType>;
  }>({ name: "-", listings: [] });
  const client = useAPIClient();
  const params = useParams();
  let id = "";
  if (params.id) id = params.id;
  useEffect(() => {
    client.get(`/school/${id}`).then((value) => {
      setSchool(value.data);
    });
  }, [id]);
  console.log(school);

  const frontEndSchoolListings = school.listings.map((schoolListing, key) => {
    return <ListingBubbles key={key} listing={schoolListing} />;
  });
  return (
    <div className="w-[70%] my-5 p-5">
      <p className="text-[20px] font-bold">Every Listing from {school.name}</p>
      <hr className="w-full bg-[#521945] h-[2px] mb-[1.5rem]" />
      <div className="flex flex-col">{school.listings.length} listings:</div>
      <div className="w-full my-5 grid grid-cols-2 gap-3">
        {frontEndSchoolListings}
      </div>
    </div>
  );
};
export default SchoolInfo;
