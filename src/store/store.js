import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import rootReducer from 'store/rootReducer';
import { composeWithDevTools } from '@redux-devtools/extension';
import logger from 'redux-logger';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(logger)));
store.subscribe(() => store.getState());

export default store;
