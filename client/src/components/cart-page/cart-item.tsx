import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ListingType } from "../../types/listing";

interface CartItemProperties {
  cartItem: ListingType;
  removeCartItemHandler: (id: string) => void;
}

const CartItem = ({ cartItem, removeCartItemHandler }: CartItemProperties) => {
  return (
    <div className="cart-items mb-2">
      <div className="flex items-center w-full">
        <div className="h-20 w-20 bg-white">{/* Img component */}</div>

        <div className="flex flex-col ml-5 w-[50%]">
          <Link
            to={`/article/${cartItem.title.replace(/ /g, "-")}/${cartItem._id}`}
          >
            <p className="hover:text-[#912F56] font-bold truncate">
              {cartItem.title}
            </p>
          </Link>
          <div className="flex">
            <p className="">Seller:</p>
            <p className="text-[#912F56] ml-1"> {cartItem.seller.username}</p>
          </div>
        </div>
        <div className="flex items-center ml-auto">
          <p className="text-[#87C38F] text-[24px] mr-3">
            ${cartItem.price.toFixed(2)}
          </p>
          <FaTrash
            className="hover:text-red-600"
            onClick={() => removeCartItemHandler(cartItem._id)}
            size={16}
          />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
