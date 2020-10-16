const KeyMirror = require('keymirror');

module.exports = KeyMirror({
    SAVE_FORM: true,
    POST_FORM_BEGIN: true,
    POST_FORM_SUCCESS: true,
    POST_FORM_ERROR: true,
    UPDATE_FORM_STEP: true,
    SOFT_RESET_FORM: true,
    HARD_RESET_FORM: true,
});
