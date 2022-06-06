import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import rootReducer from 'store/rootReducer';
import { composeWithDevTools } from '@redux-devtools/extension';
import logger from 'redux-logger';
import ReduxThunk from 'redux-thunk';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(ReduxThunk, logger)));

export default store;
