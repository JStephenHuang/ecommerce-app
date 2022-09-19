import { conditions } from "../../../docs/options";

const ConditionSection = () => {
  return (
    <div className="flex justify-between mb-[1.5rem]">
      <div>
        <p className="text-[16px] font-bold">Condition</p>
        <p className="text-[12px]">New, Old?</p>
      </div>

      <select className="select-button">
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