import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import Home from './home/containers';
import About from './about';
import Login from './login/containers';
import ProtectedRoute from './admin';
import ResetPassword from './login/containers/resetPass';
import withRoot from '../wiring/withRoot';
import Authenticate_Admin from '../wiring/authAdmin';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const Authenticated_ProtectedRoute = withRouter(
    Authenticate_Admin(ProtectedRoute)
);

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
            <AppBar position="static" color="default">
              <Toolbar>
                <Typography variant="h6" color="inherit">
                  Nice Looking App
                </Typography>
              </Toolbar>
            </AppBar>
                <main>
                    <Switch location={location}>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/about" component={About} />
                        <Route exact path="/login" component={Login} />
                        <Route
                            exact
                            path="/admin"
                            component={Authenticated_ProtectedRoute}
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
