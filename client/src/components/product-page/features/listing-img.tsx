import { IListing } from "../../../types/listing";
import { useFirebaseAuthUser } from "../../../contexts/firebase-app-context";
import LoadingSpinner from "../../listing-form-page/loading-spinner";
import { useDownloadUrls } from "../../../hooks/use-download-urls";

interface ListingButtonProperties {
  listing: IListing;
}

const ListingImg = ({ listing }: ListingButtonProperties) => {
  const user = useFirebaseAuthUser();
  const imageUrls = useDownloadUrls(listing.imagePaths);

  if (user === undefined) {
    return (
      <div className="h-[10rem] aspect-auto text-white bg-black opacity-80 hover:opacity-70 grid place-items-center">
        <LoadingSpinner classname="w-16 h-16" />
      </div>
    );
  }

  return (
    <div className="h-[15rem] aspect-auto text-white bg-black border shadow-md">
      <img
        className="object-fill h-full w-full hover:opacity-60"
        src={imageUrls[0]}
        alt=""
      />
    </div>
  );
};

export default ListingImg;
