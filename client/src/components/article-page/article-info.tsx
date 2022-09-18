import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAPIs } from "../../contexts/APIContext";
import ArticleImg from "./article-img";
import InfoSection from "./info-section";
import ArticleDescription from "./article-description";
import AddToCartButton from "./add-to-cart-button";
import ArticleTitle from "./article-title";

const ArticleInfo = () => {
  const APIContext = useAPIs();
  const [article, setArticle] = useState<{
    title: string;
    productType: string;
    seller: string;
    description: string;
    size: number;
    school: any;
    price: number;
    inCart: [];
    _id: string;
  }>({
    title: "-",
    productType: "-",
    seller: "-",
    description: "-",
    size: 0,
    school: "-",
    price: 0,
    inCart: [],
    _id: "-",
  });

  const params = useParams();
  const title = params.title?.replace(/-/g, " ");
  let id = "";
  if (params.id) id = params.id;

  useEffect(() => {
    APIContext.getArticle(id).then((value) => {
      setArticle(value.data);
    });
  }, []);

  return (
    <div className="w-[70%] my-5 p-5">
      <p className="text-[20px] font-bold">Article Information</p>
      <hr className="w-full bg-[#521945] h-[2px] mb-[1.5rem]" />

      <div className="flex h-[20rem] ">
        <ArticleImg />
        <div className="w-[60%] rounded-lg ml-5 p-3">
          <ArticleTitle title={title} />
          <div className="h-full flex items-center">
            <div className="flex flex-col w-[50%] justify-between h-full p-5">
              <InfoSection name="Type" value={article.productType} />
              <InfoSection name="School" value={article.school.name} />
              <InfoSection name="Size" value={article.size} />
              <InfoSection name="Seller" value={article.seller} />
              <InfoSection
                name="Price"
                value={"$" + article.price.toFixed(2)}
              />
            </div>
            <div className="flex flex-col h-full w-[50%] mr-5 rounded-lg p-5">
              <ArticleDescription description={article.description} />
              <AddToCartButton id={id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleInfo;
