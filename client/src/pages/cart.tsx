import Navbar from "../components/product-page/navbar/navbar";
import CartInfo from "../components/cart-page/cart-info/cart-info";

const CartPage = () => {
  return (
    <div className="h-screen w-screen">
      <header className="h-[10%] mb-5">
        <Navbar />
      </header>

      <CartInfo />
      {/* <Media /> */}
    </div>
  );
};
export default CartPage;
