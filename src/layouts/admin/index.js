import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import AdminHome from '../../routes/admin';
import withRoot from '../../wiring/with-root';
import AdminHeader from '../../components/admin/header';

import themer from '../../styles/material-theme';

const AdminLayout = () => {
    const location = useLocation();
    return (
        <React.Fragment>
            <AdminHeader />
            <main>
                <Switch location={location}>
                    <Route exact path="/admin">
                        <AdminHome />
                    </Route>
                </Switch>
            </main>
        </React.Fragment>
    );
};
export default withRoot(AdminLayout, themer);
