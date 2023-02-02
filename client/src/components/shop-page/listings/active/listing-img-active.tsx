import { useState } from "react";
import { Link } from "react-router-dom";
import { IListing } from "../../../../types/listing";

import { TbEye, TbEdit, TbTrash } from "react-icons/tb";
import { useDownloadUrls } from "../../../../hooks/use-download-urls";
import { useAPIClient } from "../../../../hooks/api-client";

import { timeout } from "../../../../hooks/timeout";
import LoadingSpinner from "../../../status/loading-spinner";

interface ListingButtonProperties {
  listing: IListing;
  getActiveListings: () => void;
}

const ListingImgActive = ({
  listing,
  getActiveListings,
}: ListingButtonProperties) => {
  const client = useAPIClient();
  const imageUrls = useDownloadUrls(listing.imagePaths);

  const [onHover, setOnHover] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  const deleteListingHandler = async (id: string) => {
    setDeleteLoading(true);

    await client.delete(`/listing/${id}`);

    await timeout(500);

    getActiveListings();

    setDeleteLoading(false);
  };
  if (deleteLoading) {
    return (
      <div className="h-[20rem] aspect-auto bg-black group grid place-items-center">
        <LoadingSpinner classname="w-8 h-8" />
      </div>
    );
  }

  return (
    <div
      onMouseEnter={() => setOnHover(true)}
      onMouseLeave={() => setOnHover(false)}
      className="h-[20rem] aspect-auto text-white relative bg-black group"
    >
      <img
        className="w-full h-full group-hover:opacity-70 opacity-80"
        src={imageUrls[0]}
        alt=""
      />
      {onHover ? (
        <div className="w-full h-full flex items-center justify-around absolute top-0 left-0">
          <Link to={`/listing/${listing._id}`}>
            <TbEye className="hover:opacity-50" size={40} />
          </Link>
          <a href={`/shop/listings/${listing._id}/edit`}>
            <TbEdit className="hover:opacity-50" size={40} />
          </a>
          <button onClick={() => deleteListingHandler(listing._id)}>
            <TbTrash className="hover:text-red-600" size={40} />
          </button>
        </div>
      ) : (
        <p className="w-full h-full grid place-items-center text-[24px] absolute top-0 left-0">
          Owned
        </p>
      )}
    </div>
  );
};

export default ListingImgActive;
