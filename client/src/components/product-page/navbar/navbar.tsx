import NavbarLink from "./navbar-link";
import Logo from "./logo";
import SearchBar from "./searchbar";
import ProfilePic from "./pfp";

const Navbar = () => {
  return (
    <div className="navbar z-[10] border-b-[1px]">
      <div className="w-[90%] h-full flex items-center justify-center">
        <Logo />
        <SearchBar />
        <div className="flex w-[30%] items-center justify-end">
          <NavbarLink name="Shop" link="/shop/dashboard" />
          <NavbarLink name="Cart" link="/cart" />
          <ProfilePic />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
