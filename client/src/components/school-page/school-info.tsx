import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAPIs } from "../../contexts/api-context";
import { FrontEndListing } from "../../types/listing";
import ListingBubbles from "../product-page/features/listing-bubbles";

const SchoolInfo = () => {
  const [school, setSchool] = useState<{
    name: string;
    products: Array<FrontEndListing>;
  }>({ name: "-", products: [] });
  const APIContext = useAPIs();
  const params = useParams();
  let id = "";
  if (params.id) id = params.id;
  useEffect(() => {
    APIContext.getSchool(id).then((value) => {
      setSchool(value.data);
    });
  }, [APIContext, id]);
  console.log(school);

  const frontEndSchoolArticles = school.products.map((schoolListing, key) => {
    return (
      <ListingBubbles
        key={key}
        title={schoolListing.title}
        school={schoolListing.school}
        price={schoolListing.price}
        images={[]}
        _id={schoolListing._id}
      />
    );
  });
  return (
    <div className="w-[70%] my-5 p-5">
      <p className="text-[20px] font-bold">Every Listing from {school.name}</p>
      <hr className="w-full bg-[#521945] h-[2px] mb-[1.5rem]" />
      <div className="flex flex-col">{school.products.length} listings:</div>
      <div className="w-full my-5 grid grid-cols-3 gap-3">
        {frontEndSchoolArticles}
      </div>
    </div>
  );
};
export default SchoolInfo;
