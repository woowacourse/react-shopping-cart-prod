import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";

<<<<<<< HEAD
import ProductList from "@/pages/home/components/product-list/ProductList";
import Cart from "@/pages/cart/components/cart/Cart";

import NotFound from "@/pages/not-found/NotFound";
import Signin from "@/pages/sign-in/Signin";
import Signup from "@/pages/sign-up/Signup";
import UserEdit from "@/pages/user-edit/UserEdit";
import ProductDetail from "@/pages/product-detail/ProductDetail";

import Layout from "@/components/layout/Layout";
import Snackbar from "@/components/snackbar/Snackbar";
=======
import Home from "@/pages/Home";
import Cart from "@/pages/Cart";
import NotFound from "@/pages/NotFound";
import Signin from "@/pages/Signin";
import Signup from "@/pages/Signup";
import UserEdit from "@/pages/UserEdit";
import ProductDetail from "@/pages/ProductDetail";

import Layout from "@/components/Layout";
import Snackbar from "@/components/Snackbar";
>>>>>>> ac0b09b49c7603f5a9d106d8f21d02ed060eed58

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
<<<<<<< HEAD
          <Route path={PATH.MAIN} element={<ProductList />} />
=======
          <Route path={PATH.MAIN} element={<Home />} />
>>>>>>> ac0b09b49c7603f5a9d106d8f21d02ed060eed58
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
