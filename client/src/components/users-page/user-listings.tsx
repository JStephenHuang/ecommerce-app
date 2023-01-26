import { FrontEndListing, IListing } from "../../types/listing";
import ListingBubbles from "../product-page/features/listing-bubbles";

interface UserListingsProperties {
  listings: Array<IListing>;
}

const UserListings = (props: UserListingsProperties) => {
  const listings = props.listings;
  const frontEndListings = listings.map((listing, key) => {
    return <ListingBubbles listing={listing} />;
  });
  return <div className="w-full grid grid-cols-2">{frontEndListings}</div>;
};

export default UserListings;
