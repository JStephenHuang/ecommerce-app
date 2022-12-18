const UserFollowing = () => {
  return (
    <div className="flex w-[50%] justify-between p-5 text-[20px]">
      <div className="flex flex-col items-center">
        <div className="font-bold">0</div>
        <div>Followers</div>
      </div>
      <div className="flex flex-col items-center">
        <div className="font-bold">0</div>
        <div>Following</div>
      </div>
      <div className="flex flex-col items-center">
        <div className="font-bold">0%</div>
        <div>Engagement</div>
      </div>
      <div className="flex flex-col items-center">
        <div className="font-bold">0</div>
        <div>Likes</div>
      </div>
    </div>
  );
};

export default UserFollowing;
