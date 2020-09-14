import WebClient from '../../../utils/web-client';

export const Login = async (FormValues) => {
    const { email, password } = FormValues;

    try {
        const data = await WebClient.post(
            '/login',
            { email, password },
            { responseType: 'text' },
        );

        // update auth token
        WebClient.updateAuth(data.token);

        return ({
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
        });
    } catch (error) {
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
    }
};

export const Logout = () => ({
    isAuthenticated: false,
    error: false,
});

export const ForgotPass = async (email) => {
    try {
        await WebClient.post('/users/request-reset', { email });
        return {
            error: false,
            errorMsg: '',
        };
    } catch (error) {
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
    }
};

export const ResetPass = async (FormValues) => {
    const { email, resetToken, password } = FormValues;

    try {
        await WebClient.post('/users/reset-password', {
            email,
            newPassword: password,
            resetToken,
        });

        return {
            error: false,
            errorMsg: '',
        };
    } catch (status) {
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
    }
};
