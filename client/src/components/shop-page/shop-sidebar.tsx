import { MdSpaceDashboard } from "react-icons/md";
import { TbHanger } from "react-icons/tb";
import { IoMdContact } from "react-icons/io";
import { IoStatsChart } from "react-icons/io5";

import ShopNavLinks from "./shop-nav-links";
import ProfilePicSidebar from "./profile-pic";

const ShopSidebar = () => {
  const size = 25;

  return (
    <div className="w-[20%] h-auto border-r-[1.5px] border-gray-300">
      <ProfilePicSidebar />
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
