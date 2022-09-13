import { productTypes } from "../../../docs/options";

const TypeSection = () => {
  return (
    <div className="container">
      <div>
        <p className="text-[16px] font-bold">Product type</p>
        <p className="text-[12px]">Polo, T-shirt, Skirt, etc</p>
      </div>
      <select className="select-button">
        {productTypes.map((type, key) => {
          return (
            <option key={key} value={type.label}>
              {type.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};
export default TypeSection;