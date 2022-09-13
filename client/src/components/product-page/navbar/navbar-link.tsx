import { Link } from "react-router-dom";

interface NavbarLinkProperties {
  name: string;
  link: string;
}

const NavbarLink = (props: NavbarLinkProperties) => {
  return (
    <Link className="text-[16px] text-gray-600" to={props.link}>
      {props.name}
    </Link>
  );
};

export default NavbarLink;
