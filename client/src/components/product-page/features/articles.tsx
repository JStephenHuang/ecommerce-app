import { useEffect, useState } from "react";
import { useAPIs } from "../../../contexts/APIContext";
import ArticleBubbles from "./article-bubbles";

const Articles = () => {
  const APIContext = useAPIs();
  const [articles, setArticles] = useState<
    Array<{
      title: string;
      productType: string;
      seller: string;
      size: number;
      school: any;
      price: number;
      _id: string;
    }>
  >([]);
  useEffect(() => {
    APIContext.getListings().then((value) => {
      setArticles(value.data);
    });
  }, []);

  const frontEndArticles = articles.map((article, key) => {
    return (
      <ArticleBubbles
        className="w-[20rem]"
        key={key}
        title={article.title}
        productType={article.productType}
        seller={article.seller}
        size={article.size}
        school={article.school}
        price={article.price}
        id={article._id}
      />
    );
  });

  return (
    <div id="" className="w-[80%] my-5">
      <div className="flex justify-between">
        <p className="">Uniforms</p>

        <a className="underline hover:text-[#912F56]" href="">
          See all
        </a>
      </div>

      <div className="flex w-full my-5 overflow-x-auto">{frontEndArticles}</div>
    </div>
  );
};

export default Articles;
