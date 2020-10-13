import Colors from '../../../styles/colors';

const styles = () => ({
    canvasContainer: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: Colors.black,
        borderRadius: 8,
        marginTop: 20,
        marginBottom: 10,
        minWidth: 275,
        '@media screen and (-ms-high-contrast: black-on-white)': {},
    },
    buttonsContainer: {
        width: '100%',
    },
    clearButton: {
        minWidth: 75,
    },
    saveButton: {
        marginTop: 30,
    },
});

export default styles;
