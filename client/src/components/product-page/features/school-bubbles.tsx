import { Link } from "react-router-dom";

interface SchoolBubblesProperties {
  id: string;
  name: string;
  products: number;
}

const SchoolBubbles = (props: SchoolBubblesProperties) => {
  const name = props.name.replace(/ /g, "-");

  return (
    <Link
      className="flex flex-col rounded-lg bg-[#912F56] border text-white mx-2 mb-3 shadow-md"
      to={`/school/${name}/${props.id}`}
    >
      <div className="w-[20rem] h-[12rem] bg-white rounded-t-md"></div>
      <div className="w-[20rem] h-[6rem] p-3 flex flex-col justify-center">
        <p className="text-[20px]">{props.name}</p>
        <p className="text-[#EF798A]">Listings: {props.products}</p>
      </div>
    </Link>
  );
};

export default SchoolBubbles;
