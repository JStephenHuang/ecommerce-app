import LoadingSpinner from "./loading-spinner";

const LoadingStatus = () => {
  return (
    <div className="w-screen h-screen bg-white z-[100] grid place-items-center">
      <LoadingSpinner classname="w-16 h-16" />
    </div>
  );
};

export default LoadingStatus;
