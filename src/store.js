import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
// import createHistory from 'history/createBrowserHistory';
import { createBrowserHistory } from 'history';

import rootReducer from './reducers';

export const history = createBrowserHistory();

const initialState = {};
const enhancers = [];
const middleware = [thunk, routerMiddleware(history)];

if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

    if (typeof devToolsExtension === 'function') {
        enhancers.push(devToolsExtension());
    }
}

const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers,
);

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'],
};
const persistedReducer = persistReducer(persistConfig, rootReducer(history));

export const store = createStore(
    connectRouter(history)(persistedReducer),
    // rootReducer(history),
    initialState,
    composedEnhancers,
);

export const persistor = persistStore(store);
