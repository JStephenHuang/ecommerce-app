import { Link } from "react-router-dom";

import { IListing } from "../../../../types/listing";

import ListingImgDraft from "./listing-img-draft";

interface ListingBubblesProperties {
  listing: IListing;
  deleteListingHandler: (id: string) => void;
}

const ListingBubblesDraft = ({
  listing,
  deleteListingHandler,
}: ListingBubblesProperties) => {
  const title = listing.title.replace(/ /g, "-");

  return (
    <div className="bg-white">
      <ListingImgDraft
        listing={listing}
        deleteListingHandler={deleteListingHandler}
      />
      <div className="w-full py-3">
        <div className="flex items-center justify-between">
          <p className="text-[20px] font-extrabold tracking-tight truncate">
            {listing.title === "" ? "-" : listing.title}
          </p>
        </div>
        <p className="font-thin">
          {listing.seller.username} •
          {listing.school === "" ? "-" : listing.school}
        </p>
        <p className="font-extrabold text-[24px]">
          {listing.price ? <>${listing.price.toFixed(2)}</> : "-"}
        </p>
      </div>
    </div>
  );
};

export default ListingBubblesDraft;
