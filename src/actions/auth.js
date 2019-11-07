import WebClient from '../utils/web-client';
import AuthTypes from '../action-types/auth';

export const ClearErrors = () => ({
    type: AuthTypes.INITIALIZE_APP,
});

const LoginBegin = payload => ({
    type: AuthTypes.LOGIN_BEGIN,
    payload,
});
const LoginSuccess = payload => ({
    type: AuthTypes.LOGIN_SUCCCES,
    payload,
});
const LoginError = payload => ({
    type: AuthTypes.LOGIN_ERROR,
    payload,
});

export const Login = formValues => (dispatch) => {
    const { email, password } = formValues;

    dispatch(LoginBegin({ isAuthenticated: false, error: false, errorMsg: '' }));
    const login = WebClient.post(
        '/login',
        { email, password },
        { responseType: 'text' },
    );

    login
        .then(({ data }) => {
            // update auth token
            WebClient.updateAuth(data.token);

            const userData = {
                isAuthenticated: true,
                credentials: {
                    token: data.token,
                    role: data.user.role,
                },
                user: {
                    ...data.user,
                },
                error: false,
                errorMsg: '',
            };
            dispatch(LoginSuccess(userData));
        })
        .catch((error) => {
            let errorMsg = 'Error';
            if (error.response && (error.response.status === 401)) {
                errorMsg = 'Invalid email or password';
            }
            if (error.response && (error.response.status === 422)) {
                errorMsg = 'Invalid email address';
            }
            dispatch(LoginError({ isAuthenticated: false, error: true, errorMsg }));
        });

    return login;
};

export const Logout = () => ({
    type: AuthTypes.LOGOUT,
    payload: { isAuthenticated: false, credentials: { token: '' } },
});

const ForgotPassBegin = payload => ({
    type: AuthTypes.FORGOT_PASSWORD_BEGIN,
    payload,
});
const ForgotPassSuccess = payload => ({
    type: AuthTypes.FORGOT_PASSWORD_SUCCCES,
    payload,
});
const ForgotPassError = payload => ({
    type: AuthTypes.FORGOT_PASSWORD_ERROR,
    payload,
});
export const ForgotPass = email => (dispatch) => {
    dispatch(ForgotPassBegin({ error: false, errorMsg: '', completed: false }));

    const forgotpassword = WebClient.post('/users/request-reset', { email });

    forgotpassword
        .then(() => dispatch(ForgotPassSuccess({ error: false, errorMsg: '', completed: true })))
        .catch((error) => {
            let errorMsg = 'Error';
            // make sure we have a response object, then check to value of the status
            if (error.response && (error.response.status !== 404 && error.response.status !== 400)) {
                errorMsg = 'Something seems to have gone awry!  Try that again.';
            } else {
                errorMsg = "We couldn't find a user with that email address.";
            }
            dispatch(ForgotPassError({ error: true, errorMsg, completed: true }));
        });

    return forgotpassword;
};

const ResetPassBegin = payload => ({
    type: AuthTypes.RESET_PASSWORD_BEGIN,
    payload,
});
const ResetPassSuccess = payload => ({
    type: AuthTypes.RESET_PASSWORD_SUCCCES,
    payload,
});
const ResetPassError = payload => ({
    type: AuthTypes.RESET_PASSWORD_ERROR,
    payload,
});
export const ResetPass = formValues => (dispatch) => {
    dispatch(ResetPassBegin({ error: false, errorMsg: '', completed: false }));

    const { email, resetToken, newPassword } = formValues;
    const resetpassword = WebClient.post('/users/reset-password', {
        email,
        newPassword,
        resetToken,
    });

    resetpassword
        .then(() => dispatch(ResetPassSuccess({ error: false, errorMsg: '', completed: true })))
        .catch((status) => {
            let errorMsg;
            if (status.response && (
                status.response.status !== 404
                    && status.response.status !== 400
            )) {
                errorMsg = 'Something seems to have gone awry!  Try that again.';
            } else {
                errorMsg = "We couldn't find a user with that email address.";
            }
            dispatch(ResetPassError({ error: true, errorMsg, completed: true }));
        });
    return resetpassword;
};
