import Navbar from "../components/product-page/navbar/navbar";
import ProductInfo from "../components/sell-page/product-info/product-info";
import Media from "../components/sell-page/media";

const SellPage = () => {
  return (
    <>
      <div className="h-screen w-screen">
        <header className="h-[10%] mb-10">
          <Navbar />
        </header>
        <div className="spacer layer3">
          <div className="flex flex-col items-center ">
            <p className="title">Welcome to the Sell page</p>
            <ProductInfo />
          </div>
        </div>
        {/* <Media /> */}
      </div>
    </>
  );
};
export default SellPage;
