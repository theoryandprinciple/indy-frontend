import React from 'react';
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import AuthStatuses from '../utils/auth-statuses';

const Loading = <div>loading</div>;
const AuthAdmin = connectedRouterRedirect({
    redirectPath: '/login',
    authenticatedSelector: state => state.auth.isAuthenticated === true
        && state.auth.credentials.role === 'admin',
    authenticatingSelector: state => (
        state.auth.status === AuthStatuses.INIT
            || state.auth.status === AuthStatuses.WAITING
    ),
    AuthenticatingComponent: () => <Loading />, // eslint-disable-line react/display-name
    wrapperDisplayName: 'UserIsAuthenticated',
});
export default AuthAdmin;
