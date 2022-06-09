import { legacy_createStore as createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";

import reducer from "@redux/reducer";
import { getUser } from "@redux/reducers/user-reducer/userThunks";
import LocalStorage from "@utils/LocalStorage";

import "./index.css";
import "@scss/style";

import App from "./App";

function prepareMSW() {
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line global-require
    const { worker } = require("../mock/browser");
    return worker.start();
  }
  return Promise.resolve();
}

prepareMSW().then(async () => {
  const store = createStore(reducer, applyMiddleware(thunk));
  const accessToken = LocalStorage.getItem("accessToken");
  accessToken && (await getUser()(store.dispatch));
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
});
