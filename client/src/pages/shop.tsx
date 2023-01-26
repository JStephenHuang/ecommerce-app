import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useFirebaseAuthUser } from "../contexts/firebase-app-context";
import { useAPIClient } from "../hooks/api-client";
import { useQuery } from "react-query";
import { IUser, userAlt } from "../types/user";

import Navbar from "../components/product-page/navbar/navbar";
import ShopSidebar from "../components/shop-page/shop-sidebar";
import LoadingSpinner from "../components/listing-form-page/loading-spinner";

const ShopPage = () => {
  const client = useAPIClient();
  const user = useFirebaseAuthUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) navigate("/login");
  }, [user, navigate]);

  const getUserHandler = async (): Promise<{
    message: string;
    user: IUser;
  }> => {
    const res = await client.get(`/user`);
    if (res.status === 200) return res.data as { message: string; user: IUser };
    return { message: "", user: userAlt };
  };

  const { data, status } = useQuery<{ message: string; user: IUser }>({
    queryKey: "getUser",
    queryFn: getUserHandler,
    enabled: !!user,
    onError: async (err: any) => {
      if (err.response.status === 404) return navigate("/onboarding");
    },
  });

  if (user === undefined) {
    return (
      <div className="w-screen h-screen grid place-items-center">
        <LoadingSpinner classname="w-16 h-16" />
      </div>
    );
  }

  if (status === "loading") {
    return (
      <div className="w-screen h-screen grid place-items-center">
        <LoadingSpinner classname="w-16 h-16" />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="h-[80%] grid place-items-center">User not found</div>
    );
  }
  return (
    <div className="w-screen h-screen">
      <header className="h-[10%]">
        <Navbar />
      </header>
      <div className="w-full flex">
        {/* <ShopInfo /> */}
        <ShopSidebar user={data?.user || userAlt} />
        <Outlet />
      </div>
      {/* <Media /> */}
    </div>
  );
};

export default ShopPage;
