import Colors from '../../../../../../styles/colors';

const styles = () => ({
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
    elementIconWrapper: {
        borderRadius: 5,
        color: 'white',
        height: 32,
        width: 29,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '& svg': {
            height: 14,
        },
    },
    elementQuestionIcon: {
        backgroundColor: Colors.blue,
    },
    elementSectionIcon: {
        backgroundColor: Colors.orange,
    },
    elementOutputIcon: {
        backgroundColor: 'black',
    },
});

export default styles;
