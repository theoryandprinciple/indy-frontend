import WebClient from './web-client';

export const Login = (FormValues) => {
    const { email, password } = FormValues;
    let token;

    return WebClient.post(
        '/login',
        { email, password },
        { responseType: 'text' },
    )
        .then(({ data }) => {
            ({ token } = data); // this is dumb syntax
            return WebClient.get('/user', {
                headers: { authorization: token },
            });
        })
        .then(({ data }) => ({
            isAuthenticated: true,
            credentials: {
                token,
                role: data.role,
            },
            user: {
                ...data,
            },
            error: false,
            errorMsg: '',
        }))
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
};

export const Logout = () => ({
    isAuthenticated: false,
    error: false,
});

export const ForgotPass = (email) => { // eslint-disable-line arrow-body-style
    return WebClient.post('/users/request-reset', { email })
        .then(() => ({
            error: false,
            errorMsg: '',
        }))
        .catch((error) => {
            let errorMsg = 'Error';
            // make sure we have a response object, then check to value of the status
            if (error.response && (error.response.status !== 404 && error.response.status !== 400)) {
                errorMsg = 'Something seems to have gone awry!  Try that again.';
            } else {
                errorMsg = "We couldn't find a user with that email address.";
            }
            return ({
                error: true,
                errorMsg,
            });
        });
};

export const ResetPass = (FormValues) => {
    const { email, resetToken, newPassword } = FormValues;

    return WebClient.post('/users/reset-password', {
        email,
        newPassword,
        resetToken,
    })
        .then(() => ({
            error: false,
            errorMsg: '',
        }))
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
            return ({
                error: true,
                errorMsg,
            });
        });
};
