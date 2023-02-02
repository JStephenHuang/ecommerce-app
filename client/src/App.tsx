import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import ProductPage from "./pages/product";
import ShopPage from "./pages/shop";
import CartPage from "./pages/cart";
import ProfilePage from "./pages/profile-page/profile";
import ListingPage from "./pages/listing";
import SchoolPage from "./pages/school";
import AllSchools from "./pages/all-schools";
import ShopDashboard from "./components/shop-page/dashboard/shop-dashboard";
import ShopSales from "./components/shop-page/sales/shop-sales";
import ShopListings from "./components/shop-page/listings/shop-listings";
import ShopFollowers from "./components/shop-page/followers/shop-followers";
import PageNotFound from "./pages/page-not-found";
import ExplorerPage from "./pages/explorer";
import OnboardingPage from "./pages/onboarding-page/onboarding";

import { FirebaseAppProvider } from "./contexts/firebase-app-context";
import CreateListingPage from "./pages/create-listing";
import EditListingPage from "./pages/edit-listing";
import PartnerPage from "./pages/partner-page/partner";
import OrderPage from "./pages/order-page/order";

function App() {
  return (
    <FirebaseAppProvider>
      {/* <ScrollToTop> */}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/onboarding" element={<OnboardingPage />}></Route>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<ProductPage />} />
        <Route path="/partner" element={<PartnerPage />}></Route>
        <Route path="/shop" element={<ShopPage />}>
          <Route path="dashboard" element={<ShopDashboard />} />
          <Route path="sales" element={<ShopSales />} />
          <Route path="followers" element={<ShopFollowers />} />
          <Route path="listings" element={<ShopListings />} />
          <Route path="listings/:id/edit" element={<EditListingPage />} />
          <Route path="new" element={<CreateListingPage />} />
        </Route>
        <Route path="/explorer" element={<ExplorerPage />} />
        <Route path="/order" element={<OrderPage />}></Route>
        <Route path="/cart" element={<CartPage />} />
        <Route path="/@:username" element={<ProfilePage />} />
        <Route path="/listing/:id" element={<ListingPage />}></Route>
        <Route path="/schools" element={<AllSchools />}></Route>
        <Route path="/school/:name/:id" element={<SchoolPage />}></Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      {/* </ScrollToTop> */}
    </FirebaseAppProvider>
  );
}

export default App;
