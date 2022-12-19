import { Link } from "react-router-dom";

interface SchoolBubblesProperties {
  id: string;
  name: string;
  products: number;
}

const SchoolBubbles = (props: SchoolBubblesProperties) => {
  const name = props.name.replace(/ /g, "-");

  return (
    <Link className="bg-white " to={`/school/${name}/${props.id}`}>
      <div className={`h-[20rem] aspect-auto bg-black hover:opacity-70`} />
      <div className="py-3">
        <p className="text-[20px]">{props.name}</p>
        <p className="font-light">Listings: {props.products}</p>
      </div>
    </Link>
  );
};

export default SchoolBubbles;
