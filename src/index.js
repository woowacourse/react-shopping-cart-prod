import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import ReduxThunk from "redux-thunk";

import { worker } from "mocks/browser";
import rootReducer from "reducers/index";

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

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk))
);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <GlobalStyle />
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);

// main();
