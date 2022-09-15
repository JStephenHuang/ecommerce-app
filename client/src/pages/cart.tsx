import Navbar from "../components/product-page/navbar/navbar";
import CartInfo from "../components/cart-page/cart-info/cart-info";

const CartPage = () => {
  return (
    <>
      <div className="h-screen w-screen">
        <header className="h-[10%] mb-10">
          <Navbar />
        </header>
        <div className="spacer layer2">
          <div className="flex flex-col items-center ">
            <p className="title">Welcome to your Cart</p>
            <CartInfo />
          </div>
          {/* <Media /> */}
        </div>
      </div>
    </>
  );
};
export default CartPage;
