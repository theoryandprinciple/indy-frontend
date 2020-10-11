import React from 'react';
import {
    Switch,
    Route,
    useLocation,
} from 'react-router-dom';

import PublicLayout from '../layouts/public';

const App = () => {
    const location = useLocation();

    return (
        <Switch location={location}>
            <Route path="/">
                <PublicLayout />
            </Route>
        </Switch>
    );
};

export default App;
