import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { worker } from "mocks/browser";

import App from "./components/App";

import GlobalStyle from "./GlobalStyle";

const main = () => {
  if (process.env.NODE_ENV === "development") {
    if (window.location.pathname === "/react-shopping-cart") {
      window.location.pathname = "/react-shopping-cart/";
      return;
    }
    worker.start({
      serviceWorker: {
        url: "/react-shopping-cart/mockServiceWorker.js",
      },
    });
  }
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <GlobalStyle />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// main();
