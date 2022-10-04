import { Key, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAPIs } from "../../contexts/APIContext";

interface CartItemProperties {
  deleteAlertFunction: () => void;
  title: string;
  price: number;
  seller: string;
  id: string;
}

const CartItem = (props: CartItemProperties) => {
  const APIContext = useAPIs();
  const username = "Stephen";

  const removeItem = () => {
    APIContext.removeListing(username, props.id)
      .then(() => {
        console.log("Item Removed Successfully");
        props.deleteAlertFunction();
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="cart-items">
      <div className="flex items-center w-full">
        <div className="h-20 w-20 bg-white rounded-lg"></div>

        <div className="flex flex-col ml-5 w-[50%]">
          <Link to={`/article/${props.title.replace(/ /g, "-")}/${props.id}`}>
            <p className="hover:text-[#912F56] font-bold truncate">
              {props.title}
            </p>
          </Link>
          <div className="flex">
            <p className="">Seller:</p>
            <p className="text-[#912F56] ml-1"> {props.seller}</p>
          </div>
        </div>
        <div className="flex items-center ml-auto">
          <p className="text-[#87C38F] text-[24px] mr-3">${props.price}</p>
          <FaTrash
            className="hover:text-red-600"
            onClick={removeItem}
            size={16}
          />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
