import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAPIClient } from "../../hooks/api-client";
import { IListing } from "../../types/listing";

import LoadingSpinner from "../listing-form-page/loading-spinner";
import ListingOverview from "./listing-overview";
import ListingNotFound from "./listing-not-found";
import ListingImg from "./listing-img";

const Listing = () => {
  const client = useAPIClient();
  const params = useParams();
  const id = params.id;

  const [listing, setListing] = useState<IListing>();
  const [loading, setLoading] = useState<boolean>(false);

  const getListingHandler = async () => {
    setLoading(true);
    setListing((await client.get(`/listing/${id}`)).data);
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
