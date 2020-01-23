const KeyMirror = require('keymirror');

module.exports = KeyMirror({
    CHECK_TOKEN_BEGIN: true,
    CHECK_TOKEN_SUCCESS: true,
    CHECK_TOKEN_ERROR: true,
    LOGIN_BEGIN: true,
    LOGIN_SUCCESS: true,
    LOGIN_ERROR: true,
    LOGOUT: true,
    RESET_PASSWORD_BEGIN: true,
    RESET_PASSWORD_SUCCESS: true,
    RESET_PASSWORD_ERROR: true,
    FORGOT_PASSWORD_BEGIN: true,
    FORGOT_PASSWORD_SUCCESS: true,
    FORGOT_PASSWORD_ERROR: true,
    INITIALIZE_APP: true,
    NO_TOKEN: true,
});
