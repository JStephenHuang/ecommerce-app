import { conditions } from "../../../docs/options";
import { ListingFormType } from "../../../types/listing";

interface ConditionSectionProperties {
  sellForm: ListingFormType;
  handleInputChange: (event: any) => void;
}

const ConditionSection = (props: ConditionSectionProperties) => {
  return (
    <div className="flex justify-between mb-[1.5rem]">
      <div>
        <p className="text-[16px] font-bold">Condition</p>
        <p className="text-[12px] font-light">New, Old?</p>
      </div>

      <select
        className={
          props.sellForm.condition !== ""
            ? `select-button`
            : `select-button text-gray-400`
        }
        name="condition"
        value={props.sellForm.condition}
        onChange={props.handleInputChange}
      >
        <option value="" disabled={true}>
          Rate Condition (1-10)
        </option>
        {conditions.map((condition, key) => {
          return (
            <option key={key} value={condition.label}>
              {condition.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default ConditionSection;
