import { FrontEndListing } from "../../types/listing";
import ListingBubbles from "../product-page/features/listing-bubbles";

interface UserListingsProperties {
  listings: Array<FrontEndListing>;
}

const UserListings = (props: UserListingsProperties) => {
  const listings = props.listings;
  const frontEndListings = listings.map((listing, key) => {
    return (
      <ListingBubbles
        key={key}
        title={listing.title}
        school={listing.school}
        price={listing.price}
        images={[]}
        _id={listing._id}
      />
    );
  });
  return <div className="w-full grid grid-cols-2">{frontEndListings}</div>;
};

export default UserListings;
