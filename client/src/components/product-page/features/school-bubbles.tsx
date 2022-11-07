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
      <div className={`${props.classname} h-[12rem] bg-white`} />
      <div className={`${props.classname} bubble-info`}>
        <p className="text-[20px]">{props.name}</p>
        <p className="text-gray-300">Listings: {props.products}</p>
      </div>
    </Link>
  );
};

export default SchoolBubbles;
