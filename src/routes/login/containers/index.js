import * as AuthActions from '../../../actions/auth';
import { connect } from 'react-redux';
import LoginPage from '../components/';
import AuthStatuses from '../../../utils/auth-statuses'

const internals = {};

internals.connectStuff = connect(
  state => ({
    isLoggedIn: state.auth.isAuthenticated
  }),
  {
    logout: AuthActions.logout
  }
);

export default internals.connectStuff(LoginPage)
