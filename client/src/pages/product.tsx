import Navbar from "../components/product-page/navbar/navbar";
import Slider from "../components/product-page/features/slider/slider";
import Schools from "../components/product-page/features/schools";
import Listings from "../components/product-page/features/listings";

const ProductPage = () => {
  return (
    <div className="h-screen w-screen">
      <header className="h-[10%]">
        <Navbar />
      </header>

      <div className="flex flex-col items-center">
        <Slider />

        <Listings />

        <Schools />
      </div>
    </div>
  );
};

export default ProductPage;
