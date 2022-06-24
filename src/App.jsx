import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProductListPage from "./pages/ProductListPage/ProductListPage";
import CartPage from "./pages/CartPage/CartPage";
import ProductDetailPage from "./pages/ProductDetailPage/ProductDetailPage";
import OrderListPage from "./pages/OrderListPage/OrderListPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import MyPage from "./pages/MyPage/MyPage";
import WrongAccessPage from "./pages/WrongAccessPage/WrongAccessPage";

import Header from "./components/Header";
import HeaderMenus from "./components/HeaderMenus";

import styles from "./App.module";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header className={styles.header} menu={<HeaderMenus />} />
        <Routes>
          <Route path="/" element={<ProductListPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />

          <Route path="/cart" element={<CartPage />} />
          <Route path="/order-list" element={<OrderListPage />} />
          <Route path="/my-page" element={<MyPage />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />

          <Route path="*" element={<WrongAccessPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
