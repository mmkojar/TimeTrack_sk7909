import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';
// import storage from 'redux-persist/lib/storage'

// const initialState = {};

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const middleware = [thunk];

export default () => {
    let store = createStore(persistedReducer,applyMiddleware(...middleware))
    let persistor = persistStore(store)
    return { store, persistor }
}
  
/* const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware)
);
export default store; */