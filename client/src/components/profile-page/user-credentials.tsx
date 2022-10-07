import InfoSection from "./info-section";

interface UserCredentialsProperties {
  user: {
    username: string;
    listings: Array<{
      title: string;
      productType: string;
      seller: string;
      size: number;
      school: any;
      price: number;
      _id: string;
    }>;
  };
}

const UserCredentials = (props: UserCredentialsProperties) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <p className="font-bold text-[20px] truncate">User Credentials</p>
      </div>
      <hr className="w-full bg-[#521945] h-[2px]" />
      <div className="flex flex-col">
        <div className="flex flex-col w-[50%] justify-between h-full my-5">
          <InfoSection name="Name" value={props.user.username} />
        </div>
      </div>
    </div>
  );
};

export default UserCredentials;
