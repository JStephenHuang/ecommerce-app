import { useEffect, useState } from "react";
import { useAPIs } from "../../../contexts/APIContext";
import ListingBubbles from "./listing-bubbles";

const Articles = () => {
  const APIContext = useAPIs();
  const [listings, setListings] = useState<
    Array<{
      title: string;
      productType: string;
      seller: string;
      size: number;
      school: any;
      price: number;
      _id: string;
    }>
  >([]);
  useEffect(() => {
    APIContext.getListings().then((value) => {
      setListings(value.data);
    });
  }, []);

  const frontEndArticles = listings.map((listing, key) => {
    return (
      <ListingBubbles
        className="w-[20rem]"
        key={key}
        title={listing.title}
        productType={listing.productType}
        seller={listing.seller}
        size={listing.size}
        school={listing.school}
        price={listing.price}
        id={listing._id}
      />
    );
  });

  return (
    <div id="" className="w-[80%] my-5">
      <div className="flex justify-between">
        <p className="">Uniforms</p>

        <a className="underline hover:text-[#912F56]" href="">
          See all
        </a>
      </div>

      <div className="flex w-full my-5 overflow-x-auto">{frontEndArticles}</div>
    </div>
  );
};

export default Articles;
