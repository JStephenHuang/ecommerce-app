import { Link } from "react-router-dom";

interface SchoolBubblesProperties {
  classname: string;
  id: string;
  name: string;
  products: number;
}

const SchoolBubbles = (props: SchoolBubblesProperties) => {
  const name = props.name.replace(/ /g, "-");

  return (
    <Link className="main-bubble" to={`/school/${name}/${props.id}`}>
      <div className={`${props.classname} h-[12rem] bg-white rounded-t-lg`} />
      <div
        className={`${props.classname} h-[6rem] bg-[#912F56] rounded-b-lg p-3 flex flex-col justify-center`}
      >
        <p className="text-[20px]">{props.name}</p>
        <p className="text-[#EF798A]">Listings: {props.products}</p>
      </div>
    </Link>
  );
};

export default SchoolBubbles;
