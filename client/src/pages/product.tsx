import Navbar from "../components/product-page/navbar/navbar";
import Slider from "../components/product-page/features/slider/slider";
import Schools from "../components/product-page/features/schools";
import Articles from "../components/product-page/features/listings";
import SeperatorLine from "../components/product-page/seperator-line/seperator-line";

const ProductPage = () => {
  return (
    <div className="h-screen w-screen">
      <header className="h-[10%]">
        <Navbar />
      </header>

      <div className="flex flex-col items-center">
        <Slider />

        <Schools />

        <Articles />
      </div>
    </div>
  );
};

export default ProductPage;
