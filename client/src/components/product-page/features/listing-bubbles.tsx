import { Link } from "react-router-dom";
import { IoCart } from "react-icons/io5";
import { ReactComponent as ListingImg } from "../../../images/blob-5.svg";
interface ArticleBubblesProperties {
  className: string;
  title: string;
  productType: string;
  seller: string;
  size: number;
  school: any;
  price: number;
  id: string;
}

const ListingBubbles = (props: ArticleBubblesProperties) => {
  const title = props.title.replace(/ /g, "-");
  return (
    <Link className="main-bubble" to={`/article/${title}/${props.id}`}>
      <div className={`${props.className} h-[12rem] bg-white`}>
        <div className="w-full h-full flex items-center">
          {/* Img component */}
        </div>
      </div>
      <div className={`${props.className} bubble-info`}>
        <div className="w-[90%]">
          <p className="truncate">{props.title}</p>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col">
            <div>
              <p className="price-color text-[20px]">
                ${props.price.toFixed(2)}
              </p>
            </div>
          </div>
          {/* <button className="mt-5 z-20">
            <IoCart size={28} />
          </button> */}
        </div>
      </div>
    </Link>
  );
};

export default ListingBubbles;
