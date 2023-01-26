import { Dispatch, SetStateAction, useState } from "react";
import { conditions, sizes, clothingTypes, schools } from "../../docs/options";
import { Filters } from "../../pages/explorer";
import { IoCaretDown, IoCaretForward } from "react-icons/io5";

interface ExplorerSidebarProperties {
  filtersQuery: Filters;
  setFiltersQuery: Dispatch<SetStateAction<Filters>>;
}

interface FiltersProperties {
  field: string;
  filters: Array<{ value: string; label: string }>;
  handleFilters: (filter: string[]) => void;
}

const Filter = ({ field, filters, handleFilters }: FiltersProperties) => {
  const [checked, setChecked] = useState<Array<string>>([]);
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const onSelectChange = (filter: string) => {
    const currentIndex = checked.indexOf(filter);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(filter);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
    handleFilters(newChecked);
  };

  const frontEndFilters = filters.map((filter, key) => (
    <div key={key} className="flex items-center mb-2 ml-7">
      <input
        type="checkbox"
        className="w-4 aspect-square border rounded border-black checked:bg-red-500 appearance-none"
        value={filter.value}
        onChange={() => onSelectChange(filter.value)}
        checked={checked.indexOf(filter.value) === -1 ? false : true}
      />
      <label htmlFor="" className="ml-2 font-light">
        {filter.label}
      </label>
    </div>
  ));

  return (
    <div className="flex flex-col mb-2">
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="font-light mb-2 flex items-center"
      >
        {collapsed ? (
          <IoCaretForward className="mr-2" size={16} />
        ) : (
          <IoCaretDown className="mr-2" size={16} />
        )}
        {field}
      </button>

      {collapsed ? null : frontEndFilters}
    </div>
  );
};

const ExplorerSidebar = ({
  filtersQuery,
  setFiltersQuery,
}: ExplorerSidebarProperties) => {
  const handleFilters = (filters: string[], category: string) => {
    const newFilters = { ...filtersQuery };

    newFilters[category] = filters;

    setFiltersQuery(newFilters);
  };

  return (
    <div className="w-[25%] h-full flex flex-col border-r-[0.5px] p-3">
      <p className="font-extrabold text-[24px] mb-2">Filters</p>
      <Filter
        field="School"
        filters={schools}
        handleFilters={(filters) => handleFilters(filters, "school")}
      />
      <Filter
        field="Type"
        filters={clothingTypes}
        handleFilters={(filters) => handleFilters(filters, "clothingType")}
      />
      <Filter
        field="Size"
        filters={sizes}
        handleFilters={(filters) => handleFilters(filters, "size")}
      />
      <Filter
        field="Condition"
        filters={conditions}
        handleFilters={(filters) => handleFilters(filters, "condition")}
      />
    </div>
  );
};

export default ExplorerSidebar;
