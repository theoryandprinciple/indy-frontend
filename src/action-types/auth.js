const KeyMirror = require('keymirror');

module.exports = KeyMirror({
    LOGIN_BEGIN: true,
    LOGIN_SUCCCES: true,
    LOGIN_ERROR: true,
    LOGOUT: true,
    RESET_PASSWORD_BEGIN: true,
    RESET_PASSWORD_SUCCCES: true,
    RESET_PASSWORD_ERROR: true,
    FORGOT_PASSWORD_BEGIN: true,
    FORGOT_PASSWORD_SUCCCES: true,
    FORGOT_PASSWORD_ERROR: true,
    INITIALIZE_APP: true,
    NO_TOKEN: true,
});
