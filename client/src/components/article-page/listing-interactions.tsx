import { BsHeart } from "react-icons/bs";
import { BsBookmark } from "react-icons/bs";
import { BsChatDots } from "react-icons/bs";

const ListingInteractions = () => {
  return (
    <div className="flex items-center w-[6rem] justify-between">
      <BsHeart size={24} />
      <BsBookmark size={24} />
      <BsChatDots size={24} />
    </div>
  );
};

export default ListingInteractions;
