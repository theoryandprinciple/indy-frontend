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
import Intake3 from '../../routes/intake/step3';
import Intake4 from '../../routes/intake/step4';
import Intake5 from '../../routes/intake/step5';

import IntakeStart from '../../routes/intake/start';
import IntakeQualify from '../../routes/intake/qualify';
import IntakeNoQualify from '../../routes/intake/no-qualify';

import Form1 from '../../routes/form/step1';
import Form2 from '../../routes/form/step2';
import Form3 from '../../routes/form/step3';

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
                    <Route exact path="/intake/start">
                        <IntakeStart />
                    </Route>
                    <Route exact path="/intake/qualify">
                        <IntakeQualify />
                    </Route>
                    <Route exact path="/intake/noqualify">
                        <IntakeNoQualify />
                    </Route>
                    <Route exact path="/intake/noqualify">
                        <IntakeStart />
                    </Route>
                    <Route exact path="/intake/1">
                        <Intake1 />
                    </Route>
                    <Route exact path="/intake/2">
                        <Intake2 />
                    </Route>
                    <Route exact path="/intake/3">
                        <Intake3 />
                    </Route>
                    <Route exact path="/intake/4">
                        <Intake4 />
                    </Route>
                    <Route exact path="/intake/5">
                        <Intake5 />
                    </Route>
                    <Route path="/intake">
                        <IntakeStart />
                    </Route>

                    <Route exact path="/form/1">
                        <Form1 />
                    </Route>
                    <Route exact path="/form/2">
                        <Form2 />
                    </Route>
                    <Route exact path="/form/3">
                        <Form3 />
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
