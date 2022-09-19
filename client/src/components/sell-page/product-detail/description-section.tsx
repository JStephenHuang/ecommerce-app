import { useState } from "react";

interface PriceSectionProperties {
  inputValue: React.RefObject<HTMLTextAreaElement>;
}

const DescriptionSection = (props: PriceSectionProperties) => {
  const [charCount, setCharCount] = useState<number>(0);

  return (
    <div className="flex justify-between mb-[1.5rem]">
      <div className="w-[30%]">
        <p className="text-[16px] font-bold">Description</p>
        <p className="text-[12px]">
          Describe your listing: the more details, the better for buyers!
        </p>
      </div>

      <div className="w-[60%] h-[15%] flex flex-col">
        <textarea
          className="text-area"
          rows={7}
          placeholder="Describe the state of your product... at least 30 characters"
          ref={props.inputValue}
          onChange={() => {
            if (props.inputValue.current) {
              setCharCount(props.inputValue.current.value.length);
            }
          }}
        ></textarea>
        <p className="text-[12px] text-gray-500 ml-auto">{charCount}/30</p>
      </div>
    </div>
  );
};

export default DescriptionSection;
