import WebClient from '../utils/web-client';
import AuthTypes from '../action-types/auth';
import UserTypes from '../action-types/user';

export const ClearErrors = () => ({
    type: AuthTypes.INITIALIZE_APP,
});

export const LoginBegin = payload => ({
    type: AuthTypes.LOGIN_BEGIN,
    payload,
});
const LoginSuccess = payload => ({
    type: AuthTypes.LOGIN_SUCCESS,
    payload,
});
const LoginError = payload => ({
    type: AuthTypes.LOGIN_ERROR,
    payload,
});
export const SetupUser = user => ({
    type: UserTypes.SETUP_USER,
    payload: user,
});

export const Login = formValues => async (dispatch) => {
    const { email, password } = formValues;

    dispatch(LoginBegin({ isAuthenticated: false, error: false, errorMsg: '' }));
    try {
        const data = await WebClient.post(
            '/login',
            { email, password },
            { responseType: 'text' },
        );

        // update auth token
        WebClient.updateAuth(data.token);

        const userData = {
            isAuthenticated: true,
            credentials: {
                token: data.token,
                role: data.user.role,
            },
            error: false,
            errorMsg: '',
        };
        dispatch(SetupUser(data.user));
        dispatch(LoginSuccess(userData));
    } catch (error) {
        let errorMsg = 'Error';
        if (error.response && (error.response.status === 401)) {
            errorMsg = 'Invalid email or password';
        }
        if (error.response && (error.response.status === 422)) {
            errorMsg = 'Invalid email address';
        }
        dispatch(LoginError({ isAuthenticated: false, error: true, errorMsg }));
    }
};

export const Logout = () => ({
    type: AuthTypes.LOGOUT,
    payload: { isAuthenticated: false, credentials: { token: '' } },
});

export const ForgotPassBegin = payload => ({
    type: AuthTypes.FORGOT_PASSWORD_BEGIN,
    payload,
});
const ForgotPassSuccess = payload => ({
    type: AuthTypes.FORGOT_PASSWORD_SUCCESS,
    payload,
});
const ForgotPassError = payload => ({
    type: AuthTypes.FORGOT_PASSWORD_ERROR,
    payload,
});
export const ForgotPass = email => async (dispatch) => {
    dispatch(ForgotPassBegin({ error: false, errorMsg: '', completed: false }));

    try {
        await WebClient.post('/users/request-reset', { email });
        dispatch(ForgotPassSuccess({ error: false, errorMsg: '', completed: true }));
    } catch (error) {
        let errorMsg = 'Error';
        // make sure we have a response object, then check to value of the status
        if (error.response && (error.response.status !== 404 && error.response.status !== 400)) {
            errorMsg = 'Something seems to have gone awry!  Try that again.';
        } else {
            errorMsg = "We couldn't find a user with that email address.";
        }
        dispatch(ForgotPassError({ error: true, errorMsg, completed: true }));
    }
};

export const ResetPassBegin = payload => ({
    type: AuthTypes.RESET_PASSWORD_BEGIN,
    payload,
});
const ResetPassSuccess = payload => ({
    type: AuthTypes.RESET_PASSWORD_SUCCESS,
    payload,
});
const ResetPassError = payload => ({
    type: AuthTypes.RESET_PASSWORD_ERROR,
    payload,
});
export const ResetPass = formValues => async (dispatch) => {
    dispatch(ResetPassBegin({ error: false, errorMsg: '', completed: false }));

    const { email, resetToken, password } = formValues;

    try {
        await WebClient.post('/users/reset-password', {
            email,
            newPassword: password,
            resetToken,
        });
        dispatch(ResetPassSuccess({ error: false, errorMsg: '', completed: true }));
    } catch (status) {
        let errorMsg;
        if (status.response && (
            status.response.status !== 404
                && status.response.status !== 400
        )) {
            errorMsg = 'Something seems to have gone awry! Try that again.';
        } else {
            errorMsg = "We couldn't find a user with that email address.";
        }
        dispatch(ResetPassError({ error: true, errorMsg, completed: true }));
    }
};

const CheckTokenBegin = () => ({
    type: AuthTypes.CHECK_TOKEN_BEGIN,
});
const CheckTokenSuccess = () => ({
    type: AuthTypes.CHECK_TOKEN_SUCCESS,
});
const CheckTokenError = () => ({
    type: AuthTypes.CHECK_TOKEN_ERROR,
});

export const CheckToken = () => async (dispatch) => {
    dispatch(CheckTokenBegin());

    try {
        await WebClient.get('/users/authenticated');
        dispatch(CheckTokenSuccess());
    } catch (error) {
        dispatch(CheckTokenError());
        dispatch(Logout());
    }
};
