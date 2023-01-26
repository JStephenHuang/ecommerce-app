import Navbar from "../components/product-page/navbar/navbar";
import Slider from "../components/product-page/features/slider/slider";
import Schools from "../components/product-page/features/schools";
import Listings from "../components/product-page/features/listings";
import SubNavbar from "../components/product-page/sub-navbar/sub-navbar";

const ProductPage = () => {
  return (
    <div className="h-screen w-screen">
      <header className="h-[10%]">
        <Navbar />
      </header>

      <div className="flex flex-col items-center">
        <SubNavbar />

        <Slider />

        <Listings />
      </div>
    </div>
  );
};

export default ProductPage;
