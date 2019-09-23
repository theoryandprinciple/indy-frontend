import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AdminHome from '../../routes/admin';
import FlowBuilder from '../../routes/admin/beaver/flow-builder';
import OutputBuilderCreate from '../../routes/admin/beaver/output-builder/components/create';
import withRoot from '../../wiring/with-root';
import AdminHeader from '../../components/admin/header';

const App = () => (
    <Route
        render={({ location }) => (
            <React.Fragment>
                <AdminHeader />
                <main>
                    <Switch location={location}>
                        <Route
                            exact
                            path="/admin"
                            component={AdminHome}
                        />
                        <Route
                            exact
                            path="/admin/flow-builder"
                            component={FlowBuilder}
                        />
                        <Route
                            exact
                            path="/admin/output-builder/create"
                            component={OutputBuilderCreate}
                        />
                    </Switch>
                </main>
            </React.Fragment>
        )}
    />
);

export default withRoot(App);
