import { ListingType } from "../../types/listing";
import AddCartButton from "./add-cart-button";
import BuyNowButton from "./buy-now-button";
import ArticleTitle from "./article-title";
import ListingSeller from "./listing-seller";
import ListingDetails from "./listing-details";
import ListingInteractions from "./listing-interactions";

interface ListingOptionsProperties {
  listing: ListingType;
}

const ListingOptions = (props: ListingOptionsProperties) => {
  return (
    <div className="w-[30%] flex flex-col rounded-lg ml-10">
      <ArticleTitle id={props.listing._id} title={props.listing.title} />
      <div className="flex flex-col h-[6.5rem] justify-between">
        <ListingSeller seller={props.listing.seller.username} />
        <ListingInteractions />
      </div>
      <ListingDetails listing={props.listing} />
      <div className="w-full flex flex-col items-start">
        <p className="text-[#58cb67] font-bold text-[28px]">
          ${props.listing.price.toFixed(2)}
        </p>
        <div className="w-full text-[20px] font-extrabold">
          <AddCartButton
            id={props.listing._id}
            inCart={props.listing.inCart}
            seller={props.listing.seller._id}
          />
        </div>
        <div className="w-full text-[20px] font-extrabold">
          <BuyNowButton />
        </div>
      </div>
    </div>
  );
};

export default ListingOptions;
