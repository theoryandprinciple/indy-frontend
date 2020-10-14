import Colors from '../../styles/colors';

const styles = () => ({
    letterPreview: {
        border: `1px solid ${Colors.grey}`,
        padding: 20,
        maxHeight: 275,
        overflow: 'scroll',
    },
    canvasContainer: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: Colors.black,
        borderRadius: 8,
        marginTop: 20,
        marginBottom: 10,
        minWidth: 275,
    },
});

export default styles;
