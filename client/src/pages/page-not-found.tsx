import Navbar from "../components/product-page/navbar/navbar";

const PageNotFound = () => {
  return (
    <div className="h-screen w-screen">
      <header className="h-[10%] mb-5">
        <Navbar />
      </header>

      <div className="flex flex-col items-center">Page not found :(</div>
    </div>
  );
};

export default PageNotFound;
