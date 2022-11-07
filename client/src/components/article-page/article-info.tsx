import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useAPIs } from "../../contexts/api-context";
import ArticleImg from "./article-img";
import InfoSection from "./info-section";
import ArticleDescription from "./article-description";
import AddToCartButton from "./add-to-cart-button";
import ArticleTitle from "./article-title";
import LoadingSpinner from "../sell-form-page/loading-spinner";
import { useUser } from "../../contexts/user-context";
import { Listing, listingDefaultValue } from "../../types/listing";

const ArticleInfo = () => {
  const APIContext = useAPIs();
  const userContext = useUser();
  const [listing, setListing] = useState<Listing>();
  const params = useParams();
  const title = params.title?.replace(/-/g, " ");
  let id = "";
  if (params.id) id = params.id;

  const getListingHandler = async () => {
    setLoading(true);
    setListing((await APIContext.getListing(id)).data);
    setLoading(false);
  };

  const deleteListingHandler = async (user: string, id: string) => {
    setLoading(true);
    await APIContext.deleteListing(user, id);
    setListing((await APIContext.getListing(id)).data);
    setLoading(false);
  };

  useEffect(() => {
    getListingHandler();
  }, []);

  const [loading, setLoading] = useState<boolean>(true);

  if (loading) {
    return (
      <div className="h-[60%] grid place-items-center">
        <LoadingSpinner classname="w-16 h-16" />
      </div>
    );
  } else if (listing) {
    return (
      <div className="w-[70%] my-5 p-5">
        <p className="text-[20px] font-bold">Listing Information</p>
        <hr className="w-full bg-[#521945] h-[2px] mb-[1.5rem]" />

        <div className="flex h-[20rem] ">
          <ArticleImg />
          <div className="w-[60%] rounded-lg ml-5 p-3">
            <ArticleTitle
              id={id}
              title={title}
              deleteListingHandler={deleteListingHandler}
            />

            <div className="h-full flex items-center">
              <div className="flex flex-col w-[50%] justify-between h-full p-5">
                <InfoSection name="Type" value={listing.clothingType} />
                <InfoSection name="School" value={listing.school.name} />
                <InfoSection name="Size" value={listing.size} />
                <InfoSection name="Seller" value={listing.seller} />
                <InfoSection
                  name="Price"
                  value={"$" + listing.price.toFixed(2)}
                />
              </div>
              <div className="flex flex-col h-full w-[50%] mr-5 rounded-lg p-5">
                <ArticleDescription description={listing.description} />
                <AddToCartButton id={id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <div className="mt-10">
          Article not found, the owner might have removed the item or the item
          has been sold.
        </div>
      </>
    );
  }
};

export default ArticleInfo;
