import { useQuery } from "react-query";
import { IListing } from "../../../../types/listing";
import { useAPIClient } from "../../../../hooks/api-client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import LoadingSpinner from "../../../listing-form-page/loading-spinner";
import ListingBubblesActive from "./listing-bubbles-active";
import { useFirebaseAuthUser } from "../../../../contexts/firebase-app-context";

const LoadingState = () => {
  return (
    <div className="p-5">
      <p className="text-[20px]">Active</p>
      <hr className="w-[full] h-[2px] bg-black" />
      <div className="grid place-items-center my-5">
        <LoadingSpinner classname="w-8 h-8" />
      </div>
    </div>
  );
};

const ErrorState = () => {
  return (
    <div className="p-5">
      <p className="text-[20px]">Active</p>
      <hr className="w-[full] h-[2px] bg-black" />
      <div className="grid place-items-center my-5">Servers are down.</div>
    </div>
  );
};

const ActiveListings = () => {
  const client = useAPIClient();
  const user = useFirebaseAuthUser();
  const navigate = useNavigate();
  const [listings, setListings] = useState<IListing[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getActiveListings = async () => {
    await client
      .get("/user/listings")
      .then((value) => {
        if (value.data === undefined) {
          setLoading(true);
        } else {
          setListings(value.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (err.response.status === 404) navigate("/onboarding");
      });
  };

  useEffect(() => {
    if (user === null) navigate("/login");
    getActiveListings();
  }, [user]);

  // const { isLoading, isError, refetch } = useQuery<IListing[]>({
  //   queryKey: "getActiveListings",
  //   queryFn: async () => {
  //     return (await client.get("/user/listings")).data;
  //   },
  //   onSuccess: (listings) => setListings(listings),
  //   onError: (err) => {
  //     throw new Error("RequestError: failed to fetch active listings.");
  //   },
  // });

  const deleteListingHandler = async (id: string) => {
    await client.delete(`/listing/${id}`);
    getActiveListings();
  };

  if (loading) return <LoadingState />;
  // if (isError) return <ErrorState />;

  return (
    <div className="px-5">
      <p className="text-[20px]">Active</p>
      <hr className="w-[full] h-[2px] bg-black" />
      {listings.length === 0 ? (
        <div className="w-full flex justify-center py-40">
          <p className="">You have no active listings.</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3 w-full my-5">
          {listings.map((listing, key) => (
            <ListingBubblesActive
              key={key}
              listing={listing}
              deleteListingHandler={deleteListingHandler}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ActiveListings;
