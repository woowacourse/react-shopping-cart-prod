import Header from "@shared/header/Header";
import styles from "@/app.module";
import Home from "@home/Home";
import Cart from "@cart/Cart";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetail from "@product-detail/ProductDetail";
import OrderList from "@order-list/OrderList";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import MyPage from "./pages/my-page/MyPage";
import AuthGuard from "./auth-guard/AuthGuard";
import { accessPolicy } from "./auth-guard/constants";

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
              <AuthGuard policy={accessPolicy.onlyLoggedInUser}>
                <Cart />
              </AuthGuard>
            }
          />
          <Route
            path="/login"
            element={
              <AuthGuard policy={accessPolicy.onlyLoggedOutUser}>
                <Login />
              </AuthGuard>
            }
          />
          <Route
            path="/signup"
            element={
              <AuthGuard policy={accessPolicy.onlyLoggedOutUser}>
                <Signup />
              </AuthGuard>
            }
          />
          <Route
            path="/my-page"
            element={
              <AuthGuard policy={accessPolicy.onlyLoggedInUser}>
                <MyPage />
              </AuthGuard>
            }
          />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route
            path="/order-list"
            element={
              <AuthGuard policy={accessPolicy.onlyLoggedInUser}>
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
