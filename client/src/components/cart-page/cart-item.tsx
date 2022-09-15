import { FaTrash } from "react-icons/fa";

interface CartItemProperties {
  title: string;
  price: number;
  seller: string;
}

const CartItem = (props: CartItemProperties) => {
  return (
    <div className="border border-black rounded-lg p-5 flex items-center justify-between">
      <div className="flex items-center">
        <div className="h-20 w-20 bg-white rounded-lg"></div>

        <div className="flex flex-col ml-5">
          <p className="">{props.title}</p>
          <p className="flex">
            Seller: <p className="text-[#912F56] ml-1"> {props.seller}</p>
          </p>
        </div>
      </div>

      <div className="flex items-center">
        <p className="text-[#87C38F] text-[24px] mr-5">${props.price}</p>
        <FaTrash className="hover:text-red-600" size={16} />
      </div>
    </div>
  );
};

export default CartItem;
