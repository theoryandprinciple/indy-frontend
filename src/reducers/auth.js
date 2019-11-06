const AuthTypes = require('../action-types/auth');

const internals = {
    initial: () => ({
        isAuthenticated: false,
        error: false,
        credentials: {
            token: '',
        },
    }),
};

const AuthReducer = (stateParam, action) => {
    const state = stateParam || internals.initial();

    const { payload, type } = action;

    switch (type) {
    case AuthTypes.LOGIN_SUCCCES:

        return {
            ...state,
            ...payload,
        };
    case AuthTypes.LOGOUT:

        return {
            ...state,
            ...payload,
        };
    default:
        // do nothing
    }
    return state;
};

export default AuthReducer;
