import { Outlet } from "react-router-dom";
import Navbar from "../components/product-page/navbar/navbar";
import ShopSidebar from "../components/shop-page/shop-sidebar";

const ShopPage = () => {
  return (
    <div className="h-screen w-screen">
      <header className="h-[10%]">
        <Navbar />
      </header>
      <div className="w-full flex">
        {/* <ShopInfo /> */}
        <ShopSidebar />
        <Outlet />
      </div>
      {/* <Media /> */}
    </div>
  );
};

export default ShopPage;
