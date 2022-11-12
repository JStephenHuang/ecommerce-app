import { Routes, Route } from "react-router-dom";
import { ScrollToTop } from "./helper/ScrollToTop";
import { APIProvider } from "./contexts/api-context";
import { UserProvider } from "./contexts/user-context";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import ProductPage from "./pages/product";
import SellFormPage from "./pages/sell-form";
import SellerHubPage from "./pages/shop";
import CartPage from "./pages/cart";
import CheckoutPage from "./pages/checkout";
import UserPage from "./pages/user";
import ArticlePage from "./pages/article";
import SchoolPage from "./pages/school";
import AllSchools from "./pages/all-schools";

function App() {
  return (
    <APIProvider>
      {/* <ScrollToTop> */}
      <UserProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<ProductPage />} />
          <Route path="/sell/product-form" element={<SellFormPage />} />
          <Route path="/shop" element={<SellerHubPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/cart/checkout" element={<CheckoutPage />} />
          <Route path="/:username" element={<UserPage />} />
          <Route path="/article/:title/:id" element={<ArticlePage />}></Route>
          <Route path="/schools" element={<AllSchools />}></Route>
          <Route path="/school/:name/:id" element={<SchoolPage />}></Route>
        </Routes>
      </UserProvider>
      {/* </ScrollToTop> */}
    </APIProvider>
  );
}

export default App;
