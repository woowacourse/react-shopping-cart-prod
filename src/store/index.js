import { legacy_createStore as createStore, applyMiddleware } from 'redux';
// import logger from 'redux-logger';
import rootReducer from 'store/rootReducer';

const store = createStore(rootReducer, applyMiddleware());

export default store;
