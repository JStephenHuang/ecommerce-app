import { clothingTypes } from "../../../docs/options";

interface TypeSectionProperties {
  selectValue: React.RefObject<HTMLSelectElement>;
}

const TypeSection = (props: TypeSectionProperties) => {
  return (
    <div className="container">
      <div>
        <p className="text-[16px] font-bold">Product type</p>
        <p className="text-[12px]">Polo, T-shirt, Skirt, etc</p>
      </div>
      <select className="select-button" ref={props.selectValue}>
        {clothingTypes.map((clothingType, key) => {
          return (
            <option key={key} value={clothingType.label}>
              {clothingType.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};
export default TypeSection;
