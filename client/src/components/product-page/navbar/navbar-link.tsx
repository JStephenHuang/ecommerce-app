import { Link } from "react-router-dom";

interface NavbarLinkProperties {
  name: string;
  link: string;
}

const NavbarLink = (props: NavbarLinkProperties) => {
  return (
    <Link className="navbar-link mr-4" to={props.link}>
      {props.name}
    </Link>
  );
};

export default NavbarLink;
