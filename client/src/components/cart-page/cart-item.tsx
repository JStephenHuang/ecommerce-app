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
  const username = "Leo";

  const removeItem = () => {
    APIContext.removeItem(username, props.id)
      .then(() => {
        console.log("Item Removed Successfully");
        props.deleteAlertFunction();
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="cart-items">
      <div className="flex items-center">
        <div className="h-20 w-20 bg-white rounded-lg"></div>

        <div className="flex flex-col ml-5">
          <Link to={`/article/${props.title.replace(/ /g, "-")}/${props.id}`}>
            <p className="hover:text-[#912F56] font-bold">{props.title}</p>
          </Link>
          <div className="flex">
            <p className="">Seller:</p>
            <p className="text-[#912F56] ml-1"> {props.seller}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center">
        <p className="text-[#87C38F] text-[24px] mr-5">${props.price}</p>
        <FaTrash
          className="hover:text-red-600"
          onClick={removeItem}
          size={16}
        />
      </div>
    </div>
  );
};

export default CartItem;
