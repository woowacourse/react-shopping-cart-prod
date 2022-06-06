import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";

import ProductList from "@/components/pages/home/product-list/ProductList";
import Cart from "@/components/pages/cart/Cart";

import NotFound from "@/components/pages/not-found/NotFound";
import Signin from "@/components/pages/sign-in/Signin";
import Signup from "@/components/pages/sign-up/Signup";
import UserEdit from "@/components/pages/user-edit/UserEdit";
import ProductDetail from "@/components/pages/product-detail/ProductDetail";

import Layout from "@/components/common/layout/Layout";
import Snackbar from "@/components/common/snackbar/Snackbar";

import theme from "@/styles/theme";
import GlobalStyle from "@/styles/reset";

import { PATH } from "@/constants";

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
          <Route path={PATH.MAIN} element={<ProductList />} />
          <Route path={PATH.LOGIN} element={<Signin />} />
          <Route path={PATH.REGISTER} element={<Signup />} />
          <Route path={PATH.EDIT} element={<UserEdit />} />
          <Route path={`${PATH.DETAIL}/:id`} element={<ProductDetail />} />
          <Route path={PATH.CART} element={<Cart />} />
          <Route path={PATH.NOT_FOUND} element={<NotFound />} />
        </Route>
      </Routes>
      <Snackbar timeout={3000} />
    </ThemeProvider>
  );
}

export default App;
