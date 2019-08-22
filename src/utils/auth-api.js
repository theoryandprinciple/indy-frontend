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
            if (error.response.status === 401) {
                errorMsg = 'Invalid email or password';
            }
            if (error.response.status === 422) {
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
