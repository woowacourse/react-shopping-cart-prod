import { legacy_createStore as createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "@redux/reducer";

async function setupStore() {
  const store = createStore(reducer, applyMiddleware(thunk));
  return store;
}

export default setupStore;
