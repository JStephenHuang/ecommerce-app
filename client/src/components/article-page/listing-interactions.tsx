import { BsHeart } from "react-icons/bs";
import { BsBookmark } from "react-icons/bs";
import { BsChatDots } from "react-icons/bs";

const ListingInteractions = () => {
  const size = 24;
  return (
    <div className="w-full h-[10%] flex items-center justify-around p-3 border-t mt-auto">
      <BsHeart size={size} />
      <BsBookmark size={size} />
      <BsChatDots size={size} />
    </div>
  );
};

export default ListingInteractions;
