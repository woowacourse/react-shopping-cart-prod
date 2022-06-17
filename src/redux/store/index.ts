import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import { persistStore } from 'redux-persist';
import ReduxThunk from 'redux-thunk';
import rootReducer from 'redux/reducers';

const middlewares = [logger, ReduxThunk];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);

const persistor = persistStore(store);

export { store, persistor };
