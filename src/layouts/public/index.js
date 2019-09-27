import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import withRoot from '../../wiring/with-root';

import Home from '../../routes/home';
import About from '../../routes/about';
import Login from '../../routes/login';
import ForgotPassword from '../../routes/login/forgot-password';
import ResetPassword from '../../routes/login/reset-password';

const App = () => {
    const location = useLocation();

    return (
        <main className="container">
            <Switch location={location}>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/about">
                    <About />
                </Route>
                <Route exact path="/login">
                    <Login />
                </Route>
                <Route exact path="/login/forgot-password">
                    <ForgotPassword />
                </Route>
                <Route path="/reset-password/:resetToken">
                    <ResetPassword />
                </Route>
            </Switch>
        </main>
    );
};

export default withRoot(App);
