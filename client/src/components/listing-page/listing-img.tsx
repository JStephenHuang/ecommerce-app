import { IListing } from "../../types/listing";
import { useDownloadUrls } from "../../hooks/use-download-urls";
import ListingInteractions from "./listing-interactions";

interface ListingImgProperties {
  listing: IListing;
}

const ListingImg = ({ listing }: ListingImgProperties) => {
  const imageUrls = useDownloadUrls(listing.imagePaths);
  return (
    <div className="w-[50%] h-full flex flex-col">
      <div className="w-full h-[35rem] border bg-white flex flex-col">
        <div className="w-full h-[90%]">
          <img
            className="object-fill h-full w-full"
            src={imageUrls[0]}
            alt=""
          />
        </div>
        <ListingInteractions />
      </div>
      <p className="mt-5">This item is in {listing.inCart.length} cart.</p>
    </div>
  );
};

export default ListingImg;
