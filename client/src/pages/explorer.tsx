import { useAPIClient } from "../hooks/api-client";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { IListing } from "../types/listing";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/product-page/navbar/navbar";
import ExplorerSidebar from "../components/explorer-page/explorer-sidebar";
import ExplorerListings from "../components/explorer-page/explorer-listings";

import LoadingSpinner from "../components/listing-form-page/loading-spinner";

export interface Filters extends Record<string, any> {
  size: string[];
  condition: string[];
  clothingType: (string | null)[];
  school: string[];
}

const ExplorerPage = () => {
  const client = useAPIClient();
  const navigate = useNavigate();

  const [filtersQuery, setFiltersQuery] = useState<Filters>({
    size: [],
    condition: [],
    clothingType: [],
    school: [],
  });

  const getFilteredListingsHandler = async () => {
    const res = await client.get("/listing/explore", { params: filtersQuery });
    return res.data;
  };

  const { data, status, refetch } = useQuery<IListing[]>(
    "getFilteredListing",
    getFilteredListingsHandler
  );

  useEffect(() => {
    refetch();
    let path = "";

    for (const field in filtersQuery) {
      if (filtersQuery[field].length !== 0) {
        path += `${field}=${filtersQuery[field]}&`;
      }
    }

    navigate(`/explorer?${path}`);
  }, [filtersQuery]);

  if (status === "loading") {
    return (
      <div className="grid place-items-center my-5">
        <LoadingSpinner classname="w-8 h-8" />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="grid place-items-center my-5">Servers are down.</div>
    );
  }

  return (
    <div className="h-screen w-screen">
      <header className="h-[10%]">
        <Navbar />
      </header>
      <div className="flex w-full">
        <ExplorerSidebar
          filtersQuery={filtersQuery}
          setFiltersQuery={setFiltersQuery}
        />
        <ExplorerListings listings={data || []} />
      </div>
    </div>
  );
};

export default ExplorerPage;
