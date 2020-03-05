import React from 'react';
import {
    Switch,
    Route,
    Redirect,
    useLocation,
} from 'react-router-dom';

import PublicLayout from '../layouts/public';
import AdminLayout from '../layouts/admin';

import { useAuthDataContext } from './login/wiring/auth-provider';

const App = () => {
    const location = useLocation();
    const { authData } = useAuthDataContext();

    return (
        <Switch location={location}>
            <Route path="/admin">
                {authData.isAuthenticated ? <AdminLayout /> : <Redirect to={{ pathname: '/login', state: { from: location } }} />}
            </Route>
            <Route path="/">
                <PublicLayout />
            </Route>
        </Switch>
    );
};

export default App;
