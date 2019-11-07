import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap-css-only/css/bootstrap-grid.min.css';

// REDUX
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Router } from 'react-router-dom';
import { syncHistoryWithStore } from 'react-router-redux';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';

import reducers from './reducers';

import browserHistory from './wiring/history';
import App from './routes';

import 'sanitize.css/sanitize.css';
import './index.css';

const initialState = {};
const enhancers = [];
const middleware = [thunk];
if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

    if (typeof devToolsExtension === 'function') {
        enhancers.push(devToolsExtension());
    }
}
const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'],
};
const persistedReducer = persistReducer(persistConfig, reducers);
const store = createStore(persistedReducer, initialState, composedEnhancers);
const persistedStore = persistStore(store);

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

// import { clearErrors } from './actions/auth';
const onBeforeLift = () => {
    // clear login/logout errors that may be in local state
    // store.dispatch(clearErrors());
};

ReactDOM.render(
    <Provider store={store}>
        <PersistGate
            loading={null}
            persistor={persistedStore}
            onBeforeLift={onBeforeLift}
        >
            <Router history={history}>
                <App />
            </Router>
        </PersistGate>
    </Provider>,
    document.getElementById('root'),
);
