import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFirebaseAuthUser } from "../contexts/firebase-app-context";
import { useAPIClient } from "../hooks/api-client";
import { IListing } from "../types/listing";
import { motion } from "framer-motion";

import LoadingStatus from "../components/status/loading";
import Navbar from "../components/product-page/navbar/navbar";
import CartInfo from "../components/cart-page/cart-info";

const CartPage = () => {
  const client = useAPIClient();
  const user = useFirebaseAuthUser();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(true);
  const [cart, setCart] = useState<IListing[]>([]);

  useEffect(() => {
    if (user === null) return navigate("/login");
    getCartHandler();
  }, [user]);

  const getCartHandler = async () => {
    if (user === undefined) return;
    const res = await client.get("/cart").catch((err) => {
      if (err.response.status === 404) return navigate("/onboarding");
    });

    if (res) {
      setCart(res.data);
      setLoading(false);
    }
  };

  if (user === undefined) return <LoadingStatus />;
  if (loading) return <LoadingStatus />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      transition={{ delay: 0.2 }}
      className="h-screen w-screen"
    >
      <header className="h-[10%]">
        <Navbar />
      </header>

      <CartInfo cart={cart} getCartHandler={getCartHandler} />
      {/* <Media /> */}
    </motion.div>
  );
};
export default CartPage;
