const ProfilePic = () => {
  return (
    <div className="w-[20%] h-full flex flex-col items-center justify-between">
      <div className="w-56 h-56 bg-[#912F56] rounded-full" />
      <div className="flex items-center mt-5">
        <p className="text-[24px]">Stephen</p>
        <p className="text-[24px] text-gray-500">#2431</p>
      </div>
      <button className="edit-button w-[70%] mt-5">Edit profile</button>
    </div>
  );
};

export default ProfilePic;
