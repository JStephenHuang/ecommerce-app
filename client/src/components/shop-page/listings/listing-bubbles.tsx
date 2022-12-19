import { Link } from "react-router-dom";

import { ListingType } from "../../../types/listing";

import ListingImg from "./listing-img";

interface ListingBubblesProperties {
  listing: ListingType;
}

const ListingBubbles = ({ listing }: ListingBubblesProperties) => {
  const title = listing.title.replace(/ /g, "-");

  return (
    <div className="bg-white">
      <ListingImg listing={listing} />
      <div className="w-full py-3">
        <Link
          className="flex items-center justify-between"
          to={`/listing/${title}/${listing._id}`}
        >
          <p className="text-[20px] font-normal tracking-tight truncate">
            {listing.title}
          </p>
        </Link>
        <p className="font-thin">
          {listing.seller.username} • {listing.school.name}
        </p>
        <p className="font-extrabold text-[24px]">
          ${listing.price.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default ListingBubbles;
