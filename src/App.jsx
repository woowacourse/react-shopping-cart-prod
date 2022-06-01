import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";

import ProductList from "@/pages/home/components/product-list/ProductList";
import Cart from "@/pages/cart/components/cart/Cart";
import Layout from "@/components/layout/Layout";
import NotFound from "@/pages/not-found/NotFound";
import Signin from "@/pages/sign-in/Signin";
import Signup from "@/pages/sign-up/Signup";

import theme from "@/styles/theme";
import GlobalStyle from "@/styles/reset";

if (process.env.NODE_ENV === "development") {
  const { worker } = require("./mocks/browser");
  worker.start();
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Signin />} />
          <Route path="/register" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
