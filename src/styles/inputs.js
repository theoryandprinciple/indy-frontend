const styles = () => ({
    inputWrapper: {
        margin: '23px 0 0 0',
        width: '100%',
    },
    textInput: {
        height: 50,
        fontWeight: 400,
        backgroundColor: 'white',
        '&$textInputError': {
            '& fieldset': {
                borderColor: 'red !important',
            },
        },
    },
    textInputError: {},
    textInputErrorFocused: {},
    textInputLabelRoot: {
        fontFamily: 'Arial, Helvetica, sans-serif',
        color: 'grey',
        '&$textInputLabelFocused': { color: 'black' },
        '&$textInputLabelError': { color: 'grey' },
    },
    textInputLabelFocused: {},
    textInputLabelError: {},
    textInputLabelErrorFocused: {},
    notchedOutline: {},
    errorMessage: {
        fontSize: 15,
        fontWeight: 500,
        textAlign: 'left',
        color: 'red',
    },
    successMessage: {
        fontSize: 15,
        fontWeight: 500,
        textAlign: 'left',
        color: 'green',
    },

});
export default styles;
