import ReactDOM from "react-dom/client";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import App from "@/App";
import reducer from "@redux/reducer";
import "./index.css";
import "@scss/style";
import LocalStorage from "./storage/localStorage";
import requestUserInfo from "./remote/userInfo";

function prepareMSW() {
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line global-require
    const { worker } = require("../mock/browser");
    return worker.start();
  }
  return Promise.resolve();
}

async function setupStore() {
  const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart") || "{}");

  let user = {
    isLoggedIn: false,
    email: null,
    username: null,
  };

  const accesstoken = LocalStorage.getItem("accessToken");
  if (accesstoken) {
    const _user = await requestUserInfo(accesstoken);
    if (_user) {
      user = {
        isLoggedIn: true,
        ..._user,
      };
    }
  }

  const initialState = {
    user,
    productList: [], // 화면에 그리는 용도
    productObjs: {}, // 상품 정보 검색용
    cart: cartFromLocalStorage, // 장바구니에 담긴 상품 리스트
  };

  const store = createStore(reducer, initialState, applyMiddleware(thunk));
  return store;
}

prepareMSW().then(async () => {
  const store = await setupStore();

  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
});
