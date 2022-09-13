import { Routes, Route } from "react-router-dom";
import { APIContext, APIProvider } from "./contexts/APIContext";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import ProductPage from "./pages/product";
import SellPage from "./pages/sell";
import CartPage from "./pages/cart";
import ProfilePage from "./pages/profile";

function App() {
  return (
    <APIProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/main" element={<ProductPage />} />
        <Route path="/sell" element={<SellPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </APIProvider>
  );
}

export default App;
