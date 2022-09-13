import { sizes } from "../../../docs/options";

const SizeSection = () => {
  return (
    <div className="flex justify-between mb-[1.5rem]">
      <p className="text-[16px] font-bold">Size</p>
      <select className="select-button">
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
