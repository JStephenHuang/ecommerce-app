import { ListingFormType } from "../../../types/listing";

interface TitleSectionProperties {
  sellForm: ListingFormType;
  handleInputChange: (event: any) => void;
}

const TitleSection = (props: TitleSectionProperties) => {
  return (
    <div className="flex justify-between mb-[1.5rem]">
      <div className="w-[30%]">
        <p className="text-[16px] font-bold">Title</p>
        <p className="text-[12px] font-light">
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
          name="title"
          value={props.sellForm.title}
          onChange={props.handleInputChange}
        />
        <p className="text-[12px] text-gray-500 ml-auto">
          {props.sellForm.title.length}/60
        </p>
      </div>
    </div>
  );
};

export default TitleSection;
