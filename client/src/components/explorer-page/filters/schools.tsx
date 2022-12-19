import { useEffect, useState } from "react";
import { AiFillCaretRight } from "react-icons/ai";
import { apiCommands } from "../../../helper/apiCommands";

interface ExplorerSidebarProperties {
  handleFilterChange: (event: any) => void;
}

const FilterSchools = (props: ExplorerSidebarProperties) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const caretStatus = isOpen ? "rotate-90" : "";

  const [schools, setSchools] = useState<
    Array<{ name: string; product: string }>
  >([]);
  useEffect(() => {
    apiCommands.getSchools().then((value) => {
      setSchools(value.data);
    });
  }, []);
  return (
    <div>
      <div className="w-full flex items-center justify-between">
        <p className="font-extrabold">SCHOOLS</p>
        <button
          className={`transition-all ${caretStatus}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <AiFillCaretRight size={16} />
        </button>
      </div>

      <hr className="my-2" />
      {isOpen
        ? schools.map((school, key) => {
            return (
              <div className="mb-2">
                <label
                  htmlFor={`school_checkbox${key}`}
                  className="flex items-center ml-2 font-thin"
                >
                  <input
                    id={`school_checkbox${key}`}
                    type="checkbox"
                    name="school"
                    value={school.name}
                    className="w-5 aspect-square appearance-none border border-black rounded-md checked:bg-blue-500"
                    onChange={props.handleFilterChange}
                  />

                  <p className="ml-2">{school.name}</p>
                </label>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default FilterSchools;
