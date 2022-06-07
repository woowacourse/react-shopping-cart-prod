import { applyMiddleware, createStore } from 'redux';

import ReduxThunk from 'redux-thunk';
import { persistStore } from 'redux-persist';
import rootReducer from 'redux/reducers';

export type RootState = ReturnType<typeof store.getState>;

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const persistor = persistStore(store);

export { store, persistor };
