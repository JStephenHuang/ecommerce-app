import { useState } from "react";
import { FieldFiltersType, fieldFiltersDefaultValue } from "../types/filters";

import Navbar from "../components/product-page/navbar/navbar";
import ExplorerSidebar from "../components/explorer-page/explorer-sidebar";
import ExplorerListings from "../components/explorer-page/explorer-listings";

const ExplorerPage = () => {
  const [fieldQueries, setFieldQueries] = useState<FieldFiltersType>(
    fieldFiltersDefaultValue
  );
  const [filterQueries, setFilterQueries] = useState<Array<string>>([]);

  const handleFilterChange = (event: any) => {
    const { name, value, checked } = event.target;
    if (checked) {
      setFilterQueries((filterQueries) => [...filterQueries, value]);
    } else {
      setFilterQueries((filterQueries) =>
        filterQueries.filter((query) => query !== value)
      );
    }
    setFieldQueries({
      ...fieldQueries,
      [name]: filterQueries,
    });
    console.log(fieldQueries);
  };
  // useEffect(() => {
  //   setFieldQueries({
  //     ...fieldQueries,
  //     school: filterQueries,
  //   });
  // }, [filterQueries]);

  return (
    <div className="h-screen w-screen">
      <header className="h-[10%]">
        <Navbar />
      </header>
      <ExplorerSidebar handleFilterChange={handleFilterChange} />
      <ExplorerListings />
    </div>
  );
};

export default ExplorerPage;
