import { IListing } from "../../types/listing";
import Detail from "./detail";

const ListingDetails = (props: { listing: IListing }) => {
  return (
    <div className="flex flex-col w-full text-[16px] mb-5">
      <Detail label="Price" value={`$${props.listing.price.toFixed(2)}`} />
      <Detail label="School" value={`${props.listing.school}`} />
      <Detail label="Size" value={`${props.listing.size}`} />
      <Detail label="Type" value={`${props.listing.clothingType}`} />
      <Detail label="Condition" value={`${props.listing.condition}`} />
    </div>
  );
};

export default ListingDetails;
