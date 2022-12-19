import { useState } from "react";
import { AiFillCaretRight } from "react-icons/ai";
import { sizes } from "../../../docs/options";

const FilterSizes = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const caretStatus = isOpen ? "rotate-90" : "";
  return (
    <div>
      <div className="w-full flex items-center justify-between">
        <p className="font-extrabold">SIZES</p>
        <button
          className={`transition-all ${caretStatus}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <AiFillCaretRight size={16} />
        </button>
      </div>

      <hr className="my-2" />
      {isOpen
        ? sizes.map((size, key) => {
            return (
              <div className="flex items-center ml-2 mb-2">
                <input
                  id={`size_checkbox${key}`}
                  type="checkbox"
                  name="size"
                  value={size.value}
                  className="w-5 aspect-square appearance-none border border-black rounded-md checked:bg-blue-500"
                />

                <label
                  htmlFor={`size_checkbox${key}`}
                  className="w-full ml-2 font-thin"
                >
                  {size.label}
                </label>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default FilterSizes;
