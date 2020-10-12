import React from 'react';
import {
    Switch,
    Route,
    Redirect,
    useLocation,
} from 'react-router-dom';
import withRoot from '../../wiring/with-root';

import Header from '../../components/header';
import Footer from '../../components/footer';

import Home from '../../routes/home';

import Intake1 from '../../routes/intake/step1';
import Intake2 from '../../routes/intake/step2';

import Demo from '../../routes/demo';
import Error404 from '../../routes/error/404';

import themer from '../../styles/material-theme';

const PublicLayout = () => {
    const location = useLocation();

    return (
        <>
            <Header />
            <main>
                <Switch location={location}>
                    <Route exact path="/error/404">
                        <Error404 />
                    </Route>
                    <Route exact path="/">
                        <>
                            <Home />
                            <Footer />
                        </>
                    </Route>
                    <Route exact path="/intake/1">
                        <Intake1 />
                    </Route>
                    <Route exact path="/intake/2">
                        <Intake2 />
                    </Route>
                    <Route path="/intake">
                        <Intake1 />
                    </Route>
                    <Route exact path="/demo">
                        <Demo />
                    </Route>
                    <Route path="/">
                        <Redirect to="/error/404" />
                    </Route>
                </Switch>
            </main>
        </>
    );
};

export default withRoot(PublicLayout, themer);
