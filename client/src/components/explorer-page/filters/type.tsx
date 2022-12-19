import { useState } from "react";
import { clothingTypes } from "../../../docs/options";
import { AiFillCaretRight } from "react-icons/ai";

const FilterType = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const caretStatus = isOpen ? "rotate-90" : "";

  return (
    <div>
      <div className="w-full flex items-center justify-between">
        <p className="font-extrabold">TYPES</p>
        <button
          className={`transition-all ${caretStatus}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <AiFillCaretRight size={16} />
        </button>
      </div>

      <hr className="my-2" />
      {isOpen
        ? clothingTypes.map((type, key) => {
            return (
              <div className="flex items-center ml-2 mb-2">
                <input
                  id={`type_checkbox${key}`}
                  type="checkbox"
                  name="clothingType"
                  className="w-5 aspect-square appearance-none border border-black rounded-md checked:bg-blue-500"
                />

                <label
                  htmlFor={`type_checkbox${key}`}
                  className="w-full ml-2 font-thin"
                >
                  {type.label}
                </label>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default FilterType;
