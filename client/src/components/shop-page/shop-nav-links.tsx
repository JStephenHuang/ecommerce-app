import { NavLink } from "react-router-dom";

interface ShopNavLinksProperties {
  label: string;
  section: string;
  icon: JSX.Element;
}

const ShopNavLinks = (props: ShopNavLinksProperties) => {
  const linkStyle = ({ isActive }: { isActive: boolean }) => {
    if (isActive) {
      return "w-full transition-all p-5 flex bg-gray-200 items-center border-l-4 border-black";
    } else {
      return "w-full transition-all p-5 flex hover:bg-gray-200 items-center border-l-4 border-transparent";
    }
  };
  return (
    <NavLink to={`${props.section}`} className={linkStyle}>
      <div className="mr-5">{props.icon}</div>
      {props.label}
    </NavLink>
  );
};

export default ShopNavLinks;
