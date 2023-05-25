import React from "react";
import { RecoilRoot } from "recoil";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import theme from "./styles/theme";
import GlobalStyle from "./styles";

import App from "./App";
import NotFoundPage from "./pages/NotFoundPage";
import ProductsListPage from "./pages/ProductsListPage";
import CartPage from "./pages/CartPage";

import { worker } from "./mocks/browser";

const main = async () => {
  if (window.location.pathname === "/react-shopping-cart-prod") {
    window.location.pathname = "/react-shopping-cart-prod/";
    return;
  }

  await worker.start({
    serviceWorker: {
      url: "/react-shopping-cart-prod/mockServiceWorker.js",
    },
  });
};

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      errorElement: <NotFoundPage />,
      children: [
        { path: "", element: <ProductsListPage /> },
        { path: "/cart", element: <CartPage /> },
      ],
    },
  ],
  {
    basename: process.env.PUBLIC_URL,
  }
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <RouterProvider router={router} />
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>
);

main();
