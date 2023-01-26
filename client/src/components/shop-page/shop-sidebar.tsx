import {
  TbHanger,
  TbLayoutDashboard,
  TbBrandGoogleAnalytics,
  TbUserCircle,
  TbCirclePlus,
} from "react-icons/tb";
import { IUser } from "../../types/user";

import ShopNavLinks from "./shop-nav-links";
import ProfilePicSidebar from "./profile-pic";

const ShopSidebar = ({ user }: { user: IUser }) => {
  const size = 25;

  return (
    <div className="w-[20%] border-r-[0.5px] border-gray-300">
      <ProfilePicSidebar username={user.username} />
      <div className="flex flex-col items-start font-bold sticky top-[10%]">
        <ShopNavLinks
          label="Dashboard"
          section="dashboard"
          icon={<TbLayoutDashboard size={size} />}
        />
        <ShopNavLinks
          label="Sales"
          section="sales"
          icon={<TbBrandGoogleAnalytics size={size} />}
        />
        <ShopNavLinks
          label="Followers"
          section="followers"
          icon={<TbUserCircle size={size} />}
        />
        <ShopNavLinks
          label="Listings"
          section="listings"
          icon={<TbHanger size={size} />}
        />
        <ShopNavLinks
          label="New"
          section="/shop/new"
          icon={<TbCirclePlus size={size} />}
        />
      </div>
    </div>
  );
};

export default ShopSidebar;
