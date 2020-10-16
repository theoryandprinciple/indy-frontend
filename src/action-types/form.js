const KeyMirror = require('keymirror');

module.exports = KeyMirror({
    SAVE_FORM: true,
    POST_FORM_BEGIN: true,
    POST_FORM_SUCCESS: true,
    POST_FORM_ERROR: true,
    UPDATE_FORM_STEP: true,
    RESET_FORM: true,
});
