import * as AuthActions from '../../../actions/auth';
import { connect } from 'react-redux';
import Login from '../components/';
import AuthStatuses from '../../../utils/auth-statuses'

const internals = {};

internals.connectStuff = connect(
  state => ({
    errored: state.auth.error.login,
    isLoggedIn: state.auth.isAuthenticated,
    isLoginPending: (state.auth.status === AuthStatuses.WAITING)
  }),
  {
    login: AuthActions.login,
    logout: AuthActions.logout
  }
);

export default internals.connectStuff(Login)
