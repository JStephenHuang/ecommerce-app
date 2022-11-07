import { useAPIs } from "../../contexts/api-context";
import { useUser } from "../../contexts/user-context";

import SellerListings from "./seller-listings";
import InfoSection from "../profile-page/info-section";
import { Link } from "react-router-dom";

const SellerHubInfo = () => {
  const APIContext = useAPIs();
  const userContext = useUser();

  const username = userContext.seller;
  return (
    <div className="w-[80%] rounded-md my-5 p-5">
      <>
        <p className="text-[20px] font-bold">Dashboard</p>
        <hr className="w-full bg-black h-[2px] mb-[1.5rem]" />
        <div className="flex">
          <div className="w-[20%]">
            <InfoSection name="Seller" value={userContext.seller} />
          </div>
          <div className="w-[80%] flex flex-col items-center">
            <div className="text-[24px] font-bold">Reviews</div>
          </div>
        </div>
      </>

      <p className="text-[20px] font-bold">Seller's Listings</p>
      <hr className="w-full bg-black h-[2px] mb-[1.5rem]" />
      <SellerListings />
      <Link to="/sell/product-form">Create Listings</Link>

      <div className="w-[full] flex flex-col"></div>
    </div>
  );
};

export default SellerHubInfo;
