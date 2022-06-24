import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProductListPage from "./pages/ProductListPage/ProductListPage";
import CartPage from "./pages/CartPage/CartPage";
import ProductDetailPage from "./pages/ProductDetailPage/ProductDetailPage";
import OrderListPage from "./pages/OrderListPage/OrderListPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import MyPage from "./pages/MyPage/MyPage";
import WrongAccessPage from "./pages/WrongAccessPage/WrongAccessPage";

import AuthGuard from "./components/AuthGuard";
import Header from "./components/Header";
import HeaderMenus from "./components/HeaderMenus";

import styles from "./App.module";
import { USER_ACCESS_POLICY } from "./constants";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header className={styles.header} menu={<HeaderMenus />} />
        <Routes>
          <Route path="/" element={<ProductListPage />} />
          <Route
            path="/cart"
            element={
              <AuthGuard policy={USER_ACCESS_POLICY.ONLY_LOGGED_IN}>
                <CartPage />
              </AuthGuard>
            }
          />
          <Route
            path="/login"
            element={
              <AuthGuard policy={USER_ACCESS_POLICY.ONLY_LOGGED_OUT}>
                <LoginPage />
              </AuthGuard>
            }
          />
          <Route
            path="/signup"
            element={
              <AuthGuard policy={USER_ACCESS_POLICY.ONLY_LOGGED_OUT}>
                <SignUpPage />
              </AuthGuard>
            }
          />
          <Route
            path="/my-page"
            element={
              <AuthGuard policy={USER_ACCESS_POLICY.ONLY_LOGGED_IN}>
                <MyPage />
              </AuthGuard>
            }
          />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route
            path="/order-list"
            element={
              <AuthGuard policy={USER_ACCESS_POLICY.ONLY_LOGGED_IN}>
                <OrderListPage />
              </AuthGuard>
            }
          />
          <Route path="*" element={<WrongAccessPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
