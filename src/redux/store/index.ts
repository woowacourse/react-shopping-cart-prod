import { applyMiddleware, createStore } from 'redux';
import { persistStore } from 'redux-persist';
import ReduxThunk from 'redux-thunk';
import rootReducer from 'redux/reducers';

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const persistor = persistStore(store);

export { store, persistor };
