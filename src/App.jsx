import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home/Home";
import Cart from "./pages/cart/Cart";
import ProductDetail from "./pages/product-detail/ProductDetail";
import OrderList from "./pages/order-list/OrderList";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import MyPage from "./pages/my-page/MyPage";
import AuthGuard from "./components/auth-guard/AuthGuard";
import Header from "./components/header/Header";

import styles from "./app.module";
import { USER_ACCESS_POLICY } from "./constants";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header className={styles.header} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/cart"
            element={
              <AuthGuard policy={USER_ACCESS_POLICY.ONLY_LOGGED_IN_USER}>
                <Cart />
              </AuthGuard>
            }
          />
          <Route
            path="/login"
            element={
              <AuthGuard policy={USER_ACCESS_POLICY.ONLY_LOGGED_OUT_USER}>
                <Login />
              </AuthGuard>
            }
          />
          <Route
            path="/signup"
            element={
              <AuthGuard policy={USER_ACCESS_POLICY.ONLY_LOGGED_OUT_USER}>
                <Signup />
              </AuthGuard>
            }
          />
          <Route
            path="/my-page"
            element={
              <AuthGuard policy={USER_ACCESS_POLICY.ONLY_LOGGED_IN_USER}>
                <MyPage />
              </AuthGuard>
            }
          />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route
            path="/order-list"
            element={
              <AuthGuard policy={USER_ACCESS_POLICY.ONLY_LOGGED_IN_USER}>
                <OrderList />
              </AuthGuard>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
