import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

const persistConfig = {
  key: 'root',
  storage,
  // whitelist: ['page'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store: any = createStore(persistedReducer, composeWithDevTools());
export type dispatchType = typeof store.dispatch;
export const persistor: any = persistStore(store);
export default store;
