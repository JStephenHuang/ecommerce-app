import { Routes, Route } from "react-router-dom";
import { ScrollToTop } from "./helper/ScrollToTop";
import { FirebaseProvider } from "./contexts/FirebaseContext";
import { APIProvider } from "./contexts/APIContext";
import { UserProvider } from "./contexts/UserContext";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import ProductPage from "./pages/product";
import SellPage from "./pages/sell";
import CartPage from "./pages/cart";
import CheckoutPage from "./pages/checkout";
import ProfilePage from "./pages/profile";
import ArticlePage from "./pages/article";
import SchoolPage from "./pages/school";
import AllSchools from "./pages/all-schools";

function App() {
  return (
    <FirebaseProvider>
      <APIProvider>
        <ScrollToTop>
          <UserProvider>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/" element={<ProductPage />} />
              <Route path="/sell/product-info" element={<SellPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/cart/checkout" element={<CheckoutPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route
                path="/article/:title/:id"
                element={<ArticlePage />}
              ></Route>
              <Route path="/schools" element={<AllSchools />}></Route>
              <Route path="/school/:name/:id" element={<SchoolPage />}></Route>
            </Routes>
          </UserProvider>
        </ScrollToTop>
      </APIProvider>
    </FirebaseProvider>
  );
}

export default App;
