import KeyMirror from 'keymirror'

const Actions = KeyMirror({
    LOGIN_ATTEMPT: true,
    LOGIN_SUCCESS: true,
    LOGIN_FAIL: true,
    LOGOUT_ATTEMPT: true,
    LOGOUT_SUCCESS: true,
    LOGOUT_FAIL: true,
    NO_TOKEN: true,
    CLEAR_ERRORS: true
});

export default Actions;
