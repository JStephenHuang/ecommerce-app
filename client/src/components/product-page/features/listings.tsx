import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAPIClient } from "../../../hooks/api-client";
import { ListingType } from "../../../types/listing";
import ListingBubbles from "./listing-bubbles";

const Listings = () => {
  const client = useAPIClient();
  const [listings, setListings] = useState<Array<ListingType>>([]);
  useEffect(() => {
    client.get("/listing").then((value) => {
      setListings(value.data);
    });
  }, []);

  const frontEndArticles = listings.slice(0, 15).map((listing, key) => {
    return <ListingBubbles key={key} listing={listing} />;
  });

  return (
    <div className="w-[80%]">
      <div className="flex justify-between items-center mt-10">
        <p className="text-[24px] font-bold">Top Uniforms</p>

        <Link to="/explorer" className="underline hover:opacity-50">
          See all
        </Link>
      </div>

      <div className="grid grid-rows-2 grid-cols-3 gap-3 w-full my-5">
        {frontEndArticles}
      </div>
    </div>
  );
};

export default Listings;
