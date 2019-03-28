import Types from '../action-types/auth';

const internals = {};

/*
This structure, as well as most of the rest of the base auth structure
was lifted from strange-auth:
https://github.com/BigRoomStudios/strange-auth/
*/
export default ({ login, logout }) => {
    if (!login) {
        throw new Error('You must at least specify a login callback.');
    }

    const loginCb = internals.wrapToUseCallback(login);
    const logoutCb = logout
        ? internals.wrapToUseCallback(logout)
        : cb => cb(null);

    const actions = {
        loginAttempt: (...args) => ({
            type: Types.LOGIN_BEGIN,
            payload: args,
        }),
        loginFail: error => ({
            type: Types.LOGIN_FAIL,
            payload: error,
            error: true,
        }),
        loginSuccess: ({ credentials, artifacts }) => {
            const creds = credentials || null;
            const arts = artifacts || null;
            // console.log({ credentials, artifacts });
            return {
                type: Types.LOGIN_SUCCESS,
                payload: { credentials: creds, artifacts: arts },
            };
        },
        // Whatever args taken by loginCb, minus final callback
        login: (...args) => (dispatch) => {
            dispatch(actions.loginAttempt(...args));

            return loginCb(...args, (err, result) => {
                if (err) {
                    return dispatch(actions.loginFail(err));
                }

                return dispatch(
                    actions.loginSuccess({
                        credentials: result.credentials,
                        artifacts: result.artifacts,
                    }),
                );
            });
        },
        // Whatever args taken by logoutCb, minus final callback
        logoutAttempt: (...args) => ({
            type: Types.LOGOUT_BEGIN,
            payload: args,
        }),
        logoutFail: error => ({
            type: Types.LOGOUT_FAIL,
            payload: error,
            error: true,
        }),
        logoutSuccess: info => ({
            type: Types.LOGOUT_SUCCESS,
            payload: info,
        }),
        // Whatever args taken by logoutCb, minus final callback
        logout: (...args) => (dispatch) => {
            dispatch(actions.logoutAttempt(...args));

            return logoutCb(...args, (err, info) => {
                if (err) {
                    return dispatch(actions.logoutFail(err));
                }

                return dispatch(actions.logoutSuccess(info || null));
            });
        },
    };

    return actions;
};

internals.wrapToUseCallback = fn => (...args) => {
    const cb = args.pop(); // Pop last param off args– will be the callback

    let called = false;
    const onceCb = (err, result) => {
        if (called) {
            throw new Error(
                'You might be doing something weird.  The login or logout callback was called twice.',
            );
        }

        called = true;
        cb(err, result);
    };

    const maybePromise = fn(...args, onceCb);

    if (!maybePromise || typeof maybePromise.then !== 'function') {
        return;
    }

    const success = (result) => {
        onceCb(null, result);
        return result;
    };

    const fail = (err) => {
        onceCb(err);
        return Promise.reject(err);
    };

    return maybePromise.then(success, fail);
};
