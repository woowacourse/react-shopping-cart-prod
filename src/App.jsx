import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProductListPage from "./pages/ProductListPage/ProductListPage";
import CartPage from "./pages/CartPage/CartPage";
import ProductDetailPage from "./pages/ProductDetailPage/ProductDetailPage";
import OrderListPage from "./pages/OrderListPage/OrderListPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import MyPage from "./pages/MyPage/MyPage";

import AuthGuard from "./components/AuthGuard";
import Header from "./components/Header";

import styles from "./App.module";
import { USER_ACCESS_POLICY } from "./constants";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header className={styles.header} />
        <Routes>
          <Route path="/" element={<ProductListPage />} />
          <Route
            path="/cart"
            element={
              <AuthGuard policy={USER_ACCESS_POLICY.ONLY_LOGGED_IN_USER}>
                <CartPage />
              </AuthGuard>
            }
          />
          <Route
            path="/login"
            element={
              <AuthGuard policy={USER_ACCESS_POLICY.ONLY_LOGGED_OUT_USER}>
                <LoginPage />
              </AuthGuard>
            }
          />
          <Route
            path="/signup"
            element={
              <AuthGuard policy={USER_ACCESS_POLICY.ONLY_LOGGED_OUT_USER}>
                <SignUpPage />
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
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route
            path="/order-list"
            element={
              <AuthGuard policy={USER_ACCESS_POLICY.ONLY_LOGGED_IN_USER}>
                <OrderListPage />
              </AuthGuard>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
