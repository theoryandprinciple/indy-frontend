import BackgroundAuth from './boilerplate-auth'
import WebClient from '../utils/web-client'
import AuthActions from '../action-types/auth'

const internals = {}

export const forgotPass = (email) => {

    return (dispatch) => {

        dispatch(forgotPassBegin());

        WebClient.post('/users/request-reset', { email })
        .then(() => {

            dispatch(forgotPassSuccess());
        })
        .catch(({ status }) => {

            let error;
            if (status !== 404 && status !== 400) {
                error = 'Something seems to have gone awry!  Try that again.'
            }
            else {
                error = 'We couldn\'t find a user with that email address.'
            }
            dispatch(forgotPassFail(error));

        });

    };
}
const forgotPassBegin = () => {

    return {
        type: AuthActions.FORGOT_PASS_BEGIN
    };
}
const forgotPassSuccess = () => {

    return {
        type: AuthActions.FORGOT_PASS_SUCCESS
    };
}
const forgotPassFail = (error) => {

    return {
        type: AuthActions.FORGOT_PASS_FAIL,
        payload: error
    };
}


export const clearErrors = () => {

    return {
        type: AuthActions.CLEAR_ERRORS
    };
};

export const noToken = () => {

    return {
        type: AuthActions.NO_TOKEN
    };
};


export const login = (email, password, path) => {

    return (dispatch) => {

        const strangeLogin = internals.auth.login(email, password);

        return dispatch(strangeLogin)
        .then((data) => {

            if (!path){
                // if no path provided to the login
                // consider the role of the user and push them around accordingly
                console.log('success')
            }
            else { // if a path is provided, bring them there
                console.log('success, with redirect:', path)
            }
        })
        .catch((error) => {
            console.warn('error', error)
        })
    };
};

export const logout = () => {

    return (dispatch) => {

        dispatch(internals.auth.logout());
        return console.log('logout')
    };
};

internals.auth = BackgroundAuth({
    login: (email, password) => {

        let token;

        return WebClient.post('/login', { email, password }, { responseType: 'text' })
        .then(({ data, status }) => {

            if (status !== 200) {
                const err = new Error('Bad login');
                err.info = data;
                return Promise.reject(err);
            }

            token = data;

            return WebClient.get('/user', {
                headers: { authorization: token }
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
                    role: data.role
                }
            };
        });
    }
});
