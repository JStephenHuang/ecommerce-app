import { useEffect, useState } from "react";
import { useAPIs } from "../../../contexts/APIContext";
import { productTypes } from "../../../docs/options";
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
    }>
  >([]);
  useEffect(() => {
    APIContext.getArticles().then((value) => {
      setArticles(value.data);
    });
  }, []);

  const frontEndArticles = articles.map((article, key) => {
    return (
      <ArticleBubbles
        key={key}
        title={article.title}
        productType={article.productType}
        seller={article.seller}
        size={article.size}
        school={article.school}
        price={article.price}
      />
    );
  });

  return (
    <div className="w-[80%] h-[10rem] my-5">
      <div className="flex justify-between">
        <p className="">Uniforms</p>

        <a className="underline hover:text-[#912F56]" href="">
          See all
        </a>
      </div>

      <div className="flex w-full my-5">{frontEndArticles}</div>
    </div>
  );
};

export default Articles;