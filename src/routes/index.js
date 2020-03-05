import React from 'react';
import {
    Switch,
    Route,
    Redirect,
    useLocation,
} from 'react-router-dom';
import { useSelector } from 'react-redux';

import PublicLayout from '../layouts/public';
import AdminLayout from '../layouts/admin';

const App = () => {
    const location = useLocation();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    return (
        <Switch location={location}>
            <Route path="/admin">
                {isAuthenticated ? <AdminLayout /> : <Redirect to={{ pathname: '/login', state: { from: location } }} />}
            </Route>
            <Route path="/">
                <PublicLayout />
            </Route>
        </Switch>
    );
};

export default App;
