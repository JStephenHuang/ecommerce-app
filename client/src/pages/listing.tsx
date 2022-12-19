import Navbar from "../components/product-page/navbar/navbar";
import Listing from "../components/listing-page/listing";

const ListingPage = () => {
  return (
    <div className="h-screen w-screen">
      <header className="h-[10%] mb-5">
        <Navbar />
      </header>

      <Listing />
    </div>
  );
};

export default ListingPage;
