import { title } from "process";
import { Link } from "react-router-dom";

interface ArticleBubblesProperties {
  title: string;
  productType: string;
  seller: string;
  size: number;
  school: any;
  price: number;
  id: string;
}

const ArticleBubbles = (props: ArticleBubblesProperties) => {
  const title = props.title.replace(/ /g, "-");
  return (
    <Link className="article-bubble" to={`/article/${title}/${props.id}`}>
      <div className="w-[20rem] h-[12rem] bg-white rounded-t-md"></div>
      <div className="w-[20rem] h-[6rem] p-3 flex flex-col justify-center">
        <div>
          <p className="">{props.title}</p>
        </div>

        <div>
          <p className="text-[#F7C4A5] text-[20px]">${props.price}</p>
        </div>

        <div className="flex">
          <p className="text-[#EF798A]">Seller: {props.seller}</p>
        </div>
      </div>
    </Link>
  );
};

export default ArticleBubbles;
