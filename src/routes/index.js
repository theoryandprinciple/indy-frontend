import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';

import PublicLayout from '../layouts/public';
import AdminLayout from '../layouts/admin';
import Login from './login';

import withRoot from '../wiring/with-root';
import { useAuthDataContext } from './login/wiring/auth-provider';

import themer from '../styles/material-theme';

const PrivateRoute = ({ ...options }) => {
    const { authData } = useAuthDataContext();

    const FinalComponent = authData.isAuthenticated ? AdminLayout : Login;
    return <Route {...options}><FinalComponent /></Route>;
};

const App = () => {
    const location = useLocation();

    return (
        <MuiThemeProvider theme={themer}>
            <Switch location={location}>
                <PrivateRoute path="/admin" />
                <Route path="/">
                    <PublicLayout />
                </Route>
            </Switch>
        </MuiThemeProvider>
    );
};

export default withRoot(App);
