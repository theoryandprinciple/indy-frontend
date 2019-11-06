import WebClient from '../utils/web-client';
import AuthTypes from '../action-types/auth';

const LoginSuccess = userData => ({
    type: AuthTypes.LOGIN_SUCCCES,
    payload: userData,
});

export const Login = FormValues => (dispatch) => {
    const { email, password } = FormValues;

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
            return {
                isAuthenticated: false,
                error: true,
                errorMsg,
            };
        });

    return login;
};

export const Logout = () => ({
    isAuthenticated: false,
    error: false,
});
