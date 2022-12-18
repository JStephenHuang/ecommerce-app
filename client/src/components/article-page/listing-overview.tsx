import { ListingType } from "../../types/listing";
import AddCartButton from "./add-cart-button";
import BuyNowButton from "./buy-now-button";
import ListingSeller from "./listing-seller";
import WriteReviewButton from "./write-review-button";
import ListingDetails from "./listing-details";
import ListingDescription from "./listing-description";

interface ListingOverviewProperties {
  listing: ListingType;
}

const ListingOverview = (props: ListingOverviewProperties) => {
  return (
    <div className="w-[30%] flex flex-col rounded-lg ml-10">
      <p className="w-full text-[24px] font-extrabold truncate">
        {props.listing.title}
      </p>
      <hr className="w-full bg-black h-[2px] mb-5" />

      <div className="flex flex-col">
        <ListingSeller seller={props.listing.seller} />
      </div>
      <p className="my-5 italic">Free shipping</p>

      <ListingDetails listing={props.listing} />

      <div className="w-full flex flex-col items-start">
        <p className="text-[#58cb67] font-bold text-[30px] my-2">
          ${props.listing.price.toFixed(2)}
        </p>
        <div className="w-full text-[20px] font-extrabold">
          <AddCartButton
            id={props.listing._id}
            inCart={props.listing.inCart}
            seller={props.listing.seller._id}
          />
          <BuyNowButton />
        </div>
      </div>

      <ListingDescription description={props.listing.description} />
    </div>
  );
};

export default ListingOverview;
