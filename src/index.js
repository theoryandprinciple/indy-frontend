import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import 'bootstrap-css-only/css/bootstrap-grid.min.css';
import AuthDataProvider from './routes/login/wiring/auth-provider';
import ErrorFallback from './components/ErrorFallback';

import ScrollToTop from './utils/scroll-to-top';

import history from './wiring/history';
import App from './routes';

import 'sanitize.css/sanitize.css';
import './index.css';

if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line global-require
    const axe = require('react-axe');
    axe(React, ReactDOM, 1000);
}

history.listen(() => {
    ScrollToTop();
});

ReactDOM.render(
    <Router history={history}>
        <AuthDataProvider>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <App />
            </ErrorBoundary>
        </AuthDataProvider>
    </Router>,
    document.getElementById('root'),
);
