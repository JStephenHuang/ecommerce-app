import { useEffect } from "react";
import { useAPIClient } from "../../hooks/api-client";
import { Link, useLocation } from "react-router-dom";

const OrderPage = () => {
  const search = useLocation().search;
  const session_id = new URLSearchParams(search).get("session_id");
  const client = useAPIClient();

  useEffect(() => {
    getSessionHandler();
  }, []);

  const getSessionHandler = async () => {
    const res = await client
      .get(`/stripe/order?session_id=${session_id}`)
      .catch((err) => {
        console.log(err);
      });
    if (res) console.log(res.data);
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center">
      <div className="my-5 text-center">
        <p className="font-extrabold text-[30px]">Your orders</p>
        <p className="font-light">
          This is all the listings you have payed for and it is currently being
          shipped to you.
        </p>
      </div>
      <div className="">
        <Link to="/">Go back</Link>
      </div>
    </div>
  );
};

export default OrderPage;
