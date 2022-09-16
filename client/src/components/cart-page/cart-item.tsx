import { useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { useAPIs } from "../../contexts/APIContext";

interface CartItemProperties {
  title: string;
  price: number;
  seller: string;
  id: string;
}

const CartItem = (props: CartItemProperties) => {
  const APIContext = useAPIs();
  const username = "Stephen";
  const refreshPage = () => {
    window.location.reload();
  };
  console.log(props.id);
  const removeItem = () => {
    APIContext.removeItem(username, props.id)
      .then(() => {
        console.log("Removed Item Successfully");
        refreshPage();
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="border border-black rounded-lg p-5 flex items-center justify-between">
      <div className="flex items-center">
        <div className="h-20 w-20 bg-white rounded-lg"></div>

        <div className="flex flex-col ml-5">
          <p className="">{props.title}</p>
          <p className="flex">Seller:</p>
          <p className="text-[#912F56] ml-1"> {props.seller}</p>
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
