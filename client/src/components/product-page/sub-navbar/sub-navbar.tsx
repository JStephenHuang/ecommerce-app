import SubNavbarLinks from "./sub-navbar-link";

const SubNavbar = () => {
  return (
    <div className="flex justify-center w-full bg-white py-3 border-b-[1px]">
      <SubNavbarLinks name="Polos" link="Polo" />
      <SubNavbarLinks name="Skirts" link="Skirt" />
      <SubNavbarLinks name="Hoodies" link="Hoodie" />
      <SubNavbarLinks name="Sportswears" link="Sportswear" />
      <SubNavbarLinks name="Jeans" link="Jean" />
      <SubNavbarLinks name="Pants" link="Pants" />
      <SubNavbarLinks name="Shorts" link="Shorts" />
      <SubNavbarLinks name="Shoes" link="Shoes" />
    </div>
  );
};

export default SubNavbar;
