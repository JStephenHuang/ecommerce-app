import { Link } from "react-router-dom";

const ListingSeller = (props: { seller: string }) => {
  return (
    <div className="flex items-center">
      <div className="w-16 h-16 bg-black rounded-full" />
      <div className="flex flex-col text-black ml-2">
        <Link to="/" className="hover:underline">
          {props.seller}
        </Link>
        <p className="opacity-50">Canada</p>
      </div>
    </div>
  );
};

export default ListingSeller;
