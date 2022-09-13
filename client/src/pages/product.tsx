import Navbar from "../components/product-page/navbar/navbar";
import SubNavbar from "../components/product-page/sub-navbar/sub-navbar";
import Schools from "../components/product-page/features/schools";
import ImgSwiper from "../components/product-page/features/image-swiper";

const ProductPage = () => {
  return (
    <div className="h-screen w-screen">
      <header className="h-[10%]">
        <Navbar />
      </header>

      <div className="flex flex-col items-center">
        <SubNavbar />

        <ImgSwiper />

        <div className="w-[80%] h-[10rem] my-5">
          <p className="">Schools</p>
          <Schools />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
