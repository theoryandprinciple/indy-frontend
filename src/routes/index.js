import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';

import PublicLayout from '../layouts/public';
import AdminLayout from '../layouts/admin';
import Login from './login';

import withRoot from '../wiring/with-root';
import { useAuthDataContext } from './login/wiring/auth-provider';

import themer from '../styles/material-theme';

const PrivateRoute = ({ component, ...options }) => {
    const { authData } = useAuthDataContext();
    const finalComponent = authData.isAuthenticated ? component : Login;

    return <Route {...options} component={finalComponent} />;
};
PrivateRoute.propTypes = {
    component: PropTypes.func.isRequired,
};

const App = () => (
    <Route
        render={({ location }) => (
            <MuiThemeProvider theme={themer}>
                <Switch location={location}>
                    <PrivateRoute
                        path="/admin"
                        component={AdminLayout}
                    />
                    <Route exact path="/" component={PublicLayout} />
                </Switch>
            </MuiThemeProvider>
        )}
    />
);

export default withRoot(App);
