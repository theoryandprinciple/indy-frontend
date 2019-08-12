import BackgroundAuth from './boilerplate-auth';
import WebClient from '../utils/web-client';
import AuthActions from '../action-types/auth';
import { history } from '../store';

const internals = {};

export const resetPassCancel = () => {
    history.push('/');
    return {
        type: AuthActions.RESET_PASS_BEGIN,
    };
};
const resetPassBegin = () => ({
    type: AuthActions.RESET_PASS_BEGIN,
});
const resetPassSuccess = () => ({
    type: AuthActions.RESET_PASS_SUCCESS,
});
const resetPassFail = error => ({
    type: AuthActions.RESET_PASS_FAIL,
    payload: error,
});

export const resetPass = (email, resetToken, newPassword) => (dispatch) => {
    dispatch(resetPassBegin());

    WebClient.post('/users/reset-password', {
        email,
        newPassword,
        resetToken,
    })
        .then(() => {
            dispatch(resetPassSuccess());
            history.push('/');
            // should provide some user feedback on the success/next steps
        })
        .catch((status) => {
            let error;
            if (status.response && (
                status.response.status !== 404
                    && status.response.status !== 400
            )) {
                error = 'Something seems to have gone awry!  Try that again.';
            } else {
                error = "We couldn't find a user with that email address.";
            }
            dispatch(resetPassFail(error));
        });
};

export const forgotPassCancel = () => ({
    type: AuthActions.FORGOT_PASS_BEGIN,
});
const forgotPassBegin = () => ({
    type: AuthActions.FORGOT_PASS_BEGIN,
});
const forgotPassSuccess = () => ({
    type: AuthActions.FORGOT_PASS_SUCCESS,
});
const forgotPassFail = error => ({
    type: AuthActions.FORGOT_PASS_FAIL,
    payload: error,
});

export const forgotPass = email => (dispatch) => {
    dispatch(forgotPassBegin());

    WebClient.post('/users/request-reset', { email })
        .then(() => {
            dispatch(forgotPassSuccess());
        })
        .catch((status) => {
            let error;
            // make sure we have a response object, then check to value of the status
            if (status.response && (status.response.status !== 404 && status.response.status !== 400)) {
                error = 'Something seems to have gone awry!  Try that again.';
            } else {
                error = "We couldn't find a user with that email address.";
            }
            dispatch(forgotPassFail(error));
        });
};

export const clearErrors = () => ({
    type: AuthActions.CLEAR_ERRORS,
});

export const noToken = () => ({
    type: AuthActions.NO_TOKEN,
});

export const login = (email, password, path) => (dispatch) => {
    const strangeLogin = internals.auth.login(email, password);
    return (
        dispatch(strangeLogin)
        // .then(data => {
            .then(() => {
                if (!path) {
                    // if no path provided to the login
                    // consider the role of the user and push them around accordingly
                    //  console.log('success')
                    history.push('/');
                } else {
                    // if a path is provided, bring them there
                    // console.log('success, with redirect:', path)
                    history.push(path);
                }
            })
        // .catch(error => {
            .catch(() => {
                // console.warn('error', error)
            })
    );
};

export const logout = () => dispatch => dispatch(internals.auth.logout());

internals.auth = BackgroundAuth({
    login: (email, password) => {
        let token;

        return WebClient.post(
            '/login',
            { email, password },
            { responseType: 'text' },
        )
            .then(({ data, status }) => {
                if (status !== 200) {
                    const err = new Error('Bad login');
                    err.info = data;
                    return Promise.reject(err);
                }

                token = data;
                return WebClient.get('/user', {
                    headers: { authorization: token },
                });
            })
            .then(({ data, status }) => {
                if (status !== 200) {
                    const err = new Error('Bad login');
                    err.info = data;
                    return Promise.reject(err);
                }
                return {
                    credentials: {
                        token,
                        role: data.role,
                    },
                };
            });
    },
});
