interface SubNavbarLinkProperties {
  name: string;
  link: string;
}

const SubNavbarLinks = (props: SubNavbarLinkProperties) => {
  return (
    <a className="sub-navbar-link" href="#article">
      {props.name}
    </a>
  );
};

export default SubNavbarLinks;
