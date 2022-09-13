const DescriptionSection = () => {
  return (
    <div className="flex justify-between mb-[1.5rem]">
      <p className="text-[16px] font-bold">Description</p>
      <textarea
        className="text-area"
        rows={5}
        placeholder="Describe the state of your product..."
      ></textarea>
    </div>
  );
};

export default DescriptionSection;
