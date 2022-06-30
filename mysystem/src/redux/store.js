import { CollapsedReducer } from "./reducers/CollapsedReducer"
import { combineReducers, createStore } from 'redux'
import { LoadingReducer } from "./reducers/LoadingReducer"

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
    key: 'persistData',
    storage,
    whitelist: ['CollapsedReducer'] ,
    // blacklist: ['LoadingReducer']

}

const reducer = combineReducers({
    CollapsedReducer,
    LoadingReducer
})
const persistedReducer = persistReducer(persistConfig, reducer)
  

const store = createStore(persistedReducer);
const persistor = persistStore(store)
export {
    store,
    persistor
}