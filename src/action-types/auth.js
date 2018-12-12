import KeyMirror from 'keymirror'

const Actions = KeyMirror({
    LOGIN_BEGIN: true,
    LOGIN_SUCCESS: true,
    LOGIN_FAIL: true,
    LOGOUT_BEGIN: true,
    LOGOUT_SUCCESS: true,
    LOGOUT_FAIL: true,
    FORGOT_PASS_BEGIN: true,
    FORGOT_PASS_FAIL: true,
    FORGOT_PASS_SUCCESS: true,
    NO_TOKEN: true,
    CLEAR_ERRORS: true
});

export default Actions;
