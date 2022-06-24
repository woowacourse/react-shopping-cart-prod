import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";

import "./index.css";
import "@scss/style";

import App from "./App";
import store from "./redux/store";

if (process.env.NODE_ENV === "development") {
  // eslint-disable-next-line global-require
  const { worker } = require("../mock/browser");
  worker.start();
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
