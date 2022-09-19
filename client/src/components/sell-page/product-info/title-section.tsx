import { useRef, useState } from "react";
import { productTypes } from "../../../docs/options";

interface TitleSectionProperties {
  inputValue: React.RefObject<HTMLInputElement>;
}

const TitleSection = (props: TitleSectionProperties) => {
  const [charCount, setCharCount] = useState<number>(0);
  return (
    <div className="flex justify-between mb-[1.5rem]">
      <div className="w-[30%]">
        <p className="text-[16px] font-bold">Title</p>
        <p className="text-[12px]">
          Title is the first thing client will read, So it's important to be
          descriptive
        </p>
      </div>
      <div className="w-[60%] h-[15%] flex flex-col">
        <input
          className="input"
          type="text"
          placeholder="ex: Large Black Hoodie from Notre Dame 4-5 years old..."
          maxLength={60}
          ref={props.inputValue}
          onChange={() => {
            if (props.inputValue.current) {
              setCharCount(props.inputValue.current.value.length);
            }
          }}
        />
        <p className="text-[12px] text-gray-500 ml-auto">{charCount}/60</p>
      </div>
    </div>
  );
};

export default TitleSection;
