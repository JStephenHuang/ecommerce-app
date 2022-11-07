import { Listing } from "../../types/listing";
import ListingBubbles from "../product-page/features/listing-bubbles";

interface UserListingsProperties {
  listings: Array<Listing>;
}

const UserListings = (props: UserListingsProperties) => {
  const listings = props.listings;
  const frontEndListings = listings.map((listing, key) => {
    return (
      <ListingBubbles
        className="w-full"
        key={key}
        title={listing.title}
        productType={listing.clothingType}
        seller={listing.seller}
        size={listing.size}
        school={listing.school}
        price={listing.price}
        id={listing._id}
      />
    );
  });
  return <div className="w-full grid grid-cols-2">{frontEndListings}</div>;
};

export default UserListings;
