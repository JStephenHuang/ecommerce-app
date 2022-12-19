import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAPIs } from "../../contexts/api-context";
import { ListingType } from "../../types/listing";

import LoadingSpinner from "../sell-form-page/loading-spinner";
import ListingOverview from "./listing-overview";
import ListingNotFound from "./listing-not-found";
import ListingImg from "./listing-img";

const Listing = () => {
  const APIContext = useAPIs();
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id as string;

  const [listing, setListing] = useState<ListingType>();
  const [loading, setLoading] = useState<boolean>(false);

  const getListingHandler = async () => {
    setLoading(true);
    setListing((await APIContext.getListing(id)).data);
    setLoading(false);
  };

  const deleteListingHandler = async (user: string, id: string) => {
    setLoading(true);
    await APIContext.deleteListing(user, id);
    navigate("/");
    setLoading(false);
  };

  useEffect(() => {
    getListingHandler();
  }, []);

  if (loading) {
    return (
      <div className="h-[80%] grid place-items-center">
        <LoadingSpinner classname="w-16 h-16" />
      </div>
    );
  } else if (listing) {
    return (
      <div className="flex flex-col items-center">
        <div className="w-[80%] my-10">
          <div className="flex h-auto">
            <ListingImg listing={listing} />

            <ListingOverview listing={listing} />
          </div>
        </div>
      </div>
    );
  } else {
    return <ListingNotFound />;
  }
};

export default Listing;
