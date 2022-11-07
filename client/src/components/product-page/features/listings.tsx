import { useEffect, useState } from "react";
import { useAPIs } from "../../../contexts/api-context";
import { Listing } from "../../../types/listing";
import ListingBubbles from "./listing-bubbles";

const Listings = () => {
  const APIContext = useAPIs();
  const [listings, setListings] = useState<Array<Listing>>([]);
  useEffect(() => {
    APIContext.getListings().then((value) => {
      setListings(value.data);
    });
  }, []);

  const frontEndArticles = listings.slice(0, 8).map((listing, key) => {
    return (
      <ListingBubbles
        className=""
        key={key}
        title={listing.title}
        productType={listing.clothingType}
        seller={listing.seller}
        size={listing.size}
        school={listing.school}
        price={listing.price}
        id={listing._id}
      />
    );
  });

  return (
    <div id="" className="w-[80%]">
      <div className="flex justify-between">
        <p className="text-[24px] font-bold">Uniforms</p>

        <a className="underline hover:text-[#912F56]" href="">
          See all
        </a>
      </div>

      <div className="grid grid-rows-2 grid-cols-4 gap-2 w-full my-5">
        {frontEndArticles}
      </div>
    </div>
  );
};

export default Listings;
