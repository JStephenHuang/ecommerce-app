import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useFirebaseAuthUser } from "../contexts/firebase-app-context";
import { useAPIClient } from "../hooks/api-client";
import { IUser } from "../types/user";
import { motion } from "framer-motion";

import Navbar from "../components/product-page/navbar/navbar";
import ShopSidebar from "../components/shop-page/shop-sidebar";
import LoadingStatus from "../components/status/loading";

const ShopPage = () => {
  const client = useAPIClient();
  const user = useFirebaseAuthUser();
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState<IUser | null | undefined>();

  useEffect(() => {
    if (user === null) navigate("/login");
    if (user !== undefined) {
      getCurrentUser();
      if (currentUser?.stripe_id === "") navigate("/");
    }
  }, [user, navigate]);

  const getCurrentUser = async () => {
    const res = await client.get("/user/current").catch((err) => {
      if (err.response.status === 404) {
        setCurrentUser(null);
        navigate("/onboarding");
      }
    });
    if (res) {
      setCurrentUser(res.data);
    }
  };

  if (currentUser === undefined || user === undefined) return <LoadingStatus />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      transition={{ delay: 0.2 }}
      className="w-screen h-screen"
    >
      <header className="h-[10%]">
        <Navbar />
      </header>

      <div className="w-full flex">
        {/* <ShopInfo /> */}
        <ShopSidebar user={currentUser as IUser} />
        <Outlet />
      </div>
      {/* <Media /> */}
    </motion.div>
  );
};

export default ShopPage;
