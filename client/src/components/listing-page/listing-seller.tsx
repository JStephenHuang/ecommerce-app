import { Link } from "react-router-dom";
import { IUser } from "../../types/user";
import { MdSell } from "react-icons/md";

import UserRating from "../users-page/user-rating";

const ListingSeller = (props: { seller: IUser }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div className="w-16 h-16 bg-black rounded-full" />
        <div className="flex flex-col text-black ml-2">
          <Link
            to={`/${props.seller.username}`}
            className="hover:underline font-bold"
          >
            {props.seller.username}
          </Link>
          <p className="opacity-50 font-normal">Canada</p>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <UserRating rating={props.seller.rating} />
        <div className="flex items-center font-normal">
          <MdSell className="mr-2" />0 sold
        </div>
      </div>
    </div>
  );
};

export default ListingSeller;
