import Navbar from "../components/product-page/navbar/navbar";
import ProductInfo from "../components/sell-page/product-info";

const SellPage = () => {
  return (
    <div className="h-screen w-screen">
      <header className="h-[10%]">
        <Navbar />
      </header>
      <div className="flex flex-col items-center ">
        <p className="title">Welcome to the Sell page</p>
        <ProductInfo />
      </div>
    </div>
  );
};
export default SellPage;
