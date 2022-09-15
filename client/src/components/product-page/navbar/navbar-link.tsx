import { Link } from "react-router-dom";

interface NavbarLinkProperties {
  name: string;
  link: string;
}

const NavbarLink = (props: NavbarLinkProperties) => {
  return (
    <Link className="navbar-link" to={props.link}>
      {props.name}
    </Link>
  );
};

export default NavbarLink;
