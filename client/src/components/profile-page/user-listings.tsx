import ListingBubbles from "../product-page/features/listing-bubbles";

interface UserListingsProperties {
  listings: Array<{
    title: string;
    productType: string;
    seller: string;
    size: number;
    school: any;
    price: number;
    _id: string;
  }>;
}

const UserListings = (props: UserListingsProperties) => {
  const listings = props.listings;
  const frontEndListings = listings.map((listing, key) => {
    return (
      <ListingBubbles
        className="w-full"
        key={key}
        title={listing.title}
        productType={listing.productType}
        seller={listing.seller}
        size={listing.size}
        school={listing.school}
        price={listing.price}
        id={listing._id}
      />
    );
  });
  return <div className="w-full grid grid-cols-3">{frontEndListings}</div>;
};

export default UserListings;
