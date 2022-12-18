import { sizes } from "../../../docs/options";
import { ListingFormType } from "../../../types/listing";

interface SizeSectionProperties {
  sellForm: ListingFormType;
  handleInputChange: (event: any) => void;
}

const SizeSection = (props: SizeSectionProperties) => {
  return (
    <div className="flex justify-between mb-[1.5rem]">
      <div>
        <p className="text-[16px] font-bold">Size</p>
        <p className="text-[12px] font-light">Medium, Small, etc</p>
      </div>

      <select
        className={
          props.sellForm.size !== ""
            ? `select-button`
            : `select-button text-gray-400`
        }
        name="size"
        value={props.sellForm.size}
        onChange={props.handleInputChange}
      >
        <option value="" disabled={true}>
          Select Size
        </option>
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
