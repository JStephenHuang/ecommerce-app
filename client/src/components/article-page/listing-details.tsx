import { ListingType } from "../../types/listing";
import Detail from "./detail";

const ListingDetails = (props: { listing: ListingType }) => {
  return (
    <div className="flex flex-col w-full text-[16px] font-thin my-5">
      <p className="font-extrabold text-[20px]">Details</p>
      <hr className="w-full bg-[#521945] h-[2px] my-2" />

      <Detail label="Price" value={`$${props.listing.price.toFixed(2)}`} />
      <Detail label="School" value={`${props.listing.school.name}`} />
      <Detail label="Type" value={`${props.listing.clothingType}`} />
      <Detail label="Condition" value={`${props.listing.condition}`} />
    </div>
  );
};

export default ListingDetails;
