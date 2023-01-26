const ProfilePicSidebar = ({ username }: { username: string }) => {
  return (
    <div className="flex flex-col items-center font-bold my-10">
      <div className="w-[6rem] h-[6rem] bg-black rounded-full" />
      <div className="text-[16px] mt-3">Your profile</div>
      <div className="font-light opacity-50 text-[16px]">{username}</div>
    </div>
  );
};

export default ProfilePicSidebar;
