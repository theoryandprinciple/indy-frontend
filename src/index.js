import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import 'bootstrap-css-only/css/bootstrap-grid.min.css';
import AuthDataProvider from './routes/login/wiring/auth-provider';
import FlowDataProvider from './routes/admin/beaver/wiring/flow-provider'; // move this down the tree at some point

import { history } from './wiring/history';
import App from './routes';

import 'sanitize.css/sanitize.css';
import './index.css';

ReactDOM.render(
    <Router history={history}>
        <AuthDataProvider>
            <FlowDataProvider>
                <App />
            </FlowDataProvider>
        </AuthDataProvider>
    </Router>,
    document.getElementById('root'),
);
