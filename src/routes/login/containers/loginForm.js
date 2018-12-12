import * as AuthActions from '../../../actions/auth';
import { connect } from 'react-redux';
import LoginForm from '../components/loginForm';
import AuthStatuses from '../../../utils/auth-statuses'

const internals = {};

internals.connectStuff = connect(
  state => ({
    errored: state.auth.error.login,
    isLoggedIn: state.auth.isAuthenticated,
    isLoginPending: (state.auth.status === AuthStatuses.WAITING),
    forgotPassError: state.auth.forgotPass.error,
    forgotPassErrorMsg: state.auth.forgotPass.errorMsg,
    forgotPassComplete: state.auth.forgotPass.complete,
  }),
  {
    login: AuthActions.login,
    logout: AuthActions.logout,
    forgotPass: AuthActions.forgotPass
  }
);

export default internals.connectStuff(LoginForm)
