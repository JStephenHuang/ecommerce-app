import CheckoutOverview from "../components/checkout-page/checkout-overview";

const CheckoutPage = () => {
  return (
    <div className="h-screen w-screen">
      <header className="h-[10%] mb-5"></header>
      <div className="flex flex-col items-center">
        <p className="title">Checkout</p>
        <CheckoutOverview />
      </div>
      {/* <Media /> */}
    </div>
  );
};
export default CheckoutPage;
