import { sizes } from "../../../docs/options";

interface SizeSectionProperties {
  selectValue: React.RefObject<HTMLSelectElement>;
}

const SizeSection = (props: SizeSectionProperties) => {
  return (
    <div className="flex justify-between mb-[1.5rem]">
      <div>
        <p className="text-[16px] font-bold">Size</p>
        <p className="text-[12px]">Medium, Small, etc</p>
      </div>

      <select className="select-button" ref={props.selectValue}>
        {sizes.map((size, key) => {
          return (
            <option key={key} value={size.label}>
              {size.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SizeSection;
