import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { useFirebaseAuthUser } from "../../../../contexts/firebase-app-context";
import { useAPIClient } from "../../../../hooks/api-client";
import { IListing } from "../../../../types/listing";
import LoadingSpinner from "../../../status/loading-spinner";
import ListingBubblesDraft from "../drafts/listing-bubble-draft";

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

const ListingDrafts = () => {
  const client = useAPIClient();

  const [drafts, setDrafts] = useState<IListing[]>([]);

  const { isLoading, isError, refetch } = useQuery<IListing[]>({
    queryKey: "getDrafts",
    queryFn: async () => (await client.get("/user/drafts")).data,
    onSuccess: (listings) => setDrafts(listings),
    onError: (_) => {
      throw new Error("RequestError: failed to fetch drafts.");
    },
  });

  const deleteListingHandler = async (id: string) => {
    await client.delete(`/draft/${id}`);
    refetch();
  };

  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorState />;

  const frontEndListings = drafts.map((listing, key) => {
    return (
      <ListingBubblesDraft
        key={key}
        listing={listing}
        deleteListingHandler={deleteListingHandler}
      />
    );
  });

  return (
    <div className="px-5">
      <p className="text-[20px]">Draft</p>
      <hr className="w-[full] h-[2px] bg-black" />
      {drafts.length === 0 ? (
        <div className="w-full flex justify-center py-40">
          <p className="">You have no drafts.</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3 w-full my-5">
          {frontEndListings}
        </div>
      )}
    </div>
  );
};

export default ListingDrafts;
