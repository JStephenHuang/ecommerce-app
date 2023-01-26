import { Link } from "react-router-dom";
import ActiveListings from "./active/active-listings";
import ListingDrafts from "./drafts/listing-drafts";

const ShopListings = () => {
  return (
    <div className="w-[80%] h-full flex flex-col">
      <div className="h-[10%] p-5 flex items-center justify-between">
        <p className="font-extrabold text-[30px]">Shop's listings</p>
      </div>
      <ActiveListings />
      <ListingDrafts />
      <div className="h-[90%] grid place-content-center"></div>
    </div>
  );
};

export default ShopListings;
