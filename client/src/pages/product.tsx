import Navbar from "../components/product-page/navbar/navbar";
import SubNavbar from "../components/product-page/sub-navbar/sub-navbar";
import ImgSwiper from "../components/product-page/features/slider";
import Schools from "../components/product-page/features/schools";
import Articles from "../components/product-page/features/articles";

const ProductPage = () => {
  return (
    <div className="h-screen w-screen">
      <header className="h-[10%] mb-5">
        <Navbar />
      </header>

      <div className="flex flex-col items-center">
        <SubNavbar />

        <ImgSwiper />

        <Schools />

        <Articles />

        <Schools />

        <Schools />

        <Schools />
      </div>
    </div>
  );
};

export default ProductPage;
