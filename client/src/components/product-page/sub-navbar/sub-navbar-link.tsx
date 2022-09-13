interface SubNavbarLinkProperties {
  name: string;
  link: string;
}

const SubNavbarLinks = (props: SubNavbarLinkProperties) => {
  return <div className="product-page-sub-navbar-link">{props.name}</div>;
};

export default SubNavbarLinks;
