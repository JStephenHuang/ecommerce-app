import { Link } from "react-router-dom";

import { IListing } from "../../../../types/listing";

import ListingImgActive from "./listing-img-active";

interface ListingBubblesProperties {
  listing: IListing;
  deleteListingHandler: (id: string) => void;
}

const ListingBubblesActive = ({
  listing,
  deleteListingHandler,
}: ListingBubblesProperties) => {
  return (
    <div className="bg-white">
      <ListingImgActive
        listing={listing}
        deleteListingHandler={deleteListingHandler}
      />
      <div className="w-full py-3">
        <Link
          className="flex items-center justify-between"
          to={`/listing/${listing._id}`}
        >
          <p className="text-[20px] font-extrabold tracking-tight truncate">
            {listing.title === "" ? "-" : listing.title}
          </p>
        </Link>
        <p className="font-thin">
          {listing.seller.username} •{" "}
          {listing.school === "" ? "-" : listing.school}
        </p>
        <p className="font-extrabold text-[24px]">
          {listing.price ? <>${listing.price.toFixed(2)}</> : "-"}
        </p>
      </div>
    </div>
  );
};

export default ListingBubblesActive;
