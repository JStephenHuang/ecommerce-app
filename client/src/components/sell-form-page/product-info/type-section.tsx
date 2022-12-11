import { clothingTypes } from "../../../docs/options";
import { ListingFormType } from "../../../types/listing";

interface TypeSectionProperties {
  sellForm: ListingFormType;
  handleInputChange: (event: any) => void;
}

const TypeSection = (props: TypeSectionProperties) => {
  return (
    <div className="container">
      <div>
        <p className="text-[16px] font-bold">Product type</p>
        <p className="text-[12px] font-light">Polo, T-shirt, Skirt, etc</p>
      </div>
      <select
        className={
          props.sellForm.clothingType !== ""
            ? `select-button`
            : `select-button text-gray-400`
        }
        name="clothingType"
        value={props.sellForm.clothingType}
        onChange={props.handleInputChange}
      >
        <option value="" disabled={true}>
          Select Type
        </option>
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
