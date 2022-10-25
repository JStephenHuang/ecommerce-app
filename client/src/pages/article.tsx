import { AiOutlineArrowLeft } from "react-icons/ai";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/product-page/navbar/navbar";
import ArticleInfo from "../components/article-page/article-info";

const ArticlePage = () => {
  const params = useParams();
  const navigate = useNavigate();

  const title = params.title?.replace(/-/g, " ");
  return (
    <div className="h-screen w-screen">
      <header className="h-[10%] mb-5">
        <Navbar />
      </header>
      <button className="back-arrow" onClick={() => navigate(-1)}>
        <AiOutlineArrowLeft size={30} />
      </button>
      <div className="flex flex-col items-center">
        <p className="title">{title}</p>
        <ArticleInfo />
      </div>
    </div>
  );
};

export default ArticlePage;
