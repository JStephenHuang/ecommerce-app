import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAPIs } from "../../contexts/APIContext";
import ArticleBubbles from "../product-page/features/article-bubbles";
import SchoolBubbles from "../product-page/features/school-bubbles";

const SchoolInfo = () => {
  const [school, setSchool] = useState<{
    name: string;
    products: Array<{
      title: string;
      productType: string;
      seller: string;
      size: number;
      school: any;
      price: number;
      _id: string;
    }>;
  }>({ name: "-", products: [] });
  const APIContext = useAPIs();
  const params = useParams();
  let id = "";
  if (params.id) id = params.id;
  useEffect(() => {
    APIContext.getSchool(id).then((value) => {
      setSchool(value.data);
    });
  }, []);
  console.log(school);

  const frontEndSchoolArticles = school.products.map((schoolArticle, key) => {
    return (
      <ArticleBubbles
        key={key}
        title={schoolArticle.title}
        productType={schoolArticle.productType}
        seller={schoolArticle.seller}
        size={schoolArticle.size}
        school={schoolArticle.school}
        price={schoolArticle.price}
        id={schoolArticle._id}
      />
    );
  });
  return (
    <div className="w-[70%] my-5 p-5">
      <p className="text-[20px] font-bold">Every Listings from {school.name}</p>
      <hr className="w-full bg-[#521945] h-[2px] mb-[1.5rem]" />
      <div className="flex flex-col">{school.products.length} listings:</div>
      <div className="flex w-full my-5">{frontEndSchoolArticles}</div>
    </div>
  );
};
export default SchoolInfo;
