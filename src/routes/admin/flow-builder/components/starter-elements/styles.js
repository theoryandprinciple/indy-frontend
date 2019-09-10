import Colors from '../../../../../styles/colors';

const styles = theme => ({
    elementQuestionWrapper: {
        height: 40,
        width: 160,
        marginBottom: 10,
        borderRadius: 3,
        backgroundColor: 'white',
        cursor: 'move',
        padding: 4,
        alignItems: 'center',
    },
    elementQuestionIconWrapper: {
        borderRadius: 5,
        backgroundColor: Colors.blue,
        color: 'white',
        height: 32,
        width: 29,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '& svg': {
            height: 20,
            width: 20,
        },
    },
});

export default styles;
