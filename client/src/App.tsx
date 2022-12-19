import { Routes, Route } from 'react-router-dom';
import { UserProvider } from './contexts/user-context';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import ProductPage from './pages/product';
import SellFormPage from './pages/sell-form';
import ShopPage from './pages/shop';
import CartPage from './pages/cart';
import CheckoutPage from './pages/checkout';
import UserPage from './pages/user';
import ArticlePage from './pages/article';
import SchoolPage from './pages/school';
import AllSchools from './pages/all-schools';
import ShopDashboard from './components/shop-page/dashboard/shop-dashboard';
import ShopSales from './components/shop-page/sales/shop-sales';
import ShopListings from './components/shop-page/listings/shop-listings';
import ShopFollowers from './components/shop-page/followers/shop-followers';
import { FirebaseAppProvider } from './contexts/firebase-app-context';

function App() {
  return (
    <FirebaseAppProvider>
      {/* <ScrollToTop> */}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<ProductPage />} />
        <Route path="/sell/product-form" element={<SellFormPage />} />
        <Route path="/shop" element={<ShopPage />}>
          <Route path="dashboard" element={<ShopDashboard />} />
          <Route path="sales" element={<ShopSales />} />
          <Route path="followers" element={<ShopFollowers />} />
          <Route path="listings" element={<ShopListings />} />
        </Route>
        <Route path="/cart" element={<CartPage />} />
        <Route path="/cart/checkout" element={<CheckoutPage />} />
        <Route path="/:username" element={<UserPage />} />
        <Route path="/listing/:title/:id" element={<ArticlePage />}></Route>
        <Route path="/schools" element={<AllSchools />}></Route>
        <Route path="/school/:name/:id" element={<SchoolPage />}></Route>
      </Routes>
      {/* </ScrollToTop> */}
    </FirebaseAppProvider>
  );
}

export default App;
