import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import AuthDataProvider from './utils/auth-provider';

import { history } from './wiring/history';
import App from './routes';

import 'sanitize.css/sanitize.css';
import './index.css';

ReactDOM.render(
    <Router history={history}>
        <AuthDataProvider>
            <App />
        </AuthDataProvider>
    </Router>,
    document.getElementById('root'),
);
