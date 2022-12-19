import { useParams } from "react-router-dom";
import { apiCommands } from "../helper/apiCommands";
import { useQuery } from "react-query";

import { ListingFormType } from "../types/listing";

import LoadingSpinner from "../components/sell-form-page/loading-spinner";
import ListingForm from "../components/shop-page/listings/active/listing-form";

const SellFormPage = () => {
  const params = useParams();
  const id = params.id as string;

  const getListingFormHandler = (id: string) => {
    return async () => (await apiCommands.getListingForm(id)).data;
  };

  const { data, status } = useQuery<ListingFormType>(
    "listingForm",
    getListingFormHandler(id)
  );

  if (status === "loading") {
    return (
      <div className="p-5">
        <div className="grid place-items-center my-5">
          <LoadingSpinner classname="w-8 h-8" />
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="p-5">
        <div className="grid place-items-center my-5">Servers are down.</div>
      </div>
    );
  }

  return <ListingForm form={data} />;
};
export default SellFormPage;
