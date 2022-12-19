import { ListingType } from "../../types/listing";
import ListingInteractions from "./listing-interactions";

interface ListingImgProperties {
  listing: ListingType;
}

const ListingImg = (props: ListingImgProperties) => {
  return (
    <div className="w-[50%] h-full flex flex-col">
      <div className="w-full h-[35rem] border bg-white flex flex-col">
        <ListingInteractions />
      </div>
      <p className="mt-5">
        This item is in {props.listing.inCart.length} cart.
      </p>
    </div>
  );
};

export default ListingImg;
