import * as AuthActions from '../../../actions/auth';
import { connect } from 'react-redux';
import ResetPasswordForm from '../components/resetPass';

const internals = {};

internals.connectStuff = connect(
    (state) => ({
        resetPassError: state.auth.resetPass.error,
        resetPassErrorMsg: state.auth.resetPass.errorMsg
    }),
    {
        resetPassCancel: AuthActions.resetPassCancel,
        resetPass: AuthActions.resetPass
    }
);

export default internals.connectStuff(ResetPasswordForm);
