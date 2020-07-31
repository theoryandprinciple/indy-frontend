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
import ErrorFallback from './components/ErrorFallback';

import { ClearErrors } from './actions/auth';
import reducers from './reducers';

import browserHistory from './wiring/history';
import App from './routes';

import Initializers from './initializers';
import InitializerUser from './initializers/user';

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
const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'],
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

const onBeforeLift = () => {
    // Run initializers... anything that will need to use or subscribe to the store
    Initializers(store);

    // clear login/logout errors that may be in local storage
    store.dispatch(ClearErrors());

    if (store.getState().auth.isAuthenticated) {
        InitializerUser(store);
        // load role specific content
        // if (store.getState().auth.credentials.role === 'admin') {}
    }
};

ReactDOM.render(
    <Provider store={store}>
        <PersistGate
            loading={null}
            persistor={persistedStore}
            onBeforeLift={onBeforeLift}
        >
            <ConnectedRouter history={browserHistory}>
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                    <App />
                </ErrorBoundary>
            </ConnectedRouter>
        </PersistGate>
    </Provider>,
    document.getElementById('root'),
);
