import { useState } from "react";
import { IListing } from "../../../../types/listing";

import { TbEdit, TbTrash } from "react-icons/tb";

import { useDownloadUrls } from "../../../../hooks/use-download-urls";

interface ListingButtonProperties {
  listing: IListing;
  deleteListingHandler: (id: string) => void;
}

const ListingImgDraft = ({
  listing,
  deleteListingHandler,
}: ListingButtonProperties) => {
  const [onHover, setOnHover] = useState<boolean>(false);
  const imageUrls = useDownloadUrls(listing.imagePaths);

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

export default ListingImgDraft;
