interface SchoolBubblesProperties {
  name: string;
  products: number;
}

const SchoolBubbles = (props: SchoolBubblesProperties) => {
  return (
    <div className="flex flex-col rounded-md bg-[#912F56] border border-[#912F56] text-white mx-2 mb-3">
      <div className="w-[20rem] h-[12rem] bg-white rounded-t-md"></div>
      <div className="w-[20rem] h-[6rem] p-3 flex flex-col justify-center">
        <p className="text-[20px]">{props.name}</p>
        <p className="text-[#EF798A]">Listings: {props.products}</p>
      </div>
    </div>
  );
};

export default SchoolBubbles;
