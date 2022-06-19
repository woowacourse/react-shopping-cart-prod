import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import rootReducer from 'reducers/rootReducer';
import middlewarePromise from 'middlewares/custom-redux-promise';

const configureStore = () => {
  const middlewares = [ReduxThunk, middlewarePromise];
  const store = createStore(
    rootReducer(),
    composeWithDevTools(applyMiddleware(...middlewares)),
  );
  return store;
};

export default configureStore;
