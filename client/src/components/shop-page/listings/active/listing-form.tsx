import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ListingFormType,
  listingFormDefaultValue,
} from "../../../../types/listing";
import { apiCommands } from "../../../../helper/apiCommands";

import Navbar from "../../../product-page/navbar/navbar";
import ProductDetail from "../../../sell-form-page/product-detail/product-detail";
import ProductInfo from "../../../sell-form-page/product-info/product-info";

interface ListingFormProperties {
  form?: ListingFormType;
}

const ListingForm = (props: ListingFormProperties) => {
  const [sellForm, setSellForm] = useState<ListingFormType>(
    props.form as ListingFormType
  );
  const params = useParams();
  const navigate = useNavigate();

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setSellForm({
      ...sellForm,
      [name]: value,
    });
  };

  const publish = async () => {
    apiCommands
      .createListing(sellForm)
      .then(() => {
        console.log("Item Successfully Listed");
        navigate("/shop/listings");
      })
      .catch((err) => {
        console.log(err + " Something Went Wrong");
      });
  };

  return (
    <div className="h-screen w-screen">
      <header className="h-[10%] mb-5">
        <Navbar />
      </header>
      <div className="flex flex-col items-center">
        <p className="title">Welcome to the Sell Form</p>
        <ProductInfo
          key={0}
          sellForm={sellForm}
          handleInputChange={handleInputChange}
        />
        <ProductDetail
          key={1}
          sellForm={sellForm}
          handleInputChange={handleInputChange}
        />
        <div className="w-[60%] flex flex-col items-end pb-10 ">
          <button className="publish-button group" onClick={publish}>
            <p className="mr-[5px] font-extrabold">Publish</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingForm;
