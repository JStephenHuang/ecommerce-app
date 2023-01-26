import CheckoutOverview from "../components/checkout-page/checkout-overview";

const CheckoutPage = () => {
  return (
    <div className="h-screen w-screen">
      <header className="h-[10%]"></header>
      <div className="flex flex-col items-center">
        <CheckoutOverview />
      </div>
      {/* <Media /> */}
    </div>
  );
};
export default CheckoutPage;
