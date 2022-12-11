import UserFollowing from "./user-followings";

const ShopListings = () => {
  return (
    <div className="w-[80%] h-full flex flex-col">
      <div className="h-[10%] p-5">
        <p className="font-extrabold text-[30px]">Shop's followers</p>
      </div>
      <div className="">
        <UserFollowing />
      </div>
    </div>
  );
};

export default ShopListings;
