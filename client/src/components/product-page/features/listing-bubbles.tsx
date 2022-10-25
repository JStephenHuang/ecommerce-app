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
      <div className={`${props.className} h-[12rem] bg-white rounded-t-lg`}>
        <div className="w-full h-full flex items-center">
          {/* Img component */}
        </div>
      </div>
      <div
        className={`${props.className} h-[6rem] bg-[#912F56] rounded-b-lg p-3 flex flex-col justify-center`}
      >
        <div className="w-[90%]">
          <p className="truncate">{props.title}</p>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col">
            <div>
              <p className="text-[#F7C4A5] text-[20px]">
                ${props.price.toFixed(2)}
              </p>
            </div>

            <div className="flex">
              <p className="text-[#EF798A]">Seller: {props.seller}</p>
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
