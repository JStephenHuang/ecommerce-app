import { Link } from "react-router-dom";
import { FrontEndListing } from "../../../types/listing";

const ListingBubbles = (props: FrontEndListing) => {
  const title = props.title.replace(/ /g, "-");
  console.log(props.images);

  return (
    <Link className="main-bubble" to={`/article/${title}/${props._id}`}>
      <div className="h-[12rem] bg-white">
        <div className="w-full h-full flex items-center">
          {props.images ? <img src="" alt="" /> : null}
        </div>
      </div>
      <div className="listing-bubble-info">
        <div>
          <p className="truncate ">{props.title}</p>
          <p className="price-color ">${props.price.toFixed(2)}</p>
        </div>
        <div className="bg-white h-10 w-10 rounded-full"></div>
      </div>
    </Link>
  );
};

export default ListingBubbles;
