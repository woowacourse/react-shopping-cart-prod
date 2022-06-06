import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import ReduxLogger from 'redux-logger';
import reducers from 'reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

import { persistStore } from 'redux-persist';

export const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(ReduxThunk, ReduxLogger)),
);

export const persistor = persistStore(store);

export default { store, persistor };
