import UserTypes from '../action-types/user';

const internals = {
    initial: () => ({
        user: {},
    }),
};

const UserReducer = (stateParam, action) => {
    const state = stateParam || internals.initial();

    const { payload, type } = action;

    switch (type) {
    case UserTypes.SETUP_USER:
        return {
            ...state,
            user: {
                ...payload,
            },
        };

    default:
        // do nothing
    }
    return state;
};

export default UserReducer;
