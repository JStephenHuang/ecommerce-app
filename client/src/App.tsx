import { Routes, Route } from "react-router-dom";
import { APIProvider } from "./contexts/APIContext";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import ProductPage from "./pages/product";
import SellPage from "./pages/sell";
import CartPage from "./pages/cart";
import CheckoutPage from "./pages/checkout";
import ProfilePage from "./pages/profile";
import ArticlePage from "./pages/article";

function App() {
  return (
    <APIProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<ProductPage />} />
        <Route path="/sell" element={<SellPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/cart/checkout" element={<CheckoutPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/article/:title/:id" element={<ArticlePage />}></Route>
      </Routes>
    </APIProvider>
  );
}

export default App;
