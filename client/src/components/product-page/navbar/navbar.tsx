import { useAPIClient } from "../../../hooks/api-client";
import {
  useFirebaseAuth,
  useFirebaseAuthUser,
} from "../../../contexts/firebase-app-context";
import { useEffect, useState } from "react";
import { IUser } from "../../../types/user";
import { Link, useNavigate } from "react-router-dom";

import NavbarLink from "./navbar-link";
import Logo from "./logo";
import SearchBar from "./searchbar";
import LoadingStatus from "../../status/loading";

const Navbar = () => {
  const client = useAPIClient();
  const auth = useFirebaseAuth();
  const user = useFirebaseAuthUser();
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState<IUser | null | undefined>();

  useEffect(() => {
    if (user !== undefined) {
      getCurrentUser();
    }
  }, [user, currentUser]);

  const getCurrentUser = async () => {
    const res = await client.get("/user/current").catch((err) => {
      if (err.response.status === 404) {
        setCurrentUser(null);
      }
    });
    if (res) {
      setCurrentUser(res.data);
    }
  };

  const proceedToStripeConnect = async () => {
    const res = await client.post("/stripe/connect").catch((err) => {
      if (err.response.status === 404) {
        navigate("/onboarding");
      }
    });
    if (res) window.location = res.data.url;
  };

  if (currentUser === undefined || user === undefined) return null;

  return (
    <div className="navbar z-[10] border-b-[1px]">
      <div className="w-[90%] h-full flex items-center justify-center">
        <Logo />
        <SearchBar />
        <div className="flex w-[30%] items-center justify-end">
          {currentUser === null ||
            (currentUser.stripe_id === "" ? (
              <button
                className="navbar-link mr-4 font-normal"
                onClick={proceedToStripeConnect}
              >
                Sell
              </button>
            ) : (
              <NavbarLink name="Shop" link="/shop/dashboard" />
            ))}

          <NavbarLink name="Cart" link="/cart" />
          {user ? (
            <div>
              <Link
                className="h-[30px] w-[30px] rounded-full bg-black"
                to={`/`}
              ></Link>
              <button
                className="px-[16px] py-[6px] bg-black rounded-sm text-white hover:opacity-50"
                onClick={() => auth.signOut()}
              >
                Sign out
              </button>
            </div>
          ) : (
            <div className="flex items-center">
              <Link
                className="px-[16px] py-[6px] rounded-sm bg-black text-white hover:opacity-70"
                to="/login"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
