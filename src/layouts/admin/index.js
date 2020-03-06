import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import AdminHome from '../../routes/admin';
import FlowBuilder from '../../routes/admin/beaver/flow-builder';
import OutputBuilderCreate from '../../routes/admin/beaver/output-builder/components/create';
import OutputBuilderDashboard from '../../routes/admin/beaver/output-builder/components/dashboard';
import withRoot from '../../wiring/with-root';
import AdminHeader from '../../components/admin/header';
import FlowDataProvider from '../../routes/admin/beaver/wiring/flow-provider';
import OutputDataProvider from '../../routes/admin/beaver/wiring/output-provider';

import themer from '../../styles/material-theme';

const AdminLayout = () => {
    const location = useLocation();
    return (
        <React.Fragment>
            <AdminHeader />
            <main>
                <FlowDataProvider>
                    <OutputDataProvider>
                        <Switch location={location}>
                            <Route exact path="/admin">
                                <AdminHome />
                            </Route>
                            <Route exact path="/admin/flow-builder">
                                <FlowBuilder />
                            </Route>
                            <Route exact path="/admin/output-builder">
                                <OutputBuilderDashboard />
                            </Route>
                            <Route exact path="/admin/output-builder/create">
                                <OutputBuilderCreate />
                            </Route>
                        </Switch>
                    </OutputDataProvider>
                </FlowDataProvider>
            </main>
        </React.Fragment>
    );
};
export default withRoot(AdminLayout, themer);
