import { useAPIs } from "../../contexts/api-context";
import { useUser } from "../../contexts/user-context";
import { AiOutlineEdit } from "react-icons/ai";
import { Link } from "react-router-dom";

import SellerListings from "./seller-listings";

const ShopInfo = () => {
  const APIContext = useAPIs();
  const userContext = useUser();

  const username = userContext.seller;
  return (
    <div className="w-[80%] rounded-md my-5 p-5">
      <>
        <p className="text-[20px] font-bold">Dashboard</p>
        <hr className="w-full bg-black h-[2px] mb-[1.5rem]" />
      </>
      <>
        <div className="flex items-center justify-between">
          <p className="text-[20px] font-bold">Listing Workshop</p>
          <Link className="create-listing" to="/sell/product-form">
            <p className="mr-2">Create Listing</p> <AiOutlineEdit size={20} />
          </Link>
        </div>
        <hr className="w-full bg-black h-[2px] mb-[1.5rem]" />
        <SellerListings />
      </>

      <div className="w-[full] flex flex-col"></div>
    </div>
  );
};

export default ShopInfo;
