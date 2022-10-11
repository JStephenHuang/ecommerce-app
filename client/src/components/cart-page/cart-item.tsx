import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

interface CartItemProperties {
  removeCartItemHandler: (id: string) => void;
  title: string;
  price: number;
  seller: string;
  id: string;
}

const CartItem = (props: CartItemProperties) => {
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
          <p className="text-[#87C38F] text-[24px] mr-3">
            ${props.price.toFixed(2)}
          </p>
          <FaTrash
            className="hover:text-red-600"
            onClick={() => props.removeCartItemHandler(props.id)}
            size={16}
          />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
