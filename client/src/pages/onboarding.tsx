import Navbar from "../components/product-page/navbar/navbar";

const FirstLastName = () => {
  return (
    <div className="grid grid-cols-2 gap-2">
      <div>
        <p className="opacity-70 text-[12px] tracking-wider">First Name</p>
        <input
          className="w-full font-normal border border-black p-2.5"
          type="text"
        />
      </div>
      <div>
        <p className="opacity-70 text-[12px] tracking-wider">Last Name</p>
        <input
          className="w-full font-normal border border-black p-2.5"
          type="text"
        />
      </div>
    </div>
  );
};

const Checkbox = () => {
  return (
    <div className="flex items-start w-full my-5">
      <input
        id="stephendick"
        className="w-5 aspect-square mt-1 appearance-none border border-black checked:bg-blue-500"
        type="checkbox"
      />
      <label htmlFor="stephendick" className="text-[12px] ml-2">
        By check this box you agree to suck stephen's dick for the next 14 days,
        dont be late :)
      </label>
    </div>
  );
};

const OnboardingPage = () => {
  return (
    <div className="h-screen w-screen flex">
      <div className="w-[50%] h-full bg-black"></div>
      <div className="w-[50%] h-full flex flex-col items-center">
        <div className="w-[50%] mt-10">
          <p className="text-center font-thin">almost there...</p>

          <p className="text-center text-[30px]">Add details</p>
          <div className="text-start font-normal">
            <p className="my-5">
              We need this info to create your account and verify it's you:
            </p>
            <FirstLastName />
            <div className="my-5">
              <p className="opacity-70 text-[12px] tracking-wider">Username</p>
              <input
                className="w-full font-normal border p-2.5 border-black"
                type="text"
              />
            </div>
            <Checkbox />
            <button className="font-extrabold bg-black p-3 text-white w-full text-center hover:opacity-50 transition-all">
              Sumbit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
