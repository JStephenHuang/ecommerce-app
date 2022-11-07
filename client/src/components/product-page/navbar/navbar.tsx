import NavbarLink from "./navbar-link";
import Logo from "./logo";
import SearchBar from "./searchbar";
import ProfilePic from "./pfp";

const Navbar = () => {
  return (
    <div className="navbar z-[10]">
      <div className="w-[90%] h-full flex items-center justify-center">
        <Logo />
        <div className="w-[70%] h-full flex items-center">
          <SearchBar />
          <div className="flex w-[20%] items-center justify-between ml-[3rem]">
            <NavbarLink name="Sell" link="/sell/hub" />
            <NavbarLink name="Cart" link="/cart" />
            <ProfilePic />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
