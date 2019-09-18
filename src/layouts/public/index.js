import React from 'react';
import { Switch, Route } from 'react-router-dom';
import withRoot from '../../wiring/with-root';

import Home from '../../routes/home';
import About from '../../routes/about';
import Login from '../../routes/login';
import ForgotPassword from '../../routes/login/forgot-password';
import ResetPassword from '../../routes/login/reset-password';

const App = () => (
    <Route
        render={({ location }) => (
            <React.Fragment>
                <main className="container">
                    <Switch location={location}>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/about" component={About} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/login/forgot-password" component={ForgotPassword} />
                        <Route path="/login/reset-password" component={ResetPassword} />
                    </Switch>
                </main>
            </React.Fragment>
        )}
    />
);

export default withRoot(App);
