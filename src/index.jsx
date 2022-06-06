import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

import App from "@/App";

<<<<<<< HEAD
import Loading from "@/components/loading/Loading";
=======
import Loading from "@/components/Loading";
>>>>>>> ac0b09b49c7603f5a9d106d8f21d02ed060eed58
import configureStore from "@/redux/index";

const { store, persistor } = configureStore();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={<Loading />} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
