import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger';

import rootReducer from 'store/rootReducer';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(ReduxThunk, logger)));

export default store;
