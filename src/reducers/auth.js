const AuthTypes = require('../action-types/auth');

const internals = {
    initial: () => ({
        isAuthenticated: false,
        error: false,
        errorMsg: '',
        credentials: {
            token: '',
        },
        resetPass: {
            error: false,
            errorMsg: '',
            completed: false,
        },
        forgotPass: {
            error: false,
            errorMsg: '',
            completed: false,
        },
    }),
};

const AuthReducer = (stateParam, action) => {
    const state = stateParam || internals.initial();

    const { payload, type } = action;

    switch (type) {
    case AuthTypes.LOGIN_BEGIN:
    case AuthTypes.LOGIN_SUCCCES:
    case AuthTypes.LOGIN_ERROR:
    case AuthTypes.LOGOUT:

        return {
            ...state,
            ...payload,
        };
    case AuthTypes.RESET_PASSWORD_BEGIN:
    case AuthTypes.RESET_PASSWORD_SUCCCES:
    case AuthTypes.RESET_PASSWORD_ERROR:
        return {
            ...state,
            resetPass: {
                ...payload,
            },
        };
    case AuthTypes.FORGOT_PASSWORD_BEGIN:
    case AuthTypes.FORGOT_PASSWORD_SUCCCES:
    case AuthTypes.FORGOT_PASSWORD_ERROR:
        return {
            ...state,
            forgotPass: {
                ...payload,
            },
        };

    default:
        // do nothing
    }
    return state;
};

export default AuthReducer;
