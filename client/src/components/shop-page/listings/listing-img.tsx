import { useState } from "react";
import { Link } from "react-router-dom";
import { ListingType } from "../../../types/listing";

import { AiOutlineEdit, AiOutlineEye } from "react-icons/ai";

interface ListingButtonProperties {
  listing: ListingType;
}

const ListingImg = (props: ListingButtonProperties) => {
  const title = props.listing.title.replace(/ /g, "-");

  const [onHover, setOnHover] = useState<boolean>(false);
  return (
    <div
      onMouseEnter={() => setOnHover(true)}
      onMouseLeave={() => setOnHover(false)}
      className="h-[20rem] aspect-auto text-white bg-black opacity-80"
    >
      {onHover ? (
        <div className="w-full h-full flex items-center justify-around">
          <Link to={`/listing/${title}/${props.listing._id}`}>
            <AiOutlineEye className="hover:opacity-50" size={40} />
          </Link>
          <Link to={`/listing-form/${title}/${props.listing._id}`}>
            <AiOutlineEdit className="hover:opacity-50" size={40} />
          </Link>
        </div>
      ) : (
        <p className="w-full h-full grid place-items-center text-[24px]">
          Owned
        </p>
      )}
    </div>
  );
};

export default ListingImg;
