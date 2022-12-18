import { NavLink } from "react-router-dom";

interface ShopNavLinksProperties {
  label: string;
  section: string;
  icon: JSX.Element;
}

const ShopNavLinks = (props: ShopNavLinksProperties) => {
  return (
    <NavLink
      to={`/shop/${props.section}`}
      className={({ isActive }) =>
        isActive
          ? "w-full transition-all p-5 flex bg-gray-200 items-center border-l-4 border-black"
          : "w-full transition-all p-5 flex hover:bg-gray-200 items-center border-l-4 border-transparent"
      }
    >
      <div className="mr-5">{props.icon}</div>
      {props.label}
    </NavLink>
  );
};

export default ShopNavLinks;
