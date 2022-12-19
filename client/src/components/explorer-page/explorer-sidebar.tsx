import FilterSizes from "./filters/sizes";
import FilterType from "./filters/type";
import FilterSchools from "./filters/schools";

interface ExplorerSidebarProperties {
  handleFilterChange: (event: any) => void;
}

const ExplorerSidebar = (props: ExplorerSidebarProperties) => {
  return (
    <div className="w-[25%] h-full flex flex-col border-r-[1.5px] p-3">
      <p className="font-extrabold text-[30px] mb-3">Filters</p>
      <div className="flex flex-col">
        <FilterSchools handleFilterChange={props.handleFilterChange} />

        <FilterSizes />

        <FilterType />
      </div>
    </div>
  );
};

export default ExplorerSidebar;
