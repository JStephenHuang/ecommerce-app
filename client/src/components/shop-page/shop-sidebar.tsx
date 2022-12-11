import { MdSpaceDashboard } from "react-icons/md";
import { TbHanger } from "react-icons/tb";
import { IoMdContact } from "react-icons/io";
import { IoIosShirt } from "react-icons/io";
import { IoStatsChart } from "react-icons/io5";

import ShopNavLinks from "./shop-nav-links";

const ShopSidebar = () => {
  const size = 25;

  return (
    <div className="w-[20%] border-r-[1.5px] border-gray-300">
      <div className="flex flex-col items-center font-bold mb-10 mt-10">
        <div className="w-[6rem] h-[6rem] bg-black rounded-full" />
        <div className="text-[16px] mt-3">Your profile</div>
        <div className="font-light opacity-50 text-[16px]">Leo</div>
      </div>

      <div className="flex flex-col items-start font-bold sticky top-[10%]">
        <ShopNavLinks
          label="Dashboard"
          section="dashboard"
          icon={<MdSpaceDashboard size={size} />}
        />
        <ShopNavLinks
          label="Sales"
          section="sales"
          icon={<IoStatsChart size={size} />}
        />
        <ShopNavLinks
          label="Followers"
          section="followers"
          icon={<IoMdContact size={size} />}
        />
        <ShopNavLinks
          label="Listings"
          section="listings"
          icon={<TbHanger size={size} />}
        />
      </div>
    </div>
  );
};

export default ShopSidebar;
