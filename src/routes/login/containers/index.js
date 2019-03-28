import { connect } from 'react-redux';
import * as AuthActions from '../../../actions/auth';
import LoginPage from '../components';

const internals = {};

internals.connectStuff = connect(
    state => ({
        isLoggedIn: state.auth.isAuthenticated,
    }),
    {
        logout: AuthActions.logout,
    },
);

export default internals.connectStuff(LoginPage);
