import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Home from './home/containers';
import About from './about';
import Login from './login/components';
import ProtectedRoute from './admin';
import ResetPassword from './login/containers/reset-pass';
import withRoot from '../wiring/with-root';
import AuthenticateAdmin from '../wiring/auth-admin';

const AuthenticatedProtectedRoute = AuthenticateAdmin(ProtectedRoute);

const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
});

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
                            <Route
                                exact
                                path="/admin"
                                component={AuthenticatedProtectedRoute}
                            />
                            <Route path="/reset-pass" component={ResetPassword} />
                        </Switch>
                    </main>
                </MuiThemeProvider>
            </React.Fragment>
        )}
    />
);

export default withRoot(App);
