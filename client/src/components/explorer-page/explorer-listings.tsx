import { IListing } from "../../types/listing";
import ListingBubbles from "../product-page/features/listing-bubbles";

interface ExplorerListingsProperties {
  listings: IListing[];
}

const ExplorerListings = (props: ExplorerListingsProperties) => {
  const frontEndListings = props.listings.map((listing, key) => {
    return <ListingBubbles key={key} listing={listing} />;
  });

  console.log(props.listings);

  return (
    <div className="w-full p-5">
      <div className="grid grid-cols-4 gap-3 w-full">{frontEndListings}</div>
    </div>
  );
};

export default ExplorerListings;
