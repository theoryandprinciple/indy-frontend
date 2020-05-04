import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import 'bootstrap-css-only/css/bootstrap-grid.min.css';
import AuthDataProvider from './routes/login/wiring/auth-provider';
import ErrorFallback from './components/ErrorFallback';

import history from './wiring/history';
import App from './routes';

import 'sanitize.css/sanitize.css';
import './index.css';

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
