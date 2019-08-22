import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Home from './home';
import About from './about';
import Login from './new-login';
import ProtectedRoute from './admin';
// import ResetPassword from './login/containers/reset-pass';
import withRoot from '../wiring/with-root';
import { useAuthDataContext } from '../utils/auth-provider';


const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
});

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
                <MuiThemeProvider theme={theme}>
                    <Typography variant="h1">
                        h1 header
                    </Typography>
                    <main>
                        <Switch location={location}>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/about" component={About} />
                            <Route exact path="/login" component={Login} />
                            <PrivateRoute
                                exact
                                path="/admin"
                                component={ProtectedRoute}
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
