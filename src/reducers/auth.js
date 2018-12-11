import AuthActions from '../action-types/auth'
import Statuses from '../utils/auth-statuses'

const initialState = {
    status: Statuses.INIT,
    isAuthenticated: false,
    credentials: {},
    artifacts: {},
    error: { // For actual error handling write a separate reducer
        login: false,
        logout: false
    }
}
export default (state = initialState, action) => {

    state = state || initialState;

    const type = action.type;
    const payload = action.payload;

    switch (type) {

        case AuthActions.CLEAR_ERRORS:

            // clear out error object in local state
            // this overrides the local objects which may contain errors
            // preventing them from hydrating onto the front end
            return Object.assign({}, state, {
                error: {
                    login: false,
                    logout: false
                }
            });

        case AuthActions.NO_TOKEN:

            // the user has hit the application without a token in local storage
            // so let's tell the app they are not logged in
            // this represents their first pass into our application
            // notablly, leaves error state at false
            return Object.assign({}, state, {
                status: Statuses.FINISHED,
                isAuthenticated: false
            });

        case AuthActions.LOGIN_ATTEMPT:
            return Object.assign({}, state, {
                status: Statuses.WAITING
            });

        case AuthActions.LOGIN_SUCCESS:
            {
                const error = Object.assign({}, state.error, {
                    login: false
                });

                return Object.assign({}, state, {
                    status: Statuses.FINISHED,
                    isAuthenticated: true,
                    credentials: payload.credentials || {},
                    artifacts: payload.artifacts || {},
                    error
                });
            }

        case AuthActions.LOGIN_FAIL:
            {
                const error = Object.assign({}, state.error, {
                    login: true
                });

                return Object.assign({}, state, {
                    status: Statuses.FINISHED,
                    error
                });
            }

        case AuthActions.LOGOUT_ATTEMPT:
            return Object.assign({}, state, {
                status: Statuses.WAITING_LOGOUT,
                isAuthenticated: false // Immediately considered not authenticated
            });

        case AuthActions.LOGOUT_SUCCESS:
            {
                // Clear logout error
                const error = Object.assign({}, state.error, {
                    logout: false
                });

                return Object.assign({}, state, {
                    status: Statuses.FINISHED,
                    isAuthenticated: false,
                    credentials: {}, // Only at this point reset credentials/artifacts
                    artifacts: {},
                    error
                });
            }

        case AuthActions.LOGOUT_FAIL:
            {
                // Set logout error
                const error = Object.assign({}, state.error, {
                    logout: true
                });

                return Object.assign({}, state, {
                    status: Statuses.FINISHED,
                    error
                });
            }

        default: // do nothing
    }

    return state;
}
