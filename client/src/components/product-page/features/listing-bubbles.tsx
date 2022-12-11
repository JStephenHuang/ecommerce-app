import { Link } from "react-router-dom";
import { FrontEndListing } from "../../../types/listing";
import { BsBookmark } from "react-icons/bs";

const ListingBubbles = (props: FrontEndListing) => {
  const title = props.title.replace(/ /g, "-");
  console.log(props.images);

  return (
    <Link className="main-bubble" to={`/listing/${title}/${props._id}`}>
      <div className="h-[12rem] bg-blue-200">
        <div className="w-full h-full flex items-center">
          {props.images ? <img src="" alt="" /> : null}
        </div>
      </div>
      <div className="listing-bubble-info">
        <div className="w-full">
          <p className="truncate">{props.title}</p>
          <div className="w-full flex items-center justify-between">
            <p className="price-color ">${props.price.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ListingBubbles;
