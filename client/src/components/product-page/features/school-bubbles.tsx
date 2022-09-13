interface SchoolBubblesProperties {
  name: string;
}

const SchoolBubbles = (props: SchoolBubblesProperties) => {
  return (
    <div className="flex flex-col rounded-md bg-[#912F56] border border-[#912F56] text-white mx-2 mb-3">
      <div className="w-[16rem] h-[12rem] bg-white rounded-t-md"></div>
      <div className="w-[16rem] h-[4rem] p-3 flex items-center justify-center">
        {props.name}
      </div>
    </div>
  );
};

export default SchoolBubbles;
