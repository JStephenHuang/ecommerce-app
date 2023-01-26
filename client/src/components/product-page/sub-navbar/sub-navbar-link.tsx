interface SubNavbarLinkProperties {
  name: string;
  link: string;
}

const SubNavbarLinks = (props: SubNavbarLinkProperties) => {
  return (
    <a
      className="sub-navbar-link hover:opacity-50"
      href={`/explorer?clothingType=${props.link}`}
    >
      {props.name}
    </a>
  );
};

export default SubNavbarLinks;
