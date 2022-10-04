import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAPIs } from "../../contexts/APIContext";
import ArticleImg from "./article-img";
import InfoSection from "./info-section";
import ArticleDescription from "./article-description";
import AddToCartButton from "./add-to-cart-button";
import ArticleTitle from "./article-title";

const ArticleInfo = () => {
  const APIContext = useAPIs();
  const [listing, setListing] = useState<{
    title: string;
    productType: string;
    seller: string;
    description: string;
    size: number;
    school: any;
    price: number;
    inCart: [];
    _id: string;
  }>({
    title: "-",
    productType: "-",
    seller: "-",
    description: "-",
    size: 0,
    school: "-",
    price: 0,
    inCart: [],
    _id: "-",
  });
  const params = useParams();
  const title = params.title?.replace(/-/g, " ");
  let id = "";
  if (params.id) id = params.id;

  useEffect(() => {
    APIContext.getListing(id)
      .then((value) => {
        setListing(value.data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  if (listing) {
    return (
      <div className="w-[70%] my-5 p-5">
        <p className="text-[20px] font-bold">Listing Information</p>
        <hr className="w-full bg-[#521945] h-[2px] mb-[1.5rem]" />

        <div className="flex h-[20rem] ">
          <ArticleImg />
          <div className="w-[60%] rounded-lg ml-5 p-3">
            <ArticleTitle id={id} title={title} />

            <div className="h-full flex items-center">
              <div className="flex flex-col w-[50%] justify-between h-full p-5">
                <InfoSection name="Type" value={listing.productType} />
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
