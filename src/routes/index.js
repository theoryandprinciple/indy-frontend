import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Home from './home';
import About from './about';
import Login from './login';
import ForgotPassword from './login/forgot-password';
import ResetPassword from './login/reset-password';
import AdminHome from './admin';
import FlowBuilder from './admin/flow-builder';
// import ResetPassword from './login/containers/reset-pass';
import withRoot from '../wiring/with-root';
import { useAuthDataContext } from '../utils/auth-provider';


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
            <React.Fragment>
                <MuiThemeProvider theme={themer}>
                    <main className="container">
                        <Switch location={location}>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/about" component={About} />
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/login/forgot-password" component={ForgotPassword} />
                            <Route path="/login/reset-password" component={ResetPassword} />
                            <PrivateRoute
                                exact
                                path="/admin"
                                component={AdminHome}
                            />
                            <PrivateRoute
                                exact
                                path="/admin/flow-builder"
                                component={FlowBuilder}
                            />
                            {/* <Route path="/reset-pass" component={ResetPassword} /> */}
                        </Switch>
                    </main>
                </MuiThemeProvider>
            </React.Fragment>
        )}
    />
);

export default withRoot(App);
