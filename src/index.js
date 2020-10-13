import React from 'react';
import ReactDOM from 'react-dom';
import { ErrorBoundary } from 'react-error-boundary';
import 'bootstrap-css-only/css/bootstrap-grid.min.css';

// REDUX
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { ConnectedRouter, routerMiddleware } from 'connected-react-router';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';

import ScrollToTop from './utils/scroll-to-top';
import ErrorFallback from './components/error-fallback';
import * as serviceWorker from './service-worker';

import reducers from './reducers';

import browserHistory from './wiring/history';
import App from './routes';

import 'sanitize.css/sanitize.css';
import './index.css';

const initialState = {};
const enhancers = [];
const middleware = [thunk, routerMiddleware(browserHistory)];
if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

    if (typeof devToolsExtension === 'function') {
        enhancers.push(devToolsExtension());
    }
}
if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line global-require
    const axe = require('react-axe');
    axe(React, ReactDOM, 1000);
}
const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);
const persistConfig = {
    key: 'root',
    storage,
    blacklist: 'intake',
};
const persistedReducer = persistReducer(persistConfig, reducers(browserHistory));
const store = createStore(
    persistedReducer,
    initialState,
    composedEnhancers,
);
const persistedStore = persistStore(store);

browserHistory.listen(() => {
    ScrollToTop();
});

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistedStore}>
            <ConnectedRouter history={browserHistory}>
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                    <App />
                </ErrorBoundary>
            </ConnectedRouter>
        </PersistGate>
    </Provider>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
