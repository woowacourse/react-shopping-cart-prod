import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import logger from 'redux-logger';

import rootReducer from 'store/rootReducer';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(logger)));

export default store;
