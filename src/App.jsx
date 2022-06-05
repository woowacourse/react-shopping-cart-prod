import Header from "@shared/header/Header";
import styles from "@/app.module";
import Home from "@home/Home";
import Cart from "@cart/Cart";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetail from "@product-detail/ProductDetail";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import MyPage from "./pages/my-page/MyPage";
// import AuthGuard from "./auth-guard/AuthGuard/AuthGuard";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header className={styles.header} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/my-page" element={<MyPage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
