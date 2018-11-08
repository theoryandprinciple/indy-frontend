import BackgroundAuth from './boilerplate-auth'
import WebClient from '../utils/web-client'

const internals = {}

export const login = (email, password, path) => { // email, password, path

    return (dispatch) => {

        const strangeLogin = internals.auth.login(email, password);

        return dispatch(strangeLogin)
        .then((data) => {

            if (!path){
                // if no path provided to the login
                // consider the role of the user and push them around
                if (data.credentials.role === 'admin'){
                    History.push('/admin');
                }
                else {
                    History.push('/');
                }
            }
            else { // if a path is provided, bring them there
                History.push(path);
            }
        })
        .catch(console.warn('error'));
    };
};

export const logout = () => {

    return (dispatch) => {

        dispatch(internals.strangeActions.logout());
        return History.push('/');
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
