import { apiCommands } from "../../../../helper/apiCommands";
import { useUser } from "../../../../contexts/user-context";
import { useQuery } from "react-query";
import { ListingType } from "../../../../types/listing";

import LoadingSpinner from "../../../sell-form-page/loading-spinner";
import ListingBubbles from "../listing-bubbles";

const ActiveListings = () => {
  const userContext = useUser();

  const getUserListingsHandler = async () => {
    return (await apiCommands.getUserListings(userContext.seller)).data;
  };

  const { data, status } = useQuery(
    "userActiveListings",
    getUserListingsHandler
  );

  if (status === "loading") {
    return (
      <div className="p-5">
        <p className="text-[20px]">Active</p>
        <hr className="w-[full] h-[2px] bg-black" />
        <div className="grid place-items-center my-5">
          <LoadingSpinner classname="w-8 h-8" />
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="p-5">
        <p className="text-[20px]">Active</p>
        <hr className="w-[full] h-[2px] bg-black" />
        <div className="grid place-items-center my-5">Servers are down.</div>
      </div>
    );
  }

  const listings: ListingType[] = data;

  const frontEndListings = listings.map((listing, key) => {
    return <ListingBubbles key={key} listing={listing} />;
  });

  return (
    <div className="p-5">
      <p className="text-[20px]">Active</p>
      <hr className="w-[full] h-[2px] bg-black" />
      <div className="grid grid-rows-2 grid-cols-3 gap-3 w-full my-5">
        {frontEndListings}
      </div>
    </div>
  );
};

export default ActiveListings;
